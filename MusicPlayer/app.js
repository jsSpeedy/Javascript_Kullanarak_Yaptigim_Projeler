const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  //müziğin çalıp çalmadığını kontrol ediyoruz.
  const isMusicPlay = container.classList.contains("playing"); //playing classı varsa true yoksa false değeri getirecek.
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

const prevMusic = () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

next.addEventListener("click", () => {
  nextMusic();
});

const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};

const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};

//loadedmetadata = audio kontrolü için tetiklenen event aracılığıyla müziğin bağlandığını ilişkilendirildiğini garanti altına alıyoruz. Yani müzik hazır hale gelmiş oluyor oradan bilgisine ulaşıyor.
//süreyi toplam süreyi göstermek için kullandık.
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration); //sliderıda maxmium olarak saniye bilgisi verdik.
});

//progressBarın üzerinde geçen süreyi göstermek için
//timeupdate saniye geçtiği sürece işlem yap
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime); //saniye bilgisini progressBar da gösteririz.
  currentTime.textContent = calculateTime(progressBar.value);
});

//progressBara tıkladığımızda belirli saniyeye gitmesi ve text üzerinde o saniyenin güncellenmesi
progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

//ses durumunu ayarlama
volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

let sesDurumu = "sesli";
volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true; //muted ses durumuna ayarlar true ise sesi kapatır.
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false; //muted ses durumuna ayarlar false ise sesi açar.
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

//müzik listesini dinamik olarak gösterme ve süre bilgisini oluşturma
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
          <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
          </li> 
      `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

//liste üzerinden seçtiğimiz şarkıyı çalmak
const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index"); // index numarasına göre müziğin çalışmasını sağlarız.
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

//seçtiğimiz müziğin arka planını boyayacak.
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
