const books = [
  {
    num: "01",
    bg: "#fff0f4",
    fg: "#db2777",
    title: "İnce Memed",
    author: "Yaşar Kemal",
    quote: "“İnsanoğlunun ne kadar zalim olabileceğini görmek için biraz daha yaşamak gerekirdi.”"
  },
  {
    num: "02",
    bg: "#ecfdf5",
    fg: "#059669",
    title: "Vadideki Zambak",
    author: "Honoré de Balzac",
    quote: "“Bazı aşklar vardır ki insanın içinde sessizce büyür ve hiçbir zaman tam olarak sonlanmaz.”"
  },
  {
    num: "03",
    bg: "#fffbeb",
    fg: "#d97706",
    title: "İnsanın Acısını İnsan Alır",
    author: "Şükrü Erbaş",
    quote: "“İnsanın acısını insan alır; bir bakış, bir ses ya da yalnızca anlaşılmak yetermiş.”"
  },
  {
    num: "04",
    bg: "#f5f3ff",
    fg: "#7c3aed",
    title: "Puslu Kıtalar Atlası",
    author: "İhsan Oktay Anar",
    quote: "“Bir şeyi gerçekten düşünürsen, o şey senin için var olmaya başlar.”"
  }
];

const booksGrid = document.getElementById("books-grid");
const quoteBadge = document.getElementById("quote-book-badge");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const nextBtn = document.getElementById("next-btn");
const popBtn = document.getElementById("pop-btn");
const fxLayer = document.getElementById("fx-layer");
const scrollProgress = document.getElementById("scroll-progress");

let current = 0;

function pickBook(i) {
  current = i;
  const item = books[i];

  quoteText.classList.remove("quote-anim");
  void quoteText.offsetWidth;
  quoteText.textContent = item.quote;
  quoteText.classList.add("quote-anim");

  quoteBadge.textContent = `KİTAP #${item.num}`;
  quoteAuthor.textContent = `${item.title} — ${item.author}`;

  booksGrid.querySelectorAll(".book-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === i);
  });
}

function initBooks() {
  booksGrid.innerHTML = "";
  books.forEach((book, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "book-btn";
    btn.innerHTML = `
      <span class="book-num" style="background:${book.bg};color:${book.fg};">#${book.num}</span>
      <h3 class="book-name">${book.title}</h3>
      <div class="book-writer">${book.author}</div>
    `;
    btn.addEventListener("click", () => pickBook(i));
    booksGrid.appendChild(btn);
  });
  pickBook(0);
}

nextBtn.addEventListener("click", () => {
  pickBook((current + 1) % books.length);
});

function burst(x, y) {
  const icons = ["🎵", "🎶", "🌸", "📚", "✨", "💛"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("span");
    el.className = "spark";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];

    const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4;
    const dist = 80 + Math.random() * 150;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist - 30}px`);
    el.style.setProperty("--rot", `${(Math.random() - 0.5) * 300}deg`);

    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

popBtn.addEventListener("click", (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2);
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

window.addEventListener("scroll", () => {
  const top = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${max > 0 ? (top / max) * 100 : 0}%`;
});

initBooks();

window.addEventListener("load", () => {
  setTimeout(() => burst(window.innerWidth / 2, 140), 450);
});
