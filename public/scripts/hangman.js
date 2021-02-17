(()=>{"use strict";var e=["Beans","Tortitude","Croissant","Fluffy","Feline","Tabby","Persian","Maine Coon","Scottish Fold","Shorthair","Ragdoll"],s=["Golden Retriever","Labrador","Great Dane","Husky","Chihuahua","Poodle","Bulldog","Dachshund"],n=["Pizza","Cookies","Cake","Hot Cheetos","Chicken","Mac n Cheese"];function t(e,s){for(var n=0;n<s.length;n++){var t=s[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(e,s,n){return s in e?Object.defineProperty(e,s,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[s]=n,e}var a=function(){function s(n,t){var a=this;!function(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}(this,s),r(this,"handleNewGame",(function(){var e=o(a.wordsArray,a.playerWordsGuessed);if("array full"===e)return a.playerWordsGuessed=[],void a.handleNewGame();if(void 0!==e){var s=i(e);a.newPuzzle(e,s),a.getPuzzle(),window.removeEventListener("keypress",a.handleKeyPress),window.addEventListener("keypress",a.handleKeyPress)}else a.handleNewGame();document.querySelector(".new-game").addEventListener("click",a.handleNewGame)})),r(this,"handleKeyPress",(function(e){"playing"!==a.status.string&&window.removeEventListener("keypress",a.handleKeyPress);var s=e.key.toLowerCase();c(s)&&(a.makeGuess(s),a.getPuzzle(),document.querySelector(".new-game").addEventListener("click",a.handleNewGame))})),r(this,"setWordsArray",(function(e){a.wordsArray=e,a.handleNewGame()})),this.word=n.toLowerCase().split(""),this.wordsArray=e,this.numGuesses=t,this.remainingGuesses=t,this.guessArray=[],this.status={string:"playing",percent:100},this.originalWord=n,this.playerWordsGuessed=[]}var n,a;return n=s,(a=[{key:"newPuzzle",value:function(e,s){this.word=e.toLowerCase().split(""),this.numGuesses=s,this.remainingGuesses=s,this.guessArray=[],this.status={string:"playing",percent:100},this.originalWord=e}},{key:"getPuzzle",value:function(){var e=this,s="";this.word.forEach((function(n){var t=e.guessArray.includes(n);s+=t?n:" "===n?" ":"*"})),function(e,s,n,t,r){var a=document.querySelector("#game");a.innerHTML="";var i=document.createElement("img");i.className="image",function(e,s){100===e.percent?s.src="./images/100.png":e.percent>=90?s.src="./images/90.png":e.percent>=80?s.src="./images/80.png":e.percent>=70?s.src="./images/70.png":e.percent>=60?s.src="./images/60.png":e.percent>=50?s.src="./images/50.png":e.percent>=40?s.src="./images/40.png":e.percent>=30?s.src="./images/30.png":e.percent>=20?s.src="./images/20.png":e.percent>=10?s.src="./images/10.png":s.src="./images/0.png"}(n,i);var o=document.createElement("div");o.className="word-container",function(e,s){var n=e.split(""),t=document.createElement("div");t.classList.add("word-box"),n.forEach((function(e){var n=document.createElement("p");if(" "!==e)n.className="puzzle-letter",n.innerText=e,t.appendChild(n);else{if(" "!==e)return;s.appendChild(t);var r=document.createElement("div");r.className="puzzle-space",s.appendChild(r),(t=document.createElement("div")).classList.add("word-box")}})),s.appendChild(t)}(e,o);var c=document.createElement("p");c.classList.add("status-text"),function(e,s,n,t){switch(e.string){case"playing":t.innerText="You have ".concat(s," guesses left");break;case"won":t.innerText="Congrats you won!";break;case"failed":t.innerText="Sorry you lost. The correct word was ".concat(n)}}(n,s,t,c);var u=document.createElement("div");u.className="guesses",function(e,s){var n=document.createElement("div");n.classList.add("word-box","guesses-box"),e.forEach((function(e){var s=document.createElement("p");s.className=" "!==e?"puzzle-letter":"puzzle-space",s.innerHTML=e,n.appendChild(s)})),s.appendChild(n)}(r,u);var l=document.createElement("button");l.className="new-game",l.innerText="New Game!",a.append(i,o,c,u,l)}(s,this.remainingGuesses,this.status,this.originalWord,this.guessArray)}},{key:"makeGuess",value:function(e){e=e.toLowerCase(),this.guessArray.includes(e)||1!==e.length||(this.word.includes(e)||(this.remainingGuesses-=1),this.guessArray.push(e),this.getStatus())}},{key:"getStatus",value:function(){var e=this;this.status.percent=Math.floor(this.remainingGuesses/this.numGuesses*100);var s=this.word.every((function(s){return" "===s||!!e.guessArray.includes(s)}));this.remainingGuesses>0&&!s&&(this.status.string="playing"),s&&(this.status.string="won"),0===this.remainingGuesses&&(this.status.string="failed")}}])&&t(n.prototype,a),s}(),i=function(e){var s=e.length;return s<=5?7:s<=8?8:s<=10?9:10};function o(e,s){var n,t=Math.floor(Math.random()*e.length);return s.includes(e[t])?(n=s,e.every((function(e){return n.includes(e)}))?"array full":void 0):(s.push(e[t]),e[t])}var c=function(e){return!!"abcdefghijklmnopqrstuvwxyz".split("").includes(e)},u=o(e,[]),l=new a(u,i(u));document.querySelector("#category").addEventListener("change",(function(t){var r=[];switch(t.target.value){case"cats":r=e;break;case"dogs":r=s;break;case"food":r=n}l.setWordsArray(r)})),l.getPuzzle(),document.querySelector(".new-game").addEventListener("click",l.handleNewGame),window.addEventListener("keypress",l.handleKeyPress)})();