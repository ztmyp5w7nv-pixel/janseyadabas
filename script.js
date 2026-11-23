const booksData = [
  {
    book: "İnce Memed",
    author: "Yaşar Kemal",
    tag: "Direniş & Umut",
    accent: "#ff5e5b",
    soft: "rgba(255, 94, 91, 0.11)",
    description: "Çukurova’nın boğucu düzenine karşı baş eğmeyen bir ruhun destansı uyanışı.",
    quote: "“İnsanların umudu, karanlığın en koyu yerinde bile filizlenir.”",
    comment: "En ağır baskıların ortasında bile insanın kendi onurunu ve ışığını koruyabilmesi, edebiyatın en sahici öğretmenidir."
  },
  {
    book: "Vadideki Zambak",
    author: "Honoré de Balzac",
    tag: "İncelik & Vefa",
    accent: "#6c5ce7",
    soft: "rgba(108, 92, 231, 0.11)",
    description: "Sessiz bir zarafetin ve derin bir iç dünyanın zamanla olgunlaşan yankısı.",
    quote: "“Gerçek zarafet, ruhun inceliğinden ve sabrından doğar.”",
    comment: "Gösterişten uzak, ölçülü bir duyarlılığın kalpte bıraktığı izi hatırlatan dingin ve etkileyici bir satır."
  },
  {
    book: "İnsanın Acısını İnsan Alır",
    author: "Şükrü Erbaş",
    tag: "Şefkat & Bağ",
    accent: "#14919b",
    soft: "rgba(20, 145, 155, 0.12)",
    description: "Yalnızlığın keskinleştiği yerde bir insan sesinin ve anlayışın iyileştirici gücü.",
    quote: "“Bir söz, bir bakış bazen ömürlük bir yarayı sarar.”",
    comment: "Öğretmenin sınıf içinde kurduğu o tek bir cümlenin ya da bakışın, bir öğrencinin hayatını nasıl değiştirebileceğini anlatır."
  },
  {
    book: "Puslu Kıtalar Atlası",
    author: "İhsan Oktay Anar",
    tag: "Düş & Hakikat",
    accent: "#d97706",
    soft: "rgba(217, 119, 6, 0.12)",
    description: "Düş ile gerçeğin iç içe geçtiği, her satırı ayrı bir kapı aralayan büyülü bir atlas.",
    quote: "“Düş kurabilen insan, kendi dünyasını yeniden kurabilir.”",
    comment: "Hayal gücünü canlı tutmanın, kelimelerle yeni ufuklar açmanın en zarif karşılığı."
  }
];

const rootEl = document.documentElement;
const chips = document.querySelectorAll(".book-chip");
const quoteCard = document.getElementById("quoteCard");
const quoteBook = document.getElementById("quoteBook");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteTag = document.getElementById("quoteTag");
const quoteDesc = document.getElementById("quoteDesc");
const quoteText = document.getElementById("quoteText");
const quoteComment = document.getElementById("quoteComment");

function applyBook(index, animate = true) {
  const item = booksData[index];
  if (!item) return;

  chips.forEach((chip, i) => {
    chip.classList.toggle("active", i === index);
  });

  const updateContent = () => {
    rootEl.style.setProperty("--active-accent", item.accent);
    rootEl.style.setProperty("--active-soft", item.soft);
    quoteBook.textContent = item.book;
    quoteAuthor.textContent = item.author;
    quoteTag.textContent = item.tag;
    quoteDesc.textContent = item.description;
    quoteText.textContent = item.quote;
    quoteComment.textContent = item.comment;
  };

  if (!animate) {
    updateContent();
    return;
  }

  quoteCard.classList.add("is-switching");
  window.setTimeout(() => {
    updateContent();
    quoteCard.classList.remove("is-switching");
  }, 160);
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const idx = Number(chip.dataset.book);
    applyBook(idx, true);
  });
});

applyBook(0, false);

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
