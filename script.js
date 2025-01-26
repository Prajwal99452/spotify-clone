// Song list
const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "assets/songs/song1.mp3",
        cover: "assets/images/cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "assets/songs/song2.mp3",
        cover: "assets/images/cover2.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "assets/songs/song3.mp3",
        cover: "assets/images/cover3.jpg"
    }
];

// Elements
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songList = document.getElementById('song-list');

let currentSongIndex = 0;

// Load songs into playlist
function loadPlaylist() {
    songs.forEach((song, index) => {
        let li = document.createElement('li');
        li.innerText = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => playSong(index));
        songList.appendChild(li);
    });
}

// Play a song
function playSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[index].src;
    songTitle.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    cover.src = songs[index].cover;
    audioPlayer.play();
    playButton.innerHTML = '<img src="assets/images/pause.png" alt="Pause">';
}

// Play/Pause button
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<img src="assets/images/pause.png" alt="Pause">';
    } else {
        audioPlayer.pause();
        playButton.innerHTML = '<img src="assets/images/play.png" alt="Play">';
    }
});

// Previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;
    playSong(currentSongIndex);
});

// Next song
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Progress bar update
audioPlayer.addEventListener('timeupdate', () => {
    progress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

// Seek control
progress.addEventListener('input', () => {
    audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// Load the playlist on startup
loadPlaylist();
