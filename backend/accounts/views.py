from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import UserImageSerializer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
import random
from .models import UserAccount
from django.contrib.auth.models import User

class ImageViewSet(APIView):
    serializer_class = UserImageSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        username = request.query_params['username']
        queryset = UserAccount.objects.get(user__username=username)
        serializer = UserImageSerializer(queryset)
        return Response(serializer.data, status=200)

    def post(self, request, format=None):
        username = request.data['username']
        nickname = request.data['nickname']
        user = User.objects.get(username=username)
        try:
            file = request.data['file']
            obj, created = UserAccount.objects.update_or_create(user=user, defaults={'profile_pic': file, 'nickname': nickname})
        except:
            obj, created = UserAccount.objects.update_or_create(user=user, defaults={'nickname': nickname})
        serializer = UserImageSerializer(obj)
        return Response(serializer.data, status=200)




        

