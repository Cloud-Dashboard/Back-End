from django.contrib import admin
from DashboardApp.models import datalink
from CloudDashboardApp.models import Document
# Register your models here.

admin.site.register(datalink)

admin.site.register(Document)


