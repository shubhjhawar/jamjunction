from django.urls import path
from .views import AuthURL, spotify_callback, isAuthenticated, CurrentSongView

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback, name="spotify-callback"),
    path('is-authenticated', isAuthenticated.as_view()),
    path('current-song', CurrentSongView.as_view()),
]