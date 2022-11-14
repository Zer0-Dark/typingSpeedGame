// array of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];
// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

// default level
let defaultLevelName = "Normal"; // change level from here
let defaultLevelSeconds = lvls[defaultLevelName];


//catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let container = document.querySelector(".container");
let options = document.querySelectorAll(".options div");
let setting = document.querySelector(".setting");


//setting level name + scoends + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event 
input.onpaste = () => false;

//start game 
startButton.onclick = function () {
    this.remove();
    input.focus();
    //generate word function
    genWords();

}


function genWords() {
    //get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get word index
    let wordIndex = words.indexOf(randomWord);
    console.log(wordIndex);
    //remove word from array
    words.splice(wordIndex, 1);
    //show the random word
    theWord.innerHTML = randomWord;
    //empty upcoming words
    upcomingWords.innerHTML = "";
    // generate words 
    for (let i = 0; i < words.length; i++) {
        //create div element
        let mainDiv = document.createElement("div");
        mainDiv.innerText = words[i];
        upcomingWords.append(mainDiv);
    }

    // call start play function
    startPlay();
}


function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    setting.remove();
    let start = setInterval(() => {
        if (theWord.innerHTML.toLowerCase()=== input.value.toLowerCase()){
            timeLeftSpan.innerHTML = "1";
        }
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            //stop the timer
            clearInterval(start);
            //compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                //empty input filed
                input.value = "";
                // increase score
                scoreGot.innerHTML++;
                // gen new word
                if (words.length > 0) {
                    //call gen words function
                    genWords();

                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    span.innerText = "Winner !";
                    finishMessage.append(span);
                    //remove upcoming words bpx
                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                span.innerText = "Game Over";
                finishMessage.append(span);
                removeAll();
                restart();

            }
        }
    }, 1000)
}


// restart button function
function restart() {
    let button = document.createElement("button");
    button.classList = "restart";
    button.innerText = "Restart";
    container.append(button);
    button.addEventListener("click", () => {
        location.reload();
    });

}
// remove all function
function removeAll() {
    upcomingWords.remove();
    input.remove();
    theWord.remove();
}

//remove options 
function removeOptions(){
    setting.remove();
}

// choose the level
options.forEach((ele) => {
    ele.onclick = (e) => {
        options.forEach((ele) => {
            ele.classList = "";
        })
        e.target.classList = "active"
        chooseLevel()
    }
})


function chooseLevel() {
    for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains("active")) {
            defaultLevelName = options[i].innerHTML;
            defaultLevelSeconds = lvls[defaultLevelName];
            lvlNameSpan.innerHTML = defaultLevelName;
            secondsSpan.innerHTML = defaultLevelSeconds;
            timeLeftSpan.innerHTML = defaultLevelSeconds;
            scoreTotal.innerHTML = words.length;

        }
    }
}

