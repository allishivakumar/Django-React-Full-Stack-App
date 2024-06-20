from django.db import models

class Employees_List(models.Model):
    full_name = models.CharField(max_length=255)
    experience = models.IntegerField()
    department = models.CharField(max_length=255)  # Make sure the field name matches
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return self.full_name

class Attendance(models.Model):
    employee = models.ForeignKey(Employees_List, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=50, choices=[('present', 'Present'), ('absent', 'Absent')])

class PerformanceReview(models.Model):
    employee_name = models.CharField(max_length=255)
    review_date = models.DateTimeField()
    question_1 = models.TextField()
    question_2 = models.TextField()

class LeaveRequest(models.Model):
    employee = models.ForeignKey(Employees_List, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    STATUS_CHOICES = [('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')]
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.employee.full_name} - {self.start_date} to {self.end_date}"
