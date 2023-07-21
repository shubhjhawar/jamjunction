from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer

# Create your views here.

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # if session does not exists u create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # getting the data from request and sending it to the serializer
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            #if the user has already created a room but 
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                # we update the details
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                self.request.session['room_code'] = room.code

                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                #otherwise, we create a new room
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetRoomView(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'
    #this parameter is responsible for the dynamic code
    #in the URL it would be like get-room?code='something'  hence code

    def get(self, request, format=None):
        #u get the code from the url
        code = request.GET.get(self.lookup_url_kwarg)

        #check if there is a code in the url
        if code != None:
            #get the room of said code
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                #get the data of that room and add another field to it
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({"Bad Request":"Room Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"bad Request":"Code Parameter Not found in URL"}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    lookup_url_kwarg ='code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()  #create a session here
        
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({"message":'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({"Bad Request":'Invalid Room code'}, status=status.HTTP_400_BAD_REQUEST) 
        return Response({"Bad Request":"something is wrong"}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoomView(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()  #create a session here

        data = {
            'code':self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoomView(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            request.session.pop('room_code')
            host_id = self.request.session_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
        return Response({"Message":"Success"}, status=status.HTTP_200_OK)


class UpdateRoomView(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({"error":"Room not Found"}, status=status.HTTP_404_NOT_FOUND)
            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({"error":"You are not the host of this room"}, status=status.HTTP_403_FORBIDDEN)
            
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({"Bad Request":"Invalid Data"},status=status.HTTP_400_BAD_REQUEST)

