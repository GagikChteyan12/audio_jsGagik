let data = {
    title: [
        "Billie Eilish - everything i wanted",
        "Debussy - Reverie",
        "Freddie Mercury - Mamma",
        "Nemra - Nare",
        "Polo & Pan - Canopee",
        "Tigran Hamasyan - Leaving Paris"
    ],

    artist: [
        "Billie Eilish",
        "Claude Debussy",
        "Freddie Mercury",
        "Nemra",
        "Polo & Pan",
        "Tigran Hamasyan"
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
        "https://media0.giphy.com/media/cPa0VPT5ZR8d6s9UGU/giphy.gif",
        "https://media0.giphy.com/media/MDb7nlCn5mtcEZ8CtK/giphy.gif",
        "https://media2.giphy.com/media/rh5R1rp1iIT8E22BBH/giphy.gif",
        "https://cdn.dribbble.com/users/1921422/screenshots/5511883/freddie.gif"
    ]
};

let song = new Audio();

let currentSong = 0;
let isPlaying = false;

window.onload = function () {

    song.volume = 1;

    loadSong();

};

function loadSong() {

    song.src = data.song[currentSong];

    document.getElementById("songTitle").textContent =
        data.title[currentSong];

    document.getElementById("artistName").textContent =
        data.artist[currentSong];

    document.getElementById("coverImage").src =
        data.poster[currentSong];

    document.getElementById("main").style.backgroundImage =
        `url(${data.poster[currentSong]})`;

}

function playOrPauseSong() {

    let play = document.getElementById("play");

    if (!isPlaying) {

        song.play();

        isPlaying = true;

        play.src = "images/pause.png";

    }

    else {

        song.pause();

        isPlaying = false;

        play.src = "images/play-button-arrowhead.png";

    }

}

function next() {

    currentSong++;

    if (currentSong >= data.song.length) {

        currentSong = 0;

    }

    loadSong();

    song.play();

    isPlaying = true;

    document.getElementById("play").src = "images/pause.png";

}

function pre() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = data.song.length - 1;

    }

    loadSong();

    song.play();

    isPlaying = true;

    document.getElementById("play").src = "images/pause.png";

}

song.addEventListener("timeupdate", function () {

    let fill = document.getElementById("fill");

    let current = document.getElementById("currentTime");

    let duration = document.getElementById("duration");

    if (song.duration) {

        fill.style.width =
            (song.currentTime / song.duration) * 100 + "%";

    }

    current.textContent =
        formatTime(song.currentTime);

    duration.textContent =
        formatTime(song.duration);

});

song.addEventListener("loadedmetadata", function () {

    document.getElementById("duration").textContent =
        formatTime(song.duration);

});

function formatTime(time) {

    if (isNaN(time)) {

        return "00:00";

    }

    let min = Math.floor(time / 60);

    let sec = Math.floor(time % 60);

    if (sec < 10) {

        sec = "0" + sec;

    }

    if (min < 10) {

        min = "0" + min;

    }

    return min + ":" + sec;

}

document.getElementById("volumeSlider")
.addEventListener("input", function () {

    song.volume = this.value / 100;

});

function increase() {

    song.volume = Math.min(1, song.volume + 0.1);

    document.getElementById("volumeSlider").value =
        song.volume * 100;

}

function decrease() {

    song.volume = Math.max(0, song.volume - 0.1);

    document.getElementById("volumeSlider").value =
        song.volume * 100;

}

function muted() {

    let mute = document.getElementById("mute");

    song.muted = !song.muted;

    if (song.muted) {

        mute.src = "images/mute.png";

    }

    else {

        mute.src = "images/volume.png";

    }

}

document.getElementById("shuffle").onclick = function () {

    currentSong =
        Math.floor(Math.random() * data.song.length);

    loadSong();

    song.play();

    isPlaying = true;

    document.getElementById("play").src = "images/pause.png";

};

document.getElementById("repeat").onclick = function () {

    song.loop = !song.loop;

    this.style.color =
        song.loop ? "#ff00cc" : "white";

};

document.getElementById("heart").onclick = function () {

    this.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

    this.style.color = "#ff0066";

};

song.addEventListener("ended", function () {

    if (!song.loop) {

        next();

    }

});

document.querySelector(".handle")
.addEventListener("click", function (e) {

    let width = this.clientWidth;

    let clickX = e.offsetX;

    song.currentTime =
        (clickX / width) * song.duration;

});
