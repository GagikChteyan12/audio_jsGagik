let data = {
    title: [
        "Billie Eilish - everything i wanted",
        "Debussy - Reverie",
        "Freddie Mercury - Mamma",
        "Nemra - Nare",
        "Polo & Pan - Canopee",
        "Tigran Hamasyan - Leaving Paris"
    ],

    song: [
        "music/Billie Eilish - everything i wanted.mp3",
        "music/Debussy Reverie.mp3",
        "music/Freddie Mercury - Mamma (Bohemian Rhapsody).mp3",
        "music/Nemra - Nare.mp3",
        "music/polo-pan-canopee.mp3",
        "music/Tigran Hamasyan Leaving Paris.mp3"
    ],

    poster: [
        "https://i.gifer.com/7d20.gif",
        "https://media2.giphy.com/media/5xtDarmSceWsGyD4VeE/source.gif",
        "https://cdn.dribbble.com/users/1242979/screenshots/7099165/music.gif",
        "https://i.gifer.com/8RWM.gif",
        "https://media2.giphy.com/media/Y0GyZQpjqafoatTvjB/giphy.gif",
        "https://cdn.dribbble.com/users/1921422/screenshots/5511883/freddie.gif"
    ]
};

let song = new Audio();
let currentSong = 0;

window.onload = function () {
    playSong();
};

function playSong() {
    song.src = data.song[currentSong];

    let songTitle = document.getElementById("songTitle");
    songTitle.textContent = data.title[currentSong];

    let img = document.getElementById("row1");
    img.style.backgroundImage = `url(${data.poster[currentSong]})`;

    let main = document.getElementById("main");
    main.style.backgroundImage = `url(${data.poster[currentSong]})`;

    song.play();

    let play = document.getElementById("play");
    play.src = "images/pause.png";
}

function playOrPauseSong() {
    let play = document.getElementById("play");

    if (song.paused) {
        song.play();
        play.src = "images/pause.png";
    } else {
        song.pause();
        play.src = "images/play-button-arrowhead.png";
    }
}

song.addEventListener("timeupdate", function () {
    let fill = document.getElementById("fill");

    let position = song.currentTime / song.duration;
    if (!isNaN(position)) {
        fill.style.width = position * 100 + "%";
    }

    convertTime(song.currentTime);

    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    let currentTime = document.getElementById("curentTime");

    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    currentTime.textContent = min + ":" + sec;

    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    if (isNaN(seconds)) return;

    let currentTime = document.getElementById("curentTime");

    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    currentTime.textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;

    if (currentSong >= data.song.length) {
        currentSong = 0;
    }

    playSong();
}

function pre() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = data.song.length - 1;
    }

    playSong();
    
}


function muted (){
    let mute = document.getElementById("mute")
if(song.muted){
    song.muted = false
    mute.src = "images volume.png"
}else{
    song.muted = true
    mute.src = "images volume.png"
}
    
}