const ROW_NUM=3;
const COL_NUM=3;
var main=document.getElementsByTagName('main')[0];
var input1;
var input2;
var player1;
var player2;
var playerOneDetail;
var playerTwoDetail;
var playerOneMoveDetail;
var playerTwoMoveDetail;
var totalMoves=0
var isFirstMove = true;  //boolean
var currentPlayer;

class Player {
    constructor(name,symbol) {
        this.name=name;
        this.move=0;
        this.symbol=symbol;
        this.winner=false;
    }   
}


gameMatrix= new Array(ROW_NUM);
for (let i=0;i<ROW_NUM;i++) {  
    gameMatrix[i]=new Array(COL_NUM);
}

var circleSpan=document.createElement('div')
circleSpan.classList.add('circle');

var crossSpan=document.createElement('div')
crossSpan.classList.add('cross');


function initializeLoginScreen() {
    let loginTemplate=document.getElementById('login-template');
    main.innerHTML=loginTemplate.innerHTML;
    input1=document.getElementById('playerName1');
    input2=document.getElementById('playerName2');
    input1.addEventListener('keyup',checkValidity);
    input2.addEventListener('keyup',checkValidity);

}

function checkValidity() {
    if (input1.value.length>0 && input2.value.length>0) {
        //enable play button
        document.getElementById('play-button').removeAttribute('disabled');
    }
}


function play() {
        player1=new Player(input1.value,"X");   //player 1 plays with X
        player2=new Player(input2.value,"O");   //player 2 plays with O
        loginScreen=document.querySelector('#login-screen');
        loginScreen.parentNode.removeChild(loginScreen);
        initializeGameScreen();  
}

function initializeGameScreen() {
    let gameTemplate=document.getElementById('game-template');
    main.innerHTML=gameTemplate.innerHTML;
    playerOneDetail=document.getElementById('player1');
    playerTwoDetail=document.getElementById('player2');
    playerOneDetail.classList.add('active-player');
    playerOneDetail.getElementsByClassName('player-name')[0].innerHTML=player1.name;
    playerOneMoveDetail=playerOneDetail.getElementsByClassName('player-move')[0];
    playerOneMoveDetail.innerHTML="Moves: "+player1.move;
    playerTwoDetail.getElementsByClassName('player-name')[0].innerHTML=player2.name;
    playerTwoMoveDetail=playerTwoDetail.getElementsByClassName('player-move')[0];
    playerTwoMoveDetail.innerHTML="Moves: "+player2.move;
    var gridContainer=document.getElementById('grid-container');
    console.log(gridContainer);
    for (let rowIdx=0;rowIdx<ROW_NUM;rowIdx++) {
        let rowContainer=document.createElement('div');
        rowContainer.className='row';
        rowContainer.id='row'+rowIdx;
        for (let colIdx=0;colIdx<COL_NUM;colIdx++) {
            let box=document.createElement('div');
            box.className='box';
            box.setAttribute('row',rowIdx);
            box.setAttribute('col',colIdx);
            box.addEventListener('click',()=> {
                setMove(rowIdx,colIdx);
            })
            rowContainer.appendChild(box);
        }
        gridContainer.appendChild(rowContainer);
    }
}

function setMove(row,column) {
    console.log(`You clicked R ${row}, C ${column}`);

    if (isFirstMove===true) {
         currentPlayer=player1;
        isFirstMove=false;
    }
    console.log(`Current Player`,currentPlayer.name);
    if (gameMatrix[row][column]==undefined || gameMatrix[row][column]==null) {
        totalMoves++;
        //empty square-valid move
        gameMatrix[row][column]=currentPlayer.symbol;
        currentPlayer.move++;
        currBox=document.getElementById('row'+row).childNodes[column];
        if (currentPlayer==player1) {
            currBox.innerHTML=crossSpan.outerHTML;
            playerOneMoveDetail.innerHTML="Moves: "+currentPlayer.move;
        }
        else {
            currBox.innerHTML=circleSpan.outerHTML;
            playerTwoMoveDetail.innerHTML="Moves: "+currentPlayer.move;

        }

        checkBoardStatus();  
        //toggling player
        currentPlayer==player1  ? currentPlayer=player2 : currentPlayer=player1;

        //toggling active class
        playerTwoDetail.classList.toggle('active-player');
        playerOneDetail.classList.toggle('active-player');
    }

    if (totalMoves==9) {
        console.log("game over!");
        alert("game over!")
    }
    else
    console.log(`Next Player`,currentPlayer.name);
}

function checkBoardStatus() {
    let currSymbol=currentPlayer.symbol;
    console.log("checking for",currSymbol);
    //check for row match
    for (let r=0;r<ROW_NUM;r++) {
        flag=1;
        for (let c=0;c<COL_NUM;c++) {
            if (gameMatrix[r][c]!=currSymbol) {
                flag=0;
                break;
            }
        }
        // console.log("row",r,"flag",flag)
        if (flag==1) {
            console.log("row-match found",r);
        }
    }

    //check for column match
    for (let c=0;c<COL_NUM;c++) {
        flag=1;
        for (let r=0;r<ROW_NUM;r++) {
            if (gameMatrix[r][c]!=currSymbol) {
                flag=0;
                break;
            }
        }
        // console.log("col",c,"flag",flag)
        if (flag==1) {
            console.log("col-match found",c);
        }
    }
    

    //check for right diagonal
    if (gameMatrix[0][0]==currSymbol && gameMatrix[1][1]==currSymbol && gameMatrix[2][2]==currSymbol) {
        console.log("right diagonal match!");
    }
//check for right diagonal
    if (gameMatrix[0][2]==currSymbol && gameMatrix[1][1]==currSymbol && gameMatrix[2][0]==currSymbol) {
        console.log("left diagonal match!");

    }
}

initializeLoginScreen()

