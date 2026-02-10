let balance = localStorage.getItem("balance")
  ? parseInt(localStorage.getItem("balance"))
  : 0;

let level = localStorage.getItem("level")
  ? parseInt(localStorage.getItem("level"))
  : 1;

update();

function tapCoin(event) {
  balance += 1; // har bosishda +1
  save();
  update();

  // Floating +1 animatsiyasi
  const float = document.createElement("div");
  float.className = "floating";
  float.innerText = "+1";
  
  // Joyini tangani bosgan joyga qo‘yish
  const rect = event.target.getBoundingClientRect();
  float.style.left = rect.left + rect.width/2 + "px";
  float.style.top = rect.top + "px";
  
  document.body.appendChild(float);
  
  // 1 soniyadan keyin o‘chirish
  setTimeout(() => {
    float.remove();
  }, 1000);
}

function save() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("level", level);
}

function update() {
  document.getElementById("balance").innerText =
    balance.toLocaleString() + " S'";
  document.getElementById("balanceBig").innerText =
    balance.toLocaleString();
  document.getElementById("level").innerText = level;
}

// Balans va multi-touch (oldingi script.js kodini shu yerga qo‘shish mumkin)
let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 0;
let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;

update(); // sahifa ochilganda yangilash

// Coin element (asosiy sahifaga joylashtirilsa)
const coin = document.querySelector(".coin-css"); // agar mavjud bo‘lsa

// Bottom Navigation
const navItems = document.querySelectorAll(".nav-item");
const content = document.getElementById("content");

navItems.forEach(item => {
  item.addEventListener("click", function() {
    navItems.forEach(i => i.classList.remove("active"));
    this.classList.add("active");

    const section = this.dataset.section;

    if(section === "asosiy"){
      content.innerHTML = `
        <h1>NotCoin O‘yini 🪙</h1>
        <p>Tangani bosing va o‘yin boshlanadi!</p>
      `;
    } else {
      content.innerHTML = `
        <h1>Coming Soon 🚧</h1>
        <p>Bu bo‘lim hali tayyor emas!</p>
      `;
    }
  });
});

// LocalStorage saqlash va balans +1 animatsiyasi kodini oldingi script.js dan qo‘shish mumkin
