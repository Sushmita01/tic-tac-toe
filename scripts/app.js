const ROW_NUM=3;
const COL_NUM=3;

class Player {
    constructor(name) {
        this.name=name;
        this.move=0;
        this.symbol=null;
        this.winner=false;
    }   
}

var main=document.getElementsByTagName('main')[0];

function initializeLoginScreen() {
    let loginTemplate=document.getElementById('login-template');
    main.innerHTML=loginTemplate.innerHTML;
}

function initializeGameScreen() {
    let gameTemplate=document.getElementById('game-template');
    main.innerHTML=gameTemplate.innerHTML;
    var gameScreen=document.getElementById('game-screen');
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
}
initializeLoginScreen()
// initializeGameScreen();