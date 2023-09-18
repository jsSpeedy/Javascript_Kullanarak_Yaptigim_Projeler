const quiz = new Quiz(sorular); // burada soruları ve soruİndexsi alır ve quiz ile bunları çekeriz.
const ui = new UI();

ui.btn_start.addEventListener("click", function () {
  ui.quiz_box.classList.add("active");
  startTimer(10);
  startTimerLine();
  ui.soruGoster(quiz.soruGetir());

  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length); // soru sırasını ve toplam soruyu aldık. 1/4
  ui.btn_next.classList.remove("show");
});

//next_btn butouna bastığımızda her defasında soruİndexsini 1 arttırıp diğer soruya geçer
ui.btn_next.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex + 1) {
    quiz.soruIndex += 1;
    startTimer(10);
    startTimerLine();

    ui.soruGoster(quiz.soruGetir());

    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

    ui.btn_next.classList.remove("show");
  } else {
    console.log("Quiz bitti");
    ui.quiz_box.classList.remove("active");
    ui.score_box.classList.add("active");
    ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi); //quiz içeriisnden toplam soru adedini ve doğru cevap saysını yazdır.
  }
});

//cevapların kontrolü gerçekleşir
function selectedOption(option) {
  //span altında ki b etiketlerinin text bilgisi alıp cevap atıyor.
  let cevap = option.querySelector("span b").textContent;
  let soru = quiz.soruGetir(); //soruları al.
  clearInterval(counter);
  clearInterval(counterLine);

  //cevap doğruysa correct ve correctIcon eklenir. değilse incorrect ve incorrectIcon eklenir.
  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    option.classList.add("correct");
    option.insertAdjacentHTML("beforeend", ui.correctIcon);
  } else {
    option.classList.add("incorrect");
    option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
  }

  //seçim yapıldıktan sonra seçme işlemini iptal edilir.
  for (let i = 0; i < ui.option_list.children.length; i++) {
    ui.option_list.children[i].classList.add("disable");
  }

  ui.btn_next.classList.add("show");
}

//sayfayı yeniler ve başa döner.
ui.btn_quit.addEventListener("click", function () {
  window.location.reload();
});

//tekrar başlat dediğimizde quiz_box tekrar açılır ve 1.sorudan başlar doğru cevap sayısı sıfırlanır.
ui.btn_replace.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  ui.btn_start.click();
  ui.score_box.classList.remove("active");
  startTimer(10);
});

// setInterval(timer, 1000) diyerek zamanlayıcı oluşturduk. timer oluşturduğumuz fonksiyonun adı oluyor. 1000 ise kaç saniye hızla ilerlersin. çalıştırma işlemini startTimer(10); diyerek yaptık.
let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000); //zamanlayıcı oluşturur.

  function timer() {
    ui.time_second.textContent = time; //
    time--;

    if (time < 0) {
      clearInterval(counter); //zamanlayıcıyı temizler durdurur.
      ui.time_text.textContent = "Süre Bitti";

      let cevap = quiz.soruGetir().dogruCevap; // quiz içerisiden soru getire ulaş ve oradan doğru cevabı al ve cevaba ata.
      //option_list altındaki optionlara ulaş optionların altındaki span içerisinde ki b lerin texttini al cevap kontrolü sağla
      for (let option of ui.option_list.children) {
        if (cevap == option.querySelector("span b").textContent) {
          option.classList.add("correct");
          option.insertAdjacentHTML("beforeend", ui.correctIcon);
        }

        option.classList.add("disable");
      }
      ui.btn_next.classList.add("show");
    }
  }
}

let counterLine;
function startTimerLine() {
  counterLine = setInterval(timer, 20);
  let line_width = 0;

  function timer() {
    line_width += 1;
    ui.time_line.style.width = line_width + "px";

    if (line_width > 548) {
      clearInterval(counterLine);
    }
  }
}
