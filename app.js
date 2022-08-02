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
    
        const addScore = () => {  _score++ }

        const getAllProps = () => {  return _propObj }

        const getProp = (prop) => {  return _propObj[prop]}
    
        const addMove = (move) => {
            if (typeof move == 'number' && 0 <= move && 9 > move)
            {
                _moves.push(move)
                console.log(_moves);
            }
            else { return new Error(`Error pushing to array: argument passed was ${move}`)}
        
        }
        return {
            addScore,
            getAllProps,
            getProp,
            addMove
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

        

    const checkGame = (player) => {
        player.getProp('moves') 
    }    
    }
    const getCurrentPlayer = () => {
        return _currentPlayer
    }

    const handleClick = (event) => {
        let cellValue = event.path[0].attributes[0].value;
        console.log(_currentPlayer);
        _currentPlayer.addMove(cellValue)
    


        tooglePlayer()

    }

    return { addPlayer, handleClick, getCurrentPlayer}


})()


const board = (() => {

    
})


const dom = (() => {
    'use strict';
   
    //Private Vars
    const _form = document.getElementById("form")
    const _board = document.getElementById("board")
    const _cells = libs.cellGetter(_board)
    
    _cells.forEach(cell => cell.addEventListener('click', (e) => {   game.handleClick(e)}))

    //Gets new user Data from Form sends it to Game OBJ to addPlayer and Resets Form
    _form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = libs.getFormData(e)
        game.addPlayer(data)
        _form.reset()
    })

    const showEl = (el) => { document.getElementById(el).classList.remove('hideClass')}
    const hideEl = (el) => { document.getElementById(el).classList.add('hideClass')}
    //init

    //Returning Moudles Methods and Props
    return {
        showEl,
        hideEl
    }

 
    
})();








