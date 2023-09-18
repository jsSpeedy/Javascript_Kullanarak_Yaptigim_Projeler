class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0; // musicList içerisindeki hangi bilgiyi istiyorsak o bilgiyi index numarasıyla tutacağız.  Şarkıları buradan ileri geri yaptıracağız.
  }

  //getMusic bilgisi bize o andaki şarkının index numarası neyse bize o şarkıyı getirecek.
  getMusic() {
    return this.musicList[this.index];
  }

  next() {
    if (this.index + 1 < this.musicList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }

  prev() {
    if (this.index != 0) {
      this.index--;
    } else {
      this.index = this.musicList.length - 1;
    }
  }
}
