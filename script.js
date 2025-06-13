let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGame_btn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let turnO = true; // playerO playerX
let count = 0; // To track the draw
const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){
            //playerO
            box.innerText = "O" ;
            box.classList.add("O-color");
            box.classList.remove("X-color");
            turnO = false;
        }
        else{
            //playerX
            box.innerText = "X";
            box.classList.add("X-color");
            box.classList.remove("O-color");
            turnO = true;
        }
        box.disabled = true;
        count++;
        if(checkWinner()){
            return;
        }
        if(checkDraw()){
            return;
        }
    });
});

const checkDraw = () => {
    if(count === 9){
        showDraw();
        return true;
    }
    return false;
}
const checkWinner = () => {
     for(let pattern of winpatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
               showWinner(pos1val);
               return true;
            }
        }
     }
     return false; 
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
}

const showWinner = (Winner) => {
      msg.innerText = `Congratulations!,Winner is ${Winner}`;
      msgContainer.classList.remove("hide");
      disableboxes();
};

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.classList.remove("O-color", "X-color");
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add("hide");
};

reset_btn.addEventListener("click",resetGame);
newGame_btn.addEventListener("click",resetGame);