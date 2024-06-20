# EmployeeManagement/urls.py
from django.urls import path
from .views import  EmployeeCreateView

from .views import CreateUserView

urlpatterns = [
    path('addemployee/', EmployeeCreateView.as_view(), name='add-employee'),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
     # This is the new endpoint
    # other paths
]

