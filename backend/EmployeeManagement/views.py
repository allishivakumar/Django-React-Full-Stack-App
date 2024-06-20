from rest_framework.decorators import action
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import EmployeeSerializer
from rest_framework import viewsets
from django.utils.dateparse import parse_date
from .models import Employees_List, Attendance, PerformanceReview, LeaveRequest
import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import LeaveRequest
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import LeaveRequestSerializer
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .serializers import (
    EmployeesListSerializer,
    AttendanceSerializer,
    PerformanceReviewSerializer,
    LeaveRequestSerializer
)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
class EmployeeCreateView(generics.CreateAPIView):
 
    serializer_class = EmployeeSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("serilizer error", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmployeesListView(generics.ListCreateAPIView):
    
    queryset = Employees_List.objects.all()
    serializer_class = EmployeesListSerializer
    permission_classes = [IsAuthenticated]
    
    
class EmployeeViewSet(viewsets.ModelViewSet):
     
    queryset = Employees_List.objects.all()
    
    serializer_class = EmployeeSerializer
    
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    @action(detail=False, methods=['get'])
    def view_attendance(self, request):
        date_str = request.query_params.get('date')
        logging.info(f"Received date for filtering: {date_str}")
        if date_str:
            filter_date = parse_date(date_str)
            logging.info(f"Parsed date: {filter_date}")
            if filter_date:
                attendances = Attendance.objects.filter(date=filter_date)
            else:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            attendances = Attendance.objects.all()
        return Response(AttendanceSerializer(attendances, many=True).data)

    @action(detail=False, methods=['post'])
    def mark_attendance(self, request):
       employee_ids = request.data.get('employee_ids', [])
       attendance_status = request.data.get('status')
       date_str = request.data.get('date')
       print("date_str", date_str)

       try:
        # Assuming parse_date returns a date object
          attendance_date = parse_date(date_str)
          print("attendance_date", attendance_date)
       except ValueError:
          return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

       logging.info(f"Received data for marking attendance: employee_ids={employee_ids}, status={attendance_status}, date={date_str}")
       logging.info(f"Parsed date: {attendance_date}")

       attendances = []
       for employee_id in employee_ids:
          employee = Employees_List.objects.get(id=employee_id)
          attendance = Attendance.objects.create(employee=employee, status=attendance_status, date=attendance_date)
          attendances.append(attendance)
          logging.info(f"Created attendance record: {attendance}")

       return Response(AttendanceSerializer(attendances, many=True).data, status=status.HTTP_201_CREATED)

class PerformanceReviewListView(generics.ListCreateAPIView):
    queryset = PerformanceReview.objects.all()
    serializer_class = PerformanceReviewSerializer
    permission_classes = [IsAuthenticated]

class LeaveRequestListView(generics.ListCreateAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]

class LeaveRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]
class EmployeeDetailView(generics.RetrieveAPIView):
    queryset = Employees_List.objects.all()
    serializer_class = EmployeesListSerializer
    permission_classes = [IsAuthenticated]

class EmployeeDeleteView(generics.DestroyAPIView):
    queryset = Employees_List.objects.all()
    serializer_class = EmployeesListSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_leave_request(request, pk):
    try:
        leave_request = LeaveRequest.objects.get(pk=pk)
        leave_request.status = 'approved'
        leave_request.save()
        return Response({'status': 'Leave request approved'})
    except LeaveRequest.DoesNotExist:
        return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_leave_request(request, pk):
    try:
        leave_request = LeaveRequest.objects.get(pk=pk)
        leave_request.status = 'rejected'
        leave_request.save()
        return Response({'status': 'Leave request rejected'})
    except LeaveRequest.DoesNotExist:
        return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stats(request):
    total_employees = Employees_List.objects.count()
    total_attendance = Attendance.objects.filter(status='present').count()
    pending_leave_requests = LeaveRequest.objects.filter(status='pending').count()
    print(total_attendance, pending_leave_requests, total_employees)
    return Response({
        'total_employees': total_employees,
        'total_attendance': total_attendance,
        'pending_leave_requests': pending_leave_requests,
    })
