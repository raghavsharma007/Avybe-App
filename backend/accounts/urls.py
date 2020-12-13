from django.urls import path
from .views import ImageViewSet

urlpatterns = [
    path('profile/', ImageViewSet.as_view()),
]