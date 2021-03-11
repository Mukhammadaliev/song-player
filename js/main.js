const elContainer = document.querySelector('.container');

const elTitle = document.querySelector('.music-title')
const elProgressBar = document.querySelector('.progress-wrapper')
const elProgress = document.querySelector('.progress')
const elAudio = document.querySelector('#audio')
const elPrevBtn = document.querySelector('#prev')
const elPauseBtn = document.querySelector('#pause')
const elNextBtn = document.querySelector('#next')


const songs = ['Животные', 'Мистер-718', 'Колёса', 'Лучше-всех', 'Москва-любит', 'Мультибрендовый', 'Притон', 'Танцуй-сама', 'Цепи', 'Чистый', 'Это-любовь', 'Як-2', 'Внатуре'];


let songIndex = 0;

loadSong(songs[songIndex]);



function loadSong(song) {
  elTitle.textContent = song;
  elAudio.src = `audio/${song}.mp3`
}

function playSong() {
  elContainer.classList.add('play')
  elPauseBtn.classList.add('play-song')
  elAudio.play()
};

function pauseSong() {
  elContainer.classList.remove('play');
  elPauseBtn.classList.remove('play-song')
  elAudio.pause()
};


elPauseBtn.addEventListener('click', function() {
  const isPlaying = elContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

function nextSong() {
  songIndex++

  if (songIndex == songs.length) {
    songIndex = 0
  }

  loadSong(songs[songIndex])


  playSong()
}

function prevSong() {
  songIndex--

  if (songIndex <= 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])


  playSong()
}

function progressUpdate(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPresent = (currentTime / duration) * 100;
  elProgress.style.width = `${progressPresent}%`;
}

function updateProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = elAudio.duration;

  elAudio.currentTime = (clickX / width) * duration;
  console.log('asdasd');
}

elNextBtn.addEventListener('click', nextSong)
elPrevBtn.addEventListener('click', prevSong)

elAudio.addEventListener('timeupdate', progressUpdate)

elProgressBar.addEventListener('click', updateProgressBar)

elAudio.addEventListener('ended', nextSong)
