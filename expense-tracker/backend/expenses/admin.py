from django.contrib import admin
from .models import Expense

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('title', 'amount', 'category', 'expense_date', 'payment_mode', 'created_at')
    search_fields = ('title', 'description')
