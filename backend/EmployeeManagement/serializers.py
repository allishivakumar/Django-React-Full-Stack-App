from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Employees_List, Attendance, PerformanceReview, LeaveRequest
from .models import Employees_List
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees_List
        fields = '__all__' 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class EmployeesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees_List
        fields = "__all__"

class AttendanceSerializer(serializers.ModelSerializer):
    employee=EmployeeSerializer()
    class Meta:
        model = Attendance
        fields = "__all__"

class PerformanceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceReview
        fields = "__all__"

class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = "__all__"
