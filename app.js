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
            _propObj.moves = []
        }
    
        const addMove = (move) => {
            if (0 <= move && 9 > move)
            {
                _moves.push(move)
                console.log(`added ${move} to ${_name}, current moves are ${_moves}`);
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
    const getWaitingPlayer = () => {
        return _players.filter(p => p != _currentPlayer)[0]
    }
    const getCurrentPlayer = () => {
        return _currentPlayer
    }

    const handleCellClick = (event) => {
        event.stopPropagation()
        //Gets Cell Value from HTML Attribute
        let cellValue = parseInt(event.path[0].attributes[0].value);
        console.log(cellValue);
        //Checks if innertext is empty to place a cell 
        if(event.path[0].innerText.length < 1) {
            getCurrentPlayer().addMove(cellValue)
            event.path[0].innerText = getCurrentPlayer().getProp('name')
            if(CheckGame(getCurrentPlayer())) { 
            getCurrentPlayer().addScore()
            dom.hideEl('board')
            dom.changeText('winnerName', getCurrentPlayer().getProp('name'))
            dom.changeText('loserName', getWaitingPlayer().getProp('name'))
            dom.showEl('winnerCard')
    }
            tooglePlayer()
        }
        


   
    }

    const handleRematchClick = () => {
    getCurrentPlayer()
    getWaitingPlayer()
    _currentPlayer = _players[0]
    libs.cellGetter(document.getElementById("board")).forEach(cell => cell.innerText = "")
    // dom.hideEl('winnerCard')
    // dom.showEl('board')
    }
    return { addPlayer, handleCellClick, getCurrentPlayer, getWaitingPlayer, handleRematchClick}

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
    _rematchBtn.addEventListener('click', game.handleRematchClick())



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








