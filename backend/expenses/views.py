from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count
from django.utils.dateparse import parse_date
from .models import Expense
from .serializers import ExpenseSerializer
from django.shortcuts import get_object_or_404


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all().order_by('-expense_date')
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        qs = Expense.objects.all().order_by('-expense_date')
        request = self.request
        search = request.GET.get('search')
        category = request.GET.get('category')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        ordering = request.GET.get('ordering')

        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(description__icontains=search)
        if category:
            qs = qs.filter(category=category)
        if start_date:
            try:
                sd = parse_date(start_date)
                if sd:
                    qs = qs.filter(expense_date__gte=sd)
            except Exception:
                pass
        if end_date:
            try:
                ed = parse_date(end_date)
                if ed:
                    qs = qs.filter(expense_date__lte=ed)
            except Exception:
                pass
        if ordering:
            qs = qs.order_by(ordering)
        return qs

    def retrieve(self, request, pk=None):
        obj = get_object_or_404(Expense, pk=pk)
        serializer = ExpenseSerializer(obj)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        qs = self.get_queryset()
        total = qs.aggregate(total_amount=Sum('amount'))['total_amount'] or 0
        count = qs.aggregate(total_count=Count('id'))['total_count'] or 0
        by_category_qs = qs.values('category').annotate(total=Sum('amount'), count=Count('id'))
        breakdown = {item['category']: {'total': item['total'] or 0, 'count': item['count']} for item in by_category_qs}
        return Response({'total_amount': total, 'total_count': count, 'total_by_category': breakdown})
