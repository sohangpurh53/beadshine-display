# BeadsBoutique API

This README provides detailed information about the BeadsBoutique API built with Django and Django REST framework.

## Table of Contents
1. [Setup](#setup)
2. [API Endpoints](#api-endpoints)
3. [Models](#models)
4. [Serializers](#serializers)
5. [Views](#views)
6. [Authentication](#authentication)
7. [Pagination](#pagination)
8. [Filtering and Searching](#filtering-and-searching)
9. [Testing](#testing)
10. [Deployment](#deployment)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```
   python manage.py migrate
   ```

5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

- `/api/products/`: List and create products
- `/api/products/<id>/`: Retrieve, update, and delete a specific product
- `/api/categories/`: List and create categories
- `/api/categories/<id>/`: Retrieve, update, and delete a specific category
- `/api/contact/`: Create a contact message

## Models

```python
# ... keep existing code for Category, Product, and Contact models
```

## Serializers

Create serializers for each model in `serializers.py`:

```python
from rest_framework import serializers
from .models import Category, Product, Contact

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
```

## Views

Create views for each model in `views.py`:

```python
from rest_framework import viewsets
from .models import Category, Product, Contact
from .serializers import CategorySerializer, ProductSerializer, ContactSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
```

## Authentication

Implement token authentication in `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## Pagination

Add pagination to your API views:

```python
REST_FRAMEWORK = {
    # ...
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}
```

## Filtering and Searching

Implement filtering and searching for products:

```python
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'brand']
    search_fields = ['title', 'description']
    ordering_fields = ['price', 'rating']
```

## Testing

Create tests for your API endpoints in `tests.py`:

```python
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Category, Product

class ProductTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test Category")
        self.product_data = {
            "title": "Test Product",
            "description": "Test Description",
            "price": "9.99",
            "category": self.category.id,
        }

    def test_create_product(self):
        url = reverse('product-list')
        response = self.client.post(url, self.product_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.get().title, 'Test Product')
```

## Deployment

1. Set `DEBUG = False` in `settings.py`
2. Configure your production database
3. Set up HTTPS
4. Use a production-ready web server like Gunicorn
5. Set up a reverse proxy with Nginx
6. Use environment variables for sensitive information

For more detailed deployment instructions, refer to the Django deployment documentation.

---

This README provides a comprehensive guide to setting up and using the BeadsBoutique API. For more information on Django REST framework, visit the [official documentation](https://www.django-rest-framework.org/).