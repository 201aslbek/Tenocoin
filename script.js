document.addEventListener("DOMContentLoaded", function(){

const tg = window.Telegram?.WebApp;
if(tg) tg.expand();

const user = tg?.initDataUnsafe?.user;

/* ===== STATE ===== */

let balance = Number(localStorage.getItem("balance")) || 0;
let level = 1;
let clicks = Number(localStorage.getItem("clicks")) || 1000;

/* ===== ELEMENTS ===== */

const balanceEl = document.getElementById("balance");
const levelEl = document.getElementById("level");
const clicksEl = document.getElementById("clicks");
const coin = document.getElementById("coin");

/* ===== UPDATE UI ===== */

function updateUI(){
  balanceEl.innerText = balance;
  levelEl.innerText = level;
  clicksEl.innerText = clicks;
}

updateUI();

/* ===== MULTI TOUCH ===== */

coin.addEventListener("touchstart", function(e){

  e.preventDefault();
  if(clicks <= 0) return;

  let touchCount = e.touches.length;

  for(let i=0;i<touchCount;i++){
    if(clicks <= 0) break;

    balance += 1;
    clicks--;

    if(navigator.vibrate){
      navigator.vibrate(30);
    }

    showPlus(1, e.touches[i].clientX, e.touches[i].clientY);
  }

  save();
  updateUI();
});

/* ===== CLICK ===== */

coin.addEventListener("click", function(e){

  if(clicks <= 0) return;

  balance += 1;
  clicks--;

  if(navigator.vibrate){
    navigator.vibrate(15);
  }

  showPlus(1, e.clientX, e.clientY);

  save();
  updateUI();
});

/* ===== FLOATING TEXT ===== */

function showPlus(amount,x,y){
  const plus = document.createElement("div");
  plus.className = "plus";
  plus.innerText = "+"+amount;
  plus.style.left = x+"px";
  plus.style.top = y+"px";
  document.body.appendChild(plus);
  setTimeout(()=>plus.remove(),1000);
}

/* ===== SAVE ===== */

function save(){
  localStorage.setItem("balance",balance);
  localStorage.setItem("clicks",clicks);
}

/* ===== TABS ===== */

document.querySelectorAll(".tab").forEach(tab=>{
  tab.onclick=function(){
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));

    this.classList.add("active");
    document.getElementById(this.dataset.page).classList.add("active");
  }
});

/* ===== FRIENDS ===== */

document.getElementById("shareBtn").onclick=function(){
  window.open("https://t.me/tenocoinbot");
};

document.getElementById("copyBtn").onclick=function(){
  navigator.clipboard.writeText("https://t.me/tenocoinbot");
};

/* ===== PROMO ===== */

document.getElementById("promoBtn").onclick=function(){
  document.getElementById("promoBox").style.display="block";
};

document.getElementById("promoSubmit").onclick=function(){
  let code=document.getElementById("promoInput").value.trim();
  if(code==="NEW"){
    balance+=250;
    save();
    updateUI();
  }
};

/* ===== USER INFO ===== */

if(user){
  document.getElementById("username").innerText=user.first_name;
  document.getElementById("profileName").innerText=user.first_name;

  if(user.username){
    let url=`https://t.me/i/userpic/320/${user.username}.jpg`;
    document.getElementById("avatar").src=url;
    document.getElementById("profileAvatar").src=url;
  }
}

let userId=localStorage.getItem("userId");
if(!userId){
  userId=Math.floor(100000000+Math.random()*900000000);
  localStorage.setItem("userId",userId);
}

document.getElementById("userId").innerText=userId;
document.getElementById("profileId").innerText=userId;

});
document.querySelectorAll("button").forEach(button=>{
button.addEventListener("click", function(e){

const rect = button.getBoundingClientRect();
const circle = document.createElement("span");
const diameter = Math.max(button.clientWidth, button.clientHeight);
const radius = diameter / 2;

circle.style.width = circle.style.height = `${diameter}px`;
circle.style.left = `${e.clientX - rect.left - radius}px`;
circle.style.top = `${e.clientY - rect.top - radius}px`;
circle.classList.add("ripple");

const ripple = button.getElementsByClassName("ripple")[0];
if(ripple){
ripple.remove();
}

button.appendChild(circle);
});
});
document.querySelectorAll(".button").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const circle = document.createElement("span");
    circle.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;

    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    btn.appendChild(circle);
  });
});
let balance = 0;

const coin = document.getElementById("coin");
const balanceDisplay = document.getElementById("balanceDisplay");

coin.addEventListener("click", (e) => {
  // Coin kattalashishi effekti
  {coin.style.transform = "scale(0.9)";}
  setTimeout(() => {
    coin.style.transform = "scale(1)";
  }, 100);

  // +1 effekti
  balance += 1;
  balanceDisplay.innerText = "Coins: " + balance;

  const plus = document.createElement("div");
  plus.className = "floating-plus";
  plus.innerText = "+1";

  // Coin ichida ko‘rsatish
  const rect = coin.getBoundingClientRect();
  plus.style.left = (rect.width/2 - 10) + "px";
  plus.style.top = (rect.height/2 - 20) + "px";

  coin.appendChild(plus);

  setTimeout(() => {
    plus.remove();
  }, 1000);
});
