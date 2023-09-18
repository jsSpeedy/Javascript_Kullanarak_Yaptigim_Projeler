//Quiz içerisine dışarıdan gelen soruları atadık ve index numaralarını 0 dan başlattık ki 1.sorudan başlasın.
function Quiz(sorular) {
  this.sorular = sorular;
  this.soruIndex = 0;
  this.dogruCevapSayisi = 0;
}

//burada soruİndex bilgisine göre soruyu getirecek. Bu bilgi bütün sorulara hizmet edeceği için Quizin prototypeına atadık.
Quiz.prototype.soruGetir = function () {
  return sorular[this.soruIndex];
};
