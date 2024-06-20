from django.contrib import admin
from django.urls import path, include
from EmployeeManagement.views import (
    EmployeesListView,
    EmployeeCreateView,
    EmployeeDeleteView,
    LeaveRequestDetailView,
    LeaveRequestListView,
    AttendanceViewSet,
    approve_leave_request, reject_leave_request,stats   
)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from EmployeeManagement.views import CreateUserView
# Create a router and register our viewsets with it


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    # List and Create employees
    path("api/viewemployees/", EmployeesListView.as_view(), name="employees-list"),
    path("api/addemployee/", EmployeeCreateView.as_view(), name="employee-create"),
    path('api/<int:pk>/delete/', EmployeeDeleteView.as_view(), name='employee-delete'),
     path("api/attendance/view/", AttendanceViewSet.as_view({'get': 'view_attendance'}), name="view-attendance"),
    path("api/attendance/mark/", AttendanceViewSet.as_view({'post': 'mark_attendance'}), name="mark-attendance"),
    
    # Include router URLs
     path("api/leave_requests/", LeaveRequestListView.as_view(), name="leave-request-list"),
    path("api/leave_requests/<int:pk>/", LeaveRequestDetailView.as_view(), name="leave-request-detail"),
    path("api/leave_requests/<int:pk>/approve/", approve_leave_request, name="leave-request-approve"),
    path("api/leave_requests/<int:pk>/reject/", reject_leave_request, name="leave-request-reject"),
    path('api/stats/', stats, name='stats'),
]
