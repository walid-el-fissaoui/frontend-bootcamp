const musicContainer = document.querySelector(".container"),
    progressWrapper  = document.querySelector(".progress-wrapper"),
    progress         = document.querySelector(".progress"),
    prev    = document.querySelector("#prev"),
    play    = document.querySelector("#play"),
    next    = document.querySelector("#next"),
    cover   = document.querySelector("#cover"),
    audio   = document.querySelector("#audio"),
    title   = document.querySelector("#title");

const songs = ['summer','thejazzpiano','ukulele'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
    cover.src = `assets/images/${song}.jpg`;
    audio.src = `assets/music/${song}.mp3`;
    title.innerText = song;
}

function playSong() {
    musicContainer.classList.add("play");
    play.querySelector("i.fas").classList.remove("fa-play");
    play.querySelector("i.fas").classList.add("fa-pause");
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove("play");
    play.querySelector("i.fas").classList.remove("fa-pause");
    play.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
}

play.addEventListener("click",() => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying)
        pauseSong()
    else 
        playSong()
})

function nextSong() {
    songIndex++;
    if(songIndex == songs.length)
        songIndex = 0;
    loadSong(songs[songIndex])
    playSong()
}

function prevSong() {
    songIndex--;
    if(songIndex < 0)
        songIndex = songs.length - 1;
    loadSong(songs[songIndex])
    playSong()
}

next.addEventListener("click",nextSong)
prev.addEventListener("click",prevSong)

function updateSongProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

audio.addEventListener("timeupdate",updateSongProgress)

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressWrapper.addEventListener("click",setProgress)

audio.addEventListener("ended",nextSong)
