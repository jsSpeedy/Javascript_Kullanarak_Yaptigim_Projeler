function UI() {
  this.btn_start = document.querySelector(".btn-start");
  this.btn_next = document.querySelector(".next_btn");
  this.quiz_box = document.querySelector(".quiz_box");
  this.option_list = document.querySelector(".option_list");
  this.question_index = document.querySelector(".question_index");
  this.correctIcon = '<span class="icon"><i class="fas fa-check"></i></span>';
  this.incorrectIcon = '<span class="icon"><i class="fas fa-times"></i></span>';
  this.score_box = document.querySelector(".score_box");
  this.btn_replace = document.querySelector(".btn_replace");
  this.btn_quit = document.querySelector(".btn_quit");
  this.time_second = document.querySelector(".time_second");
  this.time_text = document.querySelector(".time_text");
  this.time_line = document.querySelector(".time_line");
}

//soruları index.html içerisinde soruMetni bilgisini .question_texte ve cevapSecenekleri bilgisini .option_list içerisine ekleme işlemi yapar. Bunun sayfa da gösterimini btn-start ve next_btn içerisine yazdık. soruGoster(quiz.soruGetir());
UI.prototype.soruGoster = function (soru) {
  let question = `<span>${soru.soruMetni}</span>`;
  let options = ``;

  //${cevap} = her ${cevap} bilgisi a,b,c keylerine karşılık geliyor.
  //${soru.cevapSecenekleri[cevap]} = key'e karşılık gelen value bilgisini alıyor.
  for (let cevap in soru.cevapSecenekleri) {
    options += `
                <div class="option">
                    <span><b>${cevap}</b> ${soru.cevapSecenekleri[cevap]}</span>
                </div>
        `;
  }

  document.querySelector(".question_text").innerHTML = question;
  this.option_list.innerHTML = options;

  const option = this.option_list.querySelectorAll(".option"); //option_list altındaki optionları aldık

  //bütün optionlara ulaş ve onlara click özelliği ver. selectedOption() fonksiyonuyla ilişkilendir.
  for (let opt of option) {
    opt.setAttribute("onclick", "selectedOption(this)");
  }
};

//soru sırasını yazdırır. toplam soruyu ve kaçıncı soruda olduğunu gösterir. 1/4 gibi. ekleme işlemi btn-start ve next_btn yapılır.
UI.prototype.soruSayisiniGoster = function (soruSirasi, toplamSoru) {
  let tag = `
      <span class="badge">${soruSirasi} / ${toplamSoru}</span>
  `;

  this.question_index.innerHTML = tag;
};

//quiz tamamladıktan sonra sonuçları görmek için toplam kaç soruda doğru cevap bilgisi verdik onu .score_box .score_text e ekler. Yazdırma işlemini btn_nextin else kısmında yapar.
UI.prototype.skoruGoster = function (toplamSoru, dogruCevap) {
  let tag = `${toplamSoru} Sorudan ${dogruCevap} Doğru Cevap Verdiniz.`;
  document.querySelector(".score_box .score_text").innerHTML = tag;
};
