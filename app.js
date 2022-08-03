const libs = (() => {

    const getFormData = (event) => {
        const formData = new FormData(event.target)
        const formProps = Object.fromEntries(formData)
        return formProps
    }


    const cellGetter = (boardElement) => {
        const nodes = []
        boardElement.childNodes.forEach(node => { if(node.className == "cell") { nodes.push(node)}})

        return nodes
    }


    return {
        getFormData,
        cellGetter
    }

})()


const Player = function (name) {
        'use strict';
        let _score = 0;
        let _moves = [];
        let _name = name;

        let _propObj = {
            score: _score,
            moves: _moves,
            name: _name,
        }
    
        const addScore = () => {  _propObj.score++ }

        const getAllProps = () => {  return _propObj }

        const getProp = (prop) => {  return _propObj[prop]}

        const clearMoves = () => { 
            _moves = []
            _propObj.moves = []
        }
    
        const addMove = (move) => {
            if (0 <= move && 9 > move)
            {
                _moves.push(move)
                console.log(`added ${move} to ${_name}, current moves are ${_propObj.moves}`);
            }
            else { return new Error(`Error pushing to array: argument passed was ${move}`)}
        
        }
        return {
            addScore,
            getAllProps,
            getProp,
            addMove,
            clearMoves
        };
    };

    
const game = ( () => {

  
    const _players = []
    let _currentPlayer = undefined;

    const tooglePlayer = () => {
    
        if (_currentPlayer === _players[0]) { _currentPlayer = _players[1]} 
        else { _currentPlayer = _players[0]}
    }
    const addPlayer = (playerObj) => {
        
        if(_players.length < 2) {
            const player = Player(playerObj.playerName)
            _players.push(player)
            if(_players.length === 2) { 
                _currentPlayer = _players[0]
            dom.hideEl('formContainer')
            dom.showEl('board')
            }
        }
    }

    function CheckGame(player){
        const winning = [[1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]]
    
        let moves = player.getProp('moves').sort()
        //returns true boolean
        let answer = winning.some(win => win.every(p => moves.includes(p)))
        console.log(`the answer is ${answer}`);
        return answer
    }    
    const _getWaitingPlayer = () => {
        return _players.filter(p => p != _currentPlayer)[0]
    }
    const ___getCurrentPlayer = () => {
        return _currentPlayer
    }

    const handleCellClick = (event) => {
    
        //Gets Cell Value from HTML Attribute
        let cellValue = parseInt(event.path[0].attributes[0].value);
     //Checks if innertext is empty to place a cell 
        if(event.path[0].innerText.length < 1) {
            //Adds Cell Value to player moves array using addMove
            ___getCurrentPlayer().addMove(cellValue)
            //Sets Cell inner text to players name 
            event.path[0].innerText = ___getCurrentPlayer().getProp('name')
            //If boolean check if curent player has won
            if(CheckGame(___getCurrentPlayer())) { 
            //If Player wins add score to his score
            ___getCurrentPlayer().addScore()
            //Hide game board 
            dom.hideEl('board')
            //Insert text
            dom.changeText('winnerName', ___getCurrentPlayer().getProp('name'))
            dom.changeText('loserName', _getWaitingPlayer().getProp('name'))
            //Show Winner Card Element
            dom.showEl('winnerCard')
    }
            else { tooglePlayer()}
          
        }
        


   
    }


    function handleRematchClick () {
        console.log('handleRematchClick has fired');
        //IT'S SUPPOSED TO CLEAR PLAYER MOVES not always working proprley hmmm
        __getCurrentPlayer().clearMoves()
        _getWaitingPlayer().clearMoves()
        //SETS current Player to first Player 1 (first one who wrote his username)
        _currentPlayer = _players[0]
        //Resets all cells
        libs.cellGetter(document.getElementById("board")).forEach(cell => cell.innerText = "")
        //Hides winnerCard element
        dom.hideEl('winnerCard')
        //Shows Board element
        dom.showEl('board')
        }


    return { addPlayer, handleCellClick, handleRematchClick}

})()



const dom = (() => {
    'use strict';
   
    //Private Vars
    const _rematchBtn = document.getElementById('rematch-btn')
    const _form = document.getElementById("form")
    const _board = document.getElementById("board")
    const _cells = libs.cellGetter(_board)
    
    //ADDS EVENT Listenr to each cell
    _cells.forEach(cell => cell.addEventListener('click', (e) => {   game.handleCellClick(e)}))

    //Binding handleRematchClick
    _rematchBtn.addEventListener('click', () => { 
        e.preventDefault()
        game.handleRematchClick()
    })



    //Gets new user Data from Form sends it to Game OBJ to addPlayer and Resets Form
    _form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = libs.getFormData(e)
        game.addPlayer(data)
        _form.reset()
    })



    const showEl = (el) => { 
      
        // document.getElementById(el).classList.add('noOpacity')
    
        setTimeout( function() {
        document.getElementById(el).classList.remove('hideClass') 
        document.getElementById(el).classList.add('fadeIn') 

    },500 )

    }

        const hideEl = (el) => { 
        setTimeout( function() { document.getElementById(el).classList.add('hideClass') },500 )  
         document.getElementById(el).classList.add('fadeOut') }

        const changeText = (id,text) => { document.getElementById(id).innerText = text }
    //init

    //Returning Moudles Methods and Props
    return {
        showEl,
        hideEl,
        changeText
    }

 
    
})();








