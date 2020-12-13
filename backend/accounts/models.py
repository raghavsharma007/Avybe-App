from django.db import models
from django.contrib.auth.models import User

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.user.username), filename])

class UserAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=500, null=True, blank=True)
    profile_pic = models.ImageField(upload_to=nameFile, blank=True, null=True)

    def __str__(self):
        return self.user.username
