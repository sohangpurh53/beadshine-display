// Mock function to fetch products
export const fetchProducts = async (page = 1, sortBy = 'newest', searchQuery = '', filters = {}) => {
  // In a real app, this would be an API call
  const allProducts = [
    { id: 1, title: "Ruby Beads", image: "https://example.com/ruby-beads.jpg", description: "Vibrant red ruby beads for stunning jewelry creations.", category: "Beads", price: 1200, brand: "BeadsBoutique", rating: 4.5 },
    { id: 2, title: "Silver Chain", image: "https://example.com/silver-chain.jpg", description: "Sterling silver chain for versatile jewelry designs.", category: "Jewelry", price: 800, brand: "JewelryMaster", rating: 4.2 },
    { id: 3, title: "Emerald Pendant", image: "https://example.com/emerald-pendant.jpg", description: "Elegant emerald pendant for a touch of luxury.", category: "Jewelry", price: 2500, brand: "GemCraft", rating: 4.8 },
    { id: 4, title: "Gold Clasp", image: "https://example.com/gold-clasp.jpg", description: "14k gold clasp for secure and stylish closures.", category: "Supplies", price: 600, brand: "JewelryMaster", rating: 4.0 },
    { id: 5, title: "Pearl Earrings", image: "https://example.com/pearl-earrings.jpg", description: "Classic freshwater pearl earrings for timeless elegance.", category: "Jewelry", price: 1500, brand: "BeadsBoutique", rating: 4.7 },
    // ... more products
  ];

  // Filter products based on search query and filters
  const filteredProducts = allProducts.filter(product => 
    (searchQuery ? (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true) &&
    (filters.categories.length > 0 ? filters.categories.includes(product.category) : true) &&
    (filters.priceRange ? (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) : true)
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  // Paginate products
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    products: paginatedProducts,
    totalPages: Math.ceil(sortedProducts.length / itemsPerPage)
  };
};