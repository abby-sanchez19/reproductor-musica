const conteiner = document.querySelector(".conteiner"),
    musicImg = conteiner.querySelector(".area-img img"),
    musicName = conteiner.querySelector(".detalles-song .name"),
    musicArtista = conteiner.querySelector(".detalles-song .artista"),
    mainAudio = conteiner.querySelector("#main-audio"),
    playpauseBtn = conteiner.querySelector(".play-pause"),
    nextBtn = conteiner.querySelector("#next"),
    prevBtn = conteiner.querySelector("#prev"),
    progressArea = conteiner.querySelector(".progress-area"),
    progressBar = conteiner.querySelector(".progress-bar"),
    musicList = conteiner.querySelector(".music-list"),
    moreMusicBtn = conteiner.querySelector("#more-music"),
    closemoreMusic = conteiner.querySelector("#close");


  

let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
})
//Funciones de la musica: carga el nombre, Artista y el audio
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtista.innerText = allMusic[indexNumb - 1].artista;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `Song/${allMusic[indexNumb - 1].src}.mp3`;
}
//boton de play 
function playmusic() {
    conteiner.classList.add("pause");
    playpauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//boton pausa
function pausemusic() {
    conteiner.classList.remove("pause");
    playpauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//boton siguiente
function nextmusic() {
    musicIndex++; //incrementacion de la musica
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playmusic();
}
//boton anterior
function prevmusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playmusic();
}


//boton pausa de reproducir la musica
playpauseBtn.addEventListener("click", () => {
    const isMusicPause = conteiner.classList.contains("pause");

    isMusicPause ? pausemusic() : playmusic();
});
//boton siguiente
nextBtn.addEventListener("click", () => {
    nextmusic();
});

//boton anterior
prevBtn.addEventListener("click", () => {
    prevmusic();
});

//duracion de la cancion
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;



    let musicCurrentTime = conteiner.querySelector(".current-time"),
        musicDuration = conteiner.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {

        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playmusic();
});
//boton de repetir
const repeatBtn = conteiner.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "song looped");
            break;

        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "playback shuffled");
            break;

        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "playlist looped");
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat":
            nextmusic();
            break;

        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playmusic();
            break;

        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playmusic();
            break;
    }
});

moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = conteiner.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
    <div class="row">
        <span>${allMusic[i].name}</span>
        <p>${allMusic[i].artista}</p>
    </div>
    <audio class="${allMusic[i].src}" src="Song/${allMusic[i].src}.mp3"></audio>
    <span id="${allMusic[i].src}" class="audio-duration">4:09</span>
</li>`;
ulTag.insertAdjacentHTML("beforeend", liTag);

console.log(`#${allMusic[i].src}`);

letAudioDurationTag = document.getElementsByClassName(`#${allMusic[i].src}`);
let liAudioTag = document.getElementById(`.${allMusic[i].src}`);

}










