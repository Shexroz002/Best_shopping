
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework import serializers
from .models import Client
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs

class RegisterSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    #         )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Client
        fields = ('username', 'password')
        extra_kwargs = {
            'username': {'required': True},
            'password': {'required': True},
        }

    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError({"password": "Password fields didn't match."})

    #     return attrs

    def create(self, validated_data):
        user = Client.objects.create(
            username=validated_data['username'],
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
        extra_kwargs = {
            'username': {'required': False},
            'password': {'required': False},
        }

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username', instance.username)
            instance.email = validated_data.get('email', instance.email)
            instance.photo = validated_data.get('photo', instance.photo)
            instance.save()
            return instance

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'username', 'email', 'photo' ]
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': False},
            'photo': {'required': False}
        }