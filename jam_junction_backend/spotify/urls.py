from django.urls import path
from .views import AuthURL, spotify_callback, isAuthenticated, CurrentSongView, PauseSongView, PlaySongView, SkipSongView

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback, name="spotify-callback"),
    path('is-authenticated', isAuthenticated.as_view()),
    path('current-song', CurrentSongView.as_view()),
    path('pause', PauseSongView.as_view()),
    path('play', PlaySongView.as_view()),
    path('skip', SkipSongView.as_view()),
]