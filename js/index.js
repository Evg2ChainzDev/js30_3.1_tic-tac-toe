let winComb = [
  [1,2,3],
  [1,4,7],
  [1,5,9],
  [2,5,8],
  [3,6,9],
  [3,5,7],
  [4,5,6],
  [7,8,9]
]

let winIndex = 0;

let Draw = true;
let last10resultArr=[]
let lastResultsContainer=document.querySelector('.last-results-container')

let ceil = document.querySelectorAll('.game-item');
let reset = document.querySelector('.reset-game')
let message = document.querySelector('.game-title')
let allLines = document.querySelectorAll('.line');

let stepCount=0;
let player = "X"
let dataX=[]
let dataO=[]
let winCounts = 0;


ceil.forEach(el=>el.addEventListener('click', currentStep))

function currentStep() {
  let num = + this.dataset.index
  // console.log(num)
  if (!this.textContent) {
    this.textContent = player;
    (player === 'X')?(dataX.push(num)&&this.classList.add('x')):(dataO.push(num)&&this.classList.add('o'))
    this.classList.remove('game-item__hover-available');
    if (((dataX.length>2)||(dataO.length>2)) && 
    (checkWin(dataO,num)||checkWin(dataX,num))) {
      ceil.forEach(el=>el.removeEventListener('click', currentStep))
      stepCount++
      allResultsUpdates ();
      // addLastResultToArray()
      // deletePrevResult()
      // last10resultArr.forEach(el=>writeResult(el))
      return 
    }
 
    changePlayer();
    stepCount++;
    // console.log(`${stepCount}`);
    (stepCount==9)?((message.textContent="Ничья")&&(allResultsUpdates (Draw))):(message.textContent=`Следующий ход ${player}`)
  }
}

function allResultsUpdates (Draw) {
      addLastResultToArray(Draw)
      deletePrevResult()
      last10resultArr.forEach(el=>writeResult(el))
}

function addLastResultToArray (Draw) {
      let nowHours = new Date().getHours()
      let nowMinutes = new Date().getMinutes()
      nowMinutes = (nowMinutes<10)?("0"+nowMinutes):nowMinutes;
      let nowSeconds = new Date().getSeconds()
      nowSeconds = (nowSeconds<10)?("0"+nowSeconds):nowSeconds;
      let noDrawRes = [player,stepCount,nowHours,nowMinutes,nowSeconds]
      let DrawRes = ['Ничья',,nowHours,nowMinutes,nowSeconds]
      let result = Draw?DrawRes:noDrawRes
      console.log(result)
      if (last10resultArr.length<10) {
        last10resultArr.push(result)
      } else {
        last10resultArr.shift();
        last10resultArr.push(result)
      }
}

function deletePrevResult() {
    //delete all prev results start
    let allPrevResult =document.querySelectorAll('.result')
    allPrevResult.forEach(el=>el.remove())
    //delete all prev results end
}

function writeResult(element) {

  let lastResultString=document.createElement('div')
  

  if (!element[1]) {
    message.textContent=`Ничья`;
    lastResultString.textContent=`Ничья в ${element[2]}:${element[3]}:${element[4]}`} 
    else {
    message.textContent=`Победили ${element[0]} за ${element[1]} ходов`;
    lastResultString.textContent=`Победили ${element[0]} за ${element[1]} ходов в ${element[2]}:${element[3]}:${element[4]}`
  }

  lastResultString.classList.add('result')
  lastResultsContainer.prepend(lastResultString)
}

function changePlayer () {
  (player === "X")?(player = "O"):(player = "X")
}

reset.addEventListener('click', ()=>{
  ceil.forEach(el=>{
    el.textContent = "";
    el.classList.remove('x','o');
    }
  )

  allLines.forEach(el=>{
    el.classList.remove('line-visible');
    })
  
  dataX=[]
  dataO=[]
  player = "X"
  message.textContent=`Следующий ход ${player}`
  stepCount = 0;
  ceil.forEach(el=>{
    el.addEventListener('click', currentStep)
    el.classList.add('game-item__hover-available')
})
})



function checkWin(arr, number) {
  for (var w=0; w< winComb.length; w++) {
    let someWinArr = winComb[w]
    let countWins=0;
    if (someWinArr.indexOf(number) !==-1) {
      for (let k=0; k<someWinArr.length;k++) {
        if(arr.indexOf(someWinArr[k])!==-1){
          countWins++;
          if (countWins===3){
            winIndex = w;
            ++winIndex
            // console.log(`win index = ${winIndex}`)
            drawWinline()
            return true
          }
        }
      }
      count = 0
    }
  }
}
//=========== draw winline start =============
function drawWinline () {
  // console.log(winIndex)
  let winLine = document.querySelector(`[data-winline="${winIndex}"]`)
  winLine.classList.add('line-visible')
  
}
// console.log(drawWinline())

//=========== draw winline end =============

// ========== local storage start ============
function setLocalStorage() {
  localStorage.setItem('last10resultArr', last10resultArr);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('last10resultArr')) {
    let last10resultArrString = localStorage.getItem('last10resultArr');
    // console.log(last10resultArrString)
    last10resultArrString = last10resultArrString.split(',')
    // console.log(`last10resultArrString = ${last10resultArrString}`)
    let last10resultArrLength=last10resultArrString.length/5
    // console.log(`last10resultArrLength = ${last10resultArrLength}`)

    last10resultArr=[]
    for (let i=0; i<last10resultArrLength;i++){
      let arrElement = last10resultArrString.splice(0,5);
      // console.log(arrElement)
      last10resultArr.push(arrElement)
    }
    last10resultArr.forEach(el=>writeResult(el))
  }
}
window.addEventListener('load', getLocalStorage)
// ========== local storage end ============

// ========== firewarks start ============

// window.addEventListener("resize", resizeCanvas, false);
//         window.addEventListener("DOMContentLoaded", onLoad, false);
        
//         window.requestAnimationFrame = 
//             window.requestAnimationFrame       || 
//             window.webkitRequestAnimationFrame || 
//             window.mozRequestAnimationFrame    || 
//             window.oRequestAnimationFrame      || 
//             window.msRequestAnimationFrame     || 
//             function (callback) {
//                 window.setTimeout(callback, 1000/60);
//             };
        
//         var canvas, ctx, w, h, particles = [], probability = 0.04,
//             xPoint, yPoint;
        
        
        
        
        
//         function onLoad() {
//             canvas = document.getElementById("canvas");
//             ctx = canvas.getContext("2d");
//             resizeCanvas();
            
//             window.requestAnimationFrame(updateWorld);
//         } 
        
//         function resizeCanvas() {
//             if (!!canvas) {
//                 w = canvas.width = window.innerWidth;
//                 h = canvas.height = window.innerHeight;
//             }
//         } 
        
//         function updateWorld() {
//             update();
//             paint();
//             window.requestAnimationFrame(updateWorld);
//         } 
        
//         function update() {
//             if (particles.length < 500 && Math.random() < probability) {
//                 createFirework();
//             }
//             var alive = [];
//             for (var i=0; i<particles.length; i++) {
//                 if (particles[i].move()) {
//                     alive.push(particles[i]);
//                 }
//             }
//             particles = alive;
//         } 
        
//         function paint() {
//             ctx.globalCompositeOperation = 'source-over';
//             ctx.fillStyle = "rgba(0,0,0,0.2)";
//             ctx.fillRect(0, 0, w, h);
//             ctx.globalCompositeOperation = 'lighter';
//             for (var i=0; i<particles.length; i++) {
//                 particles[i].draw(ctx);
//             }
//         } 
        
//         function createFirework() {
//             xPoint = Math.random()*(w-200)+100;
//             yPoint = Math.random()*(h-200)+100;
//             var nFire = Math.random()*50+100;
//             var c = "rgb("+(~~(Math.random()*200+55))+","
//                  +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
//             for (var i=0; i<nFire; i++) {
//                 var particle = new Particle();
//                 particle.color = c;
//                 var vy = Math.sqrt(25-particle.vx*particle.vx);
//                 if (Math.abs(particle.vy) > vy) {
//                     particle.vy = particle.vy>0 ? vy: -vy;
//                 }
//                 particles.push(particle);
//             }
//         } 
        
//         function Particle() {
//             this.w = this.h = Math.random()*4+1;
            
//             this.x = xPoint-this.w/2;
//             this.y = yPoint-this.h/2;
            
//             this.vx = (Math.random()-0.5)*10;
//             this.vy = (Math.random()-0.5)*10;
            
//             this.alpha = Math.random()*.5+.5;
            
//             this.color;
//         } 
        
//         Particle.prototype = {
//             gravity: 0.05,
//             move: function () {
//                 this.x += this.vx;
//                 this.vy += this.gravity;
//                 this.y += this.vy;
//                 this.alpha -= 0.01;
//                 if (this.x <= -this.w || this.x >= screen.width ||
//                     this.y >= screen.height ||
//                     this.alpha <= 0) {
//                         return false;
//                 }
//                 return true;
//             },
//             draw: function (c) {
//                 c.save();
//                 c.beginPath();
                
//                 c.translate(this.x+this.w/2, this.y+this.h/2);
//                 c.arc(0, 0, this.w, 0, Math.PI*2);
//                 c.fillStyle = this.color;
//                 c.globalAlpha = this.alpha;
                
//                 c.closePath();
//                 c.fill();
//                 c.restore();
//             }
//         } 
// ========== firewarks end ============
