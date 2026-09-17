from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from expenses.views import ExpenseViewSet

router = routers.DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
