from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})