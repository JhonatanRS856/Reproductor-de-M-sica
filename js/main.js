

// Eventos para el contenedor donde esta la lista con las canciones 

document.getElementById('toggleLink').addEventListener('click', function (event) {
    event.preventDefault();
    var toggleDiv = document.getElementById('toggleDiv');
    const iconDonw = document.getElementById('iconToggle-down');
    const iconUp = document.getElementById('iconToggle-up');
    const links = document.querySelectorAll('.song-link');


    toggleDiv.classList.toggle('visible');

    // Cambiar de icono

    if (toggleDiv.classList.contains('visible')) {
        iconDonw.classList.add('d-none');
        iconUp.classList.remove('d-none');
    } else {
        iconDonw.classList.remove('d-none');
        iconUp.classList.add('d-none');
    }

    // Añade un evento de click a cada botón
    links.forEach(a => {
        a.addEventListener('click', function () {
            // El elemento al cual queremos agregar o quitar la clase
            const targetElement = document.getElementById('toggleDiv');

            // Verificar si el botón tiene la clase 'active'
            if (a.classList.contains('active')) {
                // Si tiene la clase 'active', quitarla y quitar la clase 'highlight' del elemento de destino
                targetElement.classList.remove('visible');
                iconUp.classList.add('d-none');
                iconDonw.classList.remove('d-none');
            } else {
                // Si no tiene la clase 'active', agregarla y agregar la clase 'highlight' al elemento de destino
                targetElement.classList.add('visible');
            }
        });
    });
});

const audio = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const progressThumb = document.getElementById('progressThumb');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const repeatIcon = document.getElementById('repeatIcon');
const banner = document.getElementById('banner');
const songLinks = document.querySelectorAll('.song-link');
const currentTimeElement = document.getElementById('currentTime');
const downloadLink = document.getElementById('downloadLink');
const youtubeLink = document.getElementById('YoutubeLink');
const imgSongR = document.getElementById('imgSong');
const randomButton = document.getElementById('randomButton');
const repeatButton = document.getElementById('repeatButton');




let isDragging = false;
let currentSongIndex = 0;
let isRandom = false;
let isRepeating = false;

//Array con las canciones y sus metadatos

const songs = [
    {
        src: '../songs/getyourWish.mp3',
        title: 'Get Your Wish',
        artist: 'Porter Robinson',
        duration: '03:37',
        key: 'B',
        numberTempo: '95',
        tempo: '95 BPM',
        bannerImg: '../img/GetYourWish.jpg',
        shadow: '0px 0px 10px rgb(86, 170, 209)',
        link: 'https://www.youtube.com/watch?v=4SZEDBFPpgw'
    },
    // Add more songs here
    {
        src: '../songs/monsters.mp3',
        title: 'Monsters',
        artist: 'NOA',
        duration: '04:11',
        key: 'C♯/D',
        numberTempo: '84',
        tempo: '84 BPM',
        bannerImg: '../img/monsters.jpg',
        shadow: '0px 0px 10px rgb(186, 196, 201)',
        link: 'https://www.youtube.com/watch?v=t7hrukW5jxo'
    },
    {
        src: '../songs/BreakingTheHabit.mp3',
        title: 'Breaking The Habit',
        artist: 'Linkin Park',
        duration: '03:18',
        key: 'E',
        numberTempo: '200',
        tempo: '200 BPM',
        bannerImg: '../img/bthabit.png',
        shadow: '0px 0px 10px rgb(142, 138, 114)',
        link: 'https://www.youtube.com/watch?v=v2H4l9RpkwM'
    },
    {
        src: '../songs/SomeKind.mp3',
        title: 'Some Kind of Magic',
        artist: 'LVTHER',
        duration: '03:15',
        key: 'B',
        numberTempo: '168',
        tempo: '168 BPM',
        bannerImg: '../img/somekind.jpg',
        shadow: '0px 0px 10px rgb(252, 222, 121)',
        link: 'https://www.youtube.com/watch?v=SzWk_I304Sg'
    },
    {
        src: '../songs/Selfish.mp3',
        title: 'Selfish',
        artist: 'NEYMI',
        duration: '02:45',
        key: 'A',
        numberTempo: '95',
        tempo: '95 BPM',
        bannerImg: '../img/selfish.jpg',
        shadow: '0px 0px 10px rgb(86, 170, 209)',
        link: 'https://www.youtube.com/watch?v=UIU8MgCvZhE'
    },
    {
        src: '../songs/Royalty.mp3',
        title: 'Royalty (feat. Neoni) (Wiguez & Alltair Remix)',
        artist: 'Egzod & Maestro Chives',
        duration: '03:33',
        key: 'A',
        numberTempo: '172',
        tempo: '172 BPM',
        bannerImg: '../img/Royalty.jpg',
        shadow: '0px 0px 10px rgb(86, 170, 209)',
        link: 'https://www.youtube.com/watch?v=OhX8GC3mm74'
    },
    {
        src: '../songs/sweater.mp3',
        title: 'Sweater Weather',
        artist: 'The Neighbourhood',
        duration: '03:50',
        key: 'A♯/B♭',
        numberTempo: '124',
        tempo: '124 BPM',
        bannerImg: '../img/sw-song.jpg',
        shadow: '0px 0px 10px rgb(145, 140, 140)',
        link: 'https://www.youtube.com/watch?v=GCdwKhTtNNw'
    },
    {
        src: '../songs/SayGoodbye.mp3',
        title: 'Say Goodbye (Feat. Marvin Divine)',
        artist: 'Unknown Brain',
        duration: '03:50',
        key: 'E',
        numberTempo: '170',
        tempo: '170 BPM',
        bannerImg: '../img/saygoodbye.jpg',
        shadow: '0px 0px 10px #8c8f8e',
        link: 'https://www.youtube.com/watch?v=rdD-DMTWqU4'
    },
    {
        src: '../songs/hotgirl.mp3',
        title: 'hot girl bummer',
        artist: 'blackbear',
        duration: '03:08',
        key: 'F♯/G♭',
        numberTempo: '130',
        tempo: '130 BPM',
        bannerImg: '../img/hotgirl.jpg',
        shadow: '0px 0px 10px #2e52b1',
        link: 'https://www.youtube.com/watch?v=yMlKJGKyoCo'
    },
    {
        src: '../songs/makememove.mp3',
        title: 'Make Me Move (Feat. Karra)',
        artist: 'Culture Code',
        duration: '03:16',
        key: 'G♯/A♭',
        numberTempo: '95',
        tempo: '95 BPM',
        bannerImg: '../img/makememove.jpg',
        shadow: '0px 0px 10px #3785a9',
        link: 'https://www.youtube.com/watch?v=vBGiFtb8Rpw'
    },
    {
        src: '../songs/AboutMe.mp3',
        title: 'About Me',
        artist: 'Koven x ROY KNOX',
        duration: '02:34',
        key: 'G♯/A♭',
        numberTempo: '180',
        tempo: '180 BPM',
        bannerImg: '../img/AboutMe.jpg',
        shadow: '0px 0px 10px #c75c77',
        link: 'https://www.youtube.com/watch?v=t2Ti8d992RM'
    }
];


//Funcion para cambiar la informacion de cada contenedor por su ID

function updateBanner(song) {
    document.querySelectorAll('.song-name').forEach(element => {
        element.innerText = song.title;
    });

    document.querySelectorAll('.artist-name').forEach(element => {
        element.innerText = song.artist;
    });

    document.querySelectorAll('.time-song').forEach(element => {
        element.innerText = song.duration;
    });

    imgSongR.style.setProperty('--img-reproductor', `url(${song.bannerImg})`);
    document.getElementById('bannerBPM').innerText = song.numberTempo;
    banner.style.setProperty('--banner-bg-image', `url(${song.bannerImg})`);
    banner.style.setProperty('--filter-dp', song.shadow);

    document.getElementById('key').innerText = song.key;
    document.getElementById('tempo').innerText = song.tempo;

    downloadLink.href = song.src;
    youtubeLink.href = song.link;
}

//Canciones Favoritas

const favoriteButton = document.getElementById('favoriteButton');
const heartOutline = document.getElementById('heartOutline');
const heartFilled = document.getElementById('heartFilled');
const favoriteMessage = document.getElementById('favoriteMessage');

let favorites = {};

songs.forEach((song, index) => {
    if (!favorites.hasOwnProperty(song.src)) {
        favorites[song.src] = false; // Initialize as not favorite
    }
});

// Event listener for the favorite button
favoriteButton.addEventListener('click', () => {
    const currentSong = songs[currentSongIndex];
    favorites[currentSong.src] = !favorites[currentSong.src];
    updateFavoriteIcon();

    if (favorites[currentSong.src]) {
        showMessage('Se agregó a favoritos');
    } else {
        showMessage('Se eliminó de favoritos');
    }
});

function showMessage(message) {
    favoriteMessage.innerText = message;
    favoriteMessage.classList.add('show');

    setTimeout(() => {
        favoriteMessage.classList.remove('show');
    }, 1000);
}

// Update the heart icon when changing songs
function updateFavoriteIcon() {
    const currentSong = songs[currentSongIndex];
    if (favorites[currentSong.src]) {
        heartOutline.classList.add('d-none');
        heartFilled.classList.remove('d-none');
    } else {
        heartOutline.classList.remove('d-none');
        heartFilled.classList.add('d-none');
    }
}

// Call updateFavoriteIcon when changing songs
audio.addEventListener('ended', () => {
    updateFavoriteIcon();
});




function changeSong(songPath, songElement) {
    const song = songs.find(s => s.src === songPath);
    if (song) {
        audio.src = song.src;
        audio.play();
        playIcon.classList.add('d-none');
        pauseIcon.classList.remove('d-none');
        repeatIcon.classList.add('d-none');
        updateBanner(song);
        updateFavoriteIcon();

        songLinks.forEach(link => link.classList.remove('active'));
        if (songElement) {
            songElement.classList.add('active');
        }
    }
}

// Función para manejar la repetición de la canción
repeatButton.addEventListener('click', () => {
    isRepeating = !isRepeating;

    if (isRepeating) {
        repeatButton.classList.add('active');
        repeatButton.classList.add('shufle-btn');
        audio.loop = true;
        if (isRandom) {
            isRandom = false;
            randomButton.classList.remove('active');
            randomButton.classList.remove('shufle-btn');
        }
    } else {
        repeatButton.classList.remove('active');
        audio.loop = false;
        repeatButton.classList.remove('shufle-btn');
    }
});


// Función para manejar la reproducción aleatoria de la canción
randomButton.addEventListener('click', () => {
    isRandom = !isRandom;

    if (isRandom) {
        randomButton.classList.add('active');
        randomButton.classList.add('shufle-btn');
        if (isRepeating) {
            isRepeating = false;
            randomButton.classList.remove('active');
            repeatButton.classList.remove('shufle-btn');
            audio.loop = false;
        }
    } else {
        randomButton.classList.remove('active');
        randomButton.classList.remove('shufle-btn');
    }
});

// Evento para reproducir la siguiente canción en modo aleatorio
audio.addEventListener('ended', () => {
    if (!isRepeating && isRandom) {
        playRandomSong();
    }
});

// Función para reproducir una canción aleatoria
function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    currentSongIndex = randomIndex;
    changeSong(songs[randomIndex].src, songLinks[currentSongIndex]);
}




songLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentSongIndex = index;
        const song = songs[index];
        changeSong(song.src, link);
    });
});

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[currentSongIndex];
    changeSong(prevSong.src, songLinks[currentSongIndex]);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const nextSong = songs[currentSongIndex];
    changeSong(nextSong.src, songLinks[currentSongIndex]);
}


audio.addEventListener('timeupdate', () => {
    currentTimeElement.innerText = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
    playIcon.classList.add('d-none');
    pauseIcon.classList.add('d-none');

    if (!audio.paused) {
        repeatIcon.classList.add('d-none');
        pauseIcon.classList.remove('d-none');
    } else {
        repeatIcon.classList.remove('d-none');
    }
    
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const paddedSeconds = secs < 10 ? '0' + secs : secs;
    return `${paddedMinutes}:${paddedSeconds}`;
}


audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setAudioProgress);
progressThumb.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        setAudioProgressByDrag(e);
    }
});

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.add('d-none');
        pauseIcon.classList.remove('d-none');
        repeatIcon.classList.add('d-none');
    } else {
        audio.pause();
        playIcon.classList.remove('d-none');
        pauseIcon.classList.add('d-none');
        repeatIcon.classList.add('d-none');
    }
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressThumb.style.left = `calc(${progressPercent}% - 10px)`; // Center the thumb
}

function setAudioProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function setAudioProgressByDrag(e) {
    const width = progressContainer.clientWidth;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    if (offsetX >= 0 && offsetX <= width) {
        const duration = audio.duration;
        audio.currentTime = (offsetX / width) * duration;
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressThumb.style.left = `calc(${progressPercent}% - 10px)`; // Center the thumb
    }
}


// Call updateFavoriteIcon when initializing the player or changing songs manually
document.addEventListener('DOMContentLoaded', updateFavoriteIcon);


//Centar el reproductor de musica, con un boton que funciona como toggle

const toggleButton = document.getElementById('toggleButton');
const musicDiv = document.getElementById('musicDiv');
const overlay = document.getElementById('overlay');
const closeIcon = document.getElementById('closeIcon');
const expandIcon = document.getElementById('expandIcon');

toggleButton.addEventListener('click', () => {
    musicDiv.classList.toggle('centered');
    overlay.classList.add('back-drop');
    overlay.classList.toggle('d-none');
    
    if (musicDiv.classList.contains('centered')) {
        closeIcon.classList.remove('d-none');
        expandIcon.classList.add('d-none');
    } else {
        closeIcon.classList.add('d-none');
        expandIcon.classList.remove('d-none');
    }
});
