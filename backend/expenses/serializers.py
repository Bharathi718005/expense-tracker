from rest_framework import serializers
from .models import Expense
from django.utils import timezone


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError('Title must be at least 3 characters long')
        return value

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError('Amount must be greater than 0')
        return value

    def validate_expense_date(self, value):
        if value > timezone.localdate():
            raise serializers.ValidationError('Expense date cannot be in the future')
        return value

    def validate_description(self, value):
        if value and len(value) > 500:
            raise serializers.ValidationError('Description cannot exceed 500 characters')
        return value
