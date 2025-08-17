let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO=true;//playerX, playerO

//create array for wining game patterns

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if (turnO) {
            box.innerText="O";
            turnO = false;
            box.style.color="black";
        } else {
            box.innerText="X";
            turnO = true;
        }
        box.disabled= true;

        checkWinner();
    });
});


const disableBoxes = () =>{
    for (let box of boxes ) {
        box.disabled = true ;
    }
}
const enableBoxes = () =>{
    for (let box of boxes ) {
        box.disabled = false ;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    let hasWin = false;
    for (let patterns of winPatterns) {
        let pos1val=boxes[patterns[0]].innerText;
        let pos2val=boxes[patterns[1]].innerText;
        let pos3val=boxes[patterns[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val !="") {
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner",pos1val);
                showWinner(pos1val);
                hasWin = true;
                return ;
            }
        }
    }
            if (!hasWin) {
                const allBoxes = [...boxes].every((box) => box.innerText !== "");
                if (allBoxes) {
                    msgContainer.classList.remove('hide');
                    msg.innerText = 'Match Drawn';
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);