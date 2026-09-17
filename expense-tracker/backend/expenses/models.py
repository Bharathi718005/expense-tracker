from django.db import models
from django.core.validators import MinLengthValidator, MinValueValidator
from django.utils import timezone


class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Travel', 'Travel'),
        ('Shopping', 'Shopping'),
        ('Bills', 'Bills'),
        ('Entertainment', 'Entertainment'),
        ('Health', 'Health'),
        ('Others', 'Others'),
    ]

    PAYMENT_CHOICES = [
        ('Cash', 'Cash'),
        ('Card', 'Card'),
        ('UPI', 'UPI'),
        ('Net Banking', 'Net Banking'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)])
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    expense_date = models.DateField()
    payment_mode = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default='Cash')
    description = models.TextField(blank=True, null=True, max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.amount}"
