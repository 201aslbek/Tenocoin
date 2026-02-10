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

