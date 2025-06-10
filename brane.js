let money = 0;
let clickValue = 1;
let cursorGeneration = 0;

const moneyElement = document.getElementById("money");
const clickButton = document.getElementById("click-btn");
const glassesUpgrade = document.getElementById("glasses-upgrade");
const mustacheUpgrade = document.getElementById("mustache-upgrade");
const computerUpgrade = document.getElementById("computer-upgrade");
const cursorUpgrade = document.getElementById("cursor-upgrade");
const RedbullUpgrade = document.getElementById('idle-generator-upgrade')

function updateMoney() {
  moneyElement.textContent = money;
}

function addMoney(amount) {
  money += amount;
  updateMoney();
}

function updateUpgradeButtonStates() {
  glassesUpgrade.querySelector("button").disabled = money < 50;
  mustacheUpgrade.querySelector("button").disabled = money < 200;
  computerUpgrade.querySelector("button").disabled = money < 500;
  cursorUpgrade.querySelector("button").disabled = money < 100;
  RedbullUpgrade.querySelector("button").disabled = money < 1000;
}

setInterval(updateUpgradeButtonStates, 100);


clickButton.addEventListener("click", () => {
  addMoney(clickValue);
});


glassesUpgrade.querySelector("button").addEventListener("click", buyGlasses);
mustacheUpgrade.querySelector("button").addEventListener("click", buyMustache);
computerUpgrade.querySelector("button").addEventListener("click", buyComputer);
cursorUpgrade.querySelector("button").addEventListener("click", buyCursor);
RedbullUpgrade.querySelector("button").addEventListener("click", buyRedbull);


setInterval(() => {
  if (cursorGeneration > 0) {
    addMoney(cursorGeneration);
  }
}, 1000);

const music = document.getElementById("background-music");

document.addEventListener("click", () => {
  if (music?.paused) {
    music.volume = 0.3;
    music.play().catch(err => {
      console.error("Autoplay failed:", err);
    });
  }
}, { once: true });


let glassesPrice = 50;
let mustachePrice = 200;
let computerPrice = 500;
let cursorPrice = 100;
let RedbullPrice = 1000;


const priceMultiplier = 1.15;



function buyGlasses() {
  if (money >= glassesPrice) {
    clickValue += 1;
    money -= glassesPrice;
    glassesPrice = Math.floor(glassesPrice * priceMultiplier);
    updateMoney();
    updateUpgradeButtonStates();
  }
}

function buyMustache() {
  if (money >= mustachePrice) {
    clickValue += 5;
    money -= mustachePrice;
    mustachePrice = Math.floor(mustachePrice * priceMultiplier);
    updateMoney();
    updateUpgradeButtonStates();
  }
}

function buyComputer() {
  if (money >= computerPrice) {
    clickValue += 10;
    money -= computerPrice;
    computerPrice = Math.floor(computerPrice * priceMultiplier);
    updateMoney();
    updateUpgradeButtonStates();
  }
}

function buyCursor() {
  if (money >= cursorPrice) {
    cursorGeneration += 1;
    money -= cursorPrice;
    cursorPrice = Math.floor(cursorPrice * priceMultiplier);
    updateMoney();
    updateUpgradeButtonStates();
  }
}

function buyRedbull() {
  if (money >= RedbullPrice) {
    cursorGeneration += 5;
    money -= RedbullPrice;
    RedbullPrice = Math.floor(RedbullPrice * priceMultiplier);
    updateMoney();
    updateUpgradeButtonStates();
  }

}


function updateUpgradeButtonStates() {

  glassesUpgrade.querySelector("button").disabled = money < glassesPrice;
  mustacheUpgrade.querySelector("button").disabled = money < mustachePrice;
  computerUpgrade.querySelector("button").disabled = money < computerPrice;
  cursorUpgrade.querySelector("button").disabled = money < cursorPrice;
  RedbullUpgrade.querySelector("button").disabled = money < RedbullPrice;


  glassesUpgrade.querySelector("p").textContent = `Cost: $${glassesPrice.toLocaleString()}`;
  mustacheUpgrade.querySelector("p").textContent = `Cost: $${mustachePrice.toLocaleString()}`;
  computerUpgrade.querySelector("p").textContent = `Cost: $${computerPrice.toLocaleString()}`;
  cursorUpgrade.querySelector("p").textContent = `Cost: $${cursorPrice.toLocaleString()}`;
  RedbullUpgrade.querySelector("p").textContent = `Cost: $${RedbullPrice.toLocaleString()}`;
}


let idleGeneratorCost = 1000;
let idleGeneratorActive = false;
const idleGeneratorUpgrade = document.getElementById("idle-generator-upgrade");

function buyIdleGenerator() {
  if (money >= idleGeneratorCost && !idleGeneratorActive) {
    money -= idleGeneratorCost;
    idleGeneratorActive = true;
    updateMoney();
    updateUpgradeButtonStates();
    idleGeneratorUpgrade.querySelector("button").disabled = true;
    startIdleGenerator();
  }
}

function startIdleGenerator() {
  setInterval(() => {
    addMoney(5);
  }, 1000);
}


idleGeneratorUpgrade.querySelector("button").addEventListener("click", buyIdleGenerator);


function updateIdleGeneratorButtonState() {
  idleGeneratorUpgrade.querySelector("button").disabled = money < idleGeneratorCost || idleGeneratorActive;
  idleGeneratorUpgrade.querySelector("p").textContent = `Cost: $${idleGeneratorCost.toLocaleString()}`;
}

updateIdleGeneratorButtonState();

idleGeneratorUpgrade.querySelector("button").addEventListener("click", buyIdleGenerator);
