from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserAccount

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class UserImageSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserAccount
        fields = ('user', 'profile_pic', 'nickname')
        depth = 1