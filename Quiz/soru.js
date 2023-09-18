/*Constructor ile tek bir yerden  kalıp tanımladık, belli nesneler ve tekrar eden propertyler oluşturduk. Yani diğer sorularda da aynı özelliklere ve aynı propertylere sahip olacağından tek bir yerden yönettik.
 */
//this Constructor dan türetilen her bir nesneyi temsil eder.
function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}

//burada ki soruların her biri ayni propertylere sahip. Constructor oluşturarak tek bir yerden yönetimini sağladık.
let sorular = [
  new Soru(
    "1-Hangisi javascript paket yönetim uygulasıdır?",
    { a: "Node.js", b: "Typescript", c: "Npm", d: "Nuget" },
    "c"
  ),
  new Soru(
    "2-Hangisi frontend kapsamında değerlendirilmez?",
    { a: "css", b: "html", c: "javascipt", d: "sql" },
    "d"
  ),
  new Soru(
    "3-Hangisi backend kapsamında değerlendirilir?",
    { a: "node.js", b: "typescript", c: "angular", d: "react" },
    "a"
  ),
  new Soru(
    "4-Hangisi javascript programlama dilini kullanmaz?",
    { a: "react", b: "angular", c: "vuejs", d: "asp.net" },
    "d"
  ),
];

//Her bir soru için aynı metodu kullanacağından veri fazlalığı olmuş oluyor biz bunu önlemek için Sorunun prototypeına ekleriz ki veri fazlalığını önleyelim ve tek bir yerden yönetelim. Yani örneğin 200 tane soru oluşturduk her bir soru içerisine bu metodu yazmak istemeyiz bunu önlemek için prototype içerisine ekledik. Şu şekilde düşünebiliriz bir fonksiyon ekleyeceksek ve bu fonksiyon tanımlamış olduğumuz bütün objelerede hizmet edecekse bu metodu prototype içerisine almış olsak işimizi kolaylaştırır.
Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};
