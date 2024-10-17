# Website Visitor Stats

To track and analyze website visitor statistics for the BeadsBoutique API, you can implement the following:

1. **Google Analytics**: 
   - Set up a Google Analytics account and add the tracking code to your frontend application.
   - This will provide comprehensive data on user behavior, traffic sources, and page views.

2. **Custom Analytics Endpoint**:
   - Create a new endpoint in your Django REST framework API to record basic visitor information.
   - Implement a simple model to store visitor data:

   ```python
   from django.db import models

   class VisitorStat(models.Model):
       ip_address = models.GenericIPAddressField()
       user_agent = models.TextField()
       timestamp = models.DateTimeField(auto_now_add=True)
       path = models.CharField(max_length=255)

       def __str__(self):
           return f"{self.ip_address} - {self.timestamp}"
   ```

3. **Django Debug Toolbar**:
   - Install Django Debug Toolbar for development environments to monitor database queries, template rendering times, and other performance metrics.

4. **Logging**:
   - Implement comprehensive logging in your Django application to track API usage and errors.

5. **Third-party Services**:
   - Consider using services like Mixpanel or Amplitude for more advanced user behavior tracking and analysis.

Remember to comply with data protection regulations (like GDPR) when collecting and storing user data.