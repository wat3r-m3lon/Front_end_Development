var randomNumber1 = Math.floor(Math.random()*6 +1);
let img1 =document.querySelector(".img1");
let newImg="./images/dice"+randomNumber1+".png";
img1.src=newImg;

var randomNumber2 = Math.floor(Math.random()*6 +1);
let img2 =document.querySelector(".img2");
let newImg2="./images/dice"+randomNumber2+".png";
img2.src=newImg2;
let h1= document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
    h1.innerHTML = "Player One Wins";
} else if (randomNumber1 < randomNumber2) {
    h1.innerHTML = "Player Two Wins";
} else {
    h1.innerHTML = "It's a Draw";
}