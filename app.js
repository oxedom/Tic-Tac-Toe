import { libs } from "./libs";


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

        const getAllProps = () => {
         
            return _propObj 
        }
        const getProp = (prop) => {
            return _propObj[prop]
        }
    
        const addMove = (move) => {
   
            if (typeof move == 'number' && 0 <= move && 9 > move)
            {
                _moves.push(move)
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

    const _currentPlayer = 0
    const _board = []
    const _players = []

    const tooglePlayer = () => {
        if (_currentPlayer === 0) { _currentPlayer = 1} 
        else { _currentPlayer = 0}
    }
    const addPlayer = (playerObj) => {
        
        if(_players.length < 1) {
            const player = Player(playerObj.playerName)
            _players.push(player)
            console.log(_players);
        }
        else {
            dom.hideForm()
            dom.showBoard()
        }

    const checkGame = (player) => {
        player.getProp('moves') 
    }    
    }

    const handleClick = (event) => {
        let cellValue = event.path[0].attributes[0].value;
        _players[_currentPlayer].addMove(cellValue)
    }

    return { addPlayer, handleClick}


})()


const dom = (() => {
    'use strict';
   
    //Private Vars
    const _form = document.getElementById("form")
    const _board = document.getElementById("board")
    const _cells = libs.cellGetter(_board)
    
    _cells.forEach(cell => cell.addEventListener('click', (e) => {
        game.handleClick(e)}))

    let renderScore = () => {    
     
    }

    const toogleForm = () => {
        if(_form.parentElement.style.display === "none") {
            _form.parentElement.style.display = "block"
        }
        else {
            _form.parentElement.style.display = "none"
        }
    }


    const toogleBoard = () => {
        if(_board.parentElement.style.display === "none") {
            _board.parentElement.style.display = "block"
        }
        else {
            _board.parentElement.style.display = "none"
        }
    }


    const hideForm = () => {_form.parentElement.style.display = "none"}
    const showForm = () => {_form.parentElement.style.display = "block"}   

    const hideBoard = () => {_board.style.display = "none"}
    const showBoard = () => {_board.style.display = "block"}


    _form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = libs.getFormData(e)
        game.addPlayer(data)
        _form.reset()

    })

    //init

    //Returning Moudles Methods and Props
    return {
        toogleForm,
        toogleBoard,
        hideForm,
        showForm,
        showBoard,
        hideBoard
    }

 
    
})();








