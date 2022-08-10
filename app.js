const libs = (() => {

    const getFormData = (event) => {
        const formData = new FormData(event.target)
        const formProps = Object.fromEntries(formData)
        return formProps
    }


    const cellGetter = (boardElement) => {
        const nodes = []
        boardElement.childNodes.forEach(node => { if (node.className == "cell") { nodes.push(node) } })

        return nodes
    }


    return {
        getFormData,
        cellGetter
    }

})()

//Factory function
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

    const addScore = () => { _propObj.score++ }

    const getAllProps = () => { return _propObj }

    const getProp = (prop) => { return _propObj[prop] }

    const clearMoves = () => {
        for (let index = 0; index < 6; index++) {
            _moves.pop()
        }
    }

    const addMove = (move) => {
        if (0 <= move && 10 > move) {
            // console.log('Add Player Move has fired');
            _moves.push(move)
            // console.log(`added ${move} to ${_name}, current moves are ${_propObj.moves}`);
        }
        else { return new Error(`Error pushing to array: argument passed was ${move}`) }

    }
    return {
        addScore,
        getAllProps,
        getProp,
        addMove,
        clearMoves
    };
};


const game = (() => {

    const _players = []
    let _currentPlayer = undefined;

    const tooglePlayer = () => {

        if (_currentPlayer === _players[0]) { _currentPlayer = _players[1] }
        else { _currentPlayer = _players[0] }
    }
    const _addPlayer = (playerObj) => {

        if (_players.length < 1) {

            dom.setPlayerCard(1, playerObj)
        }
        else {
            dom.setPlayerCard(2, playerObj)
        }

        if (_players.length < 2) {
            const player = Player(playerObj.playerName)
            _players.push(player)
            if (_players.length === 2) {
                _currentPlayer = _players[0]
                dom.slowHide('formContainer')
                dom.slowShow('board')
                dom.slowShow('playerCards')
            }
        }
    }

    function CheckGame(player) {
        //Winning situations by XY of board
        const winning = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]]

        if (_checkTie()) {

            setTimeout(function () {
                dom.slowShow('announcement')
                dom.changeText('announcement', 'The Game is a tie!')
                return
            }, 1000)
            setTimeout(function () {
                dom.slowHide('announcement')
                handleRematchClick()
            }, 2000)
        }
        let moves = player.getProp('moves').sort()
        //returns true boolean
        let answer = winning.some(win => win.every(p => moves.includes(p)))
        // console.log(`the answer is ${answer}`);
        return answer
    }
    const _getWaitingPlayer = () => {
        return _players.filter(p => p != _currentPlayer)[0]
    }
    const _getCurrentPlayer = () => {
        return _currentPlayer
    }

    const handleNewPlayer = (e) => {
        const data = libs.getFormData(e)
        _addPlayer(data)
    }
    const handleCellClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        //Gets Cell Value from HTML Attribute


        let cellValue = parseInt(event.composedPath()[0].attributes[0].value);
        //Checks if innertext is empty to place a cell 
        if (event.composedPath()[0].innerText.length < 1) {

            //Adds Cell Value to player moves array using addMove
            // console.log(cellValue);

            _getCurrentPlayer().addMove(cellValue)
            //Sets Cell inner text to players name 
            event.composedPath()[0].innerText = _getCurrentPlayer().getProp('name')
            //If boolean check if curent player has won
            if (CheckGame(_getCurrentPlayer())) {
                //If Player wins add score to his score
                _getCurrentPlayer().addScore()


                //Hide game board 
                dom.slowHide('board')
                //Insert text
                dom.changeText('winnerName', _getCurrentPlayer().getProp('name'))
                dom.changeText('loserName', _getWaitingPlayer().getProp('name'))

                if (_getCurrentPlayer() == _players[0]) {
                    dom.changeText('scoreOne', _getCurrentPlayer().getProp('score'))
                }
                else if (_getCurrentPlayer() == _players[1]) {
                    dom.changeText('scoreTwo', _getCurrentPlayer().getProp('score'))
                }

                //Show Winner Card Element
                dom.slowShow('winnerCard')
            }


            else { tooglePlayer() }
        }
    }

    function handleNewGame(event) {
        event.preventDefault()
        // console.log('handleNewGame has fired');
        for (let index = 0; index < 2; index++) { _players.pop() }
        dom.slowHide('board')
        dom.slowHide('winnerCard')
        dom.slowHide('playerCards')
        dom.slowShow('formContainer')
    }


    function handleRematchClick() {
        // console.log('handleRematchClick has fired');
        //IT'S SUPPOSED TO CLEAR PLAYER MOVES not always working proprley hmmm

        //SETS current Player to first Player 1 (first one who wrote his username)
        _currentPlayer = _players[0]
        //Resets all cells
        libs.cellGetter(document.getElementById("board")).forEach(cell => cell.textContent = "")
        //Hides winnerCard element
        dom.slowHide('winnerCard')
        //Shows Board element
        dom.slowShow('board')
        _getCurrentPlayer().clearMoves()
        _getWaitingPlayer().clearMoves()
    }

    function _checkTie() {
        let totalMoves = _getCurrentPlayer().getProp('moves').length + _getWaitingPlayer().getProp('moves').length
        if (totalMoves == 9) { return true }
        else { return false }
    }

    return { handleCellClick, handleRematchClick, handleNewGame, handleNewPlayer }

})()



const dom = (() => {
    'use strict';

    //Private Vars
    const _rematchBtn = document.getElementById('rematch-btn')
    const _form = document.getElementById("form")
    const _board = document.getElementById("board")
    const _cells = libs.cellGetter(_board)
    const _playerCardOne = document.getElementById('playerCardOne')
    const _playerCardTwo = document.getElementById('playerCardTwo')
    const newGame = document.getElementById('newGame')


    newGame.addEventListener('click', (e) => { game.handleNewGame(e) })


    //ADDS EVENT Listenr to each cell
    _cells.forEach(cell => cell.addEventListener('click', (e) => { game.handleCellClick(e) }))
    // console.log(_cells);
    //Binding handleRematchClick
    _rematchBtn.addEventListener('click', (e) => {
        e.preventDefault()
        game.handleRematchClick()
    })



    //Gets new user Data from Form sends it to Game OBJ to handleNewPlayer and Resets Form
    _form.addEventListener("submit", (e) => {
        e.preventDefault()
        game.handleNewPlayer(e)
        _form.reset()
    })


    const setPlayerCard = (playerNumber, playerOb) => {
        //Added all the player props to the card

        if (playerNumber == 1) {
            _playerCardOne.childNodes[1].childNodes[1].innerText = playerOb.playerName
            _playerCardOne.childNodes[3].childNodes[1].innerText = 0
        }
        if (playerNumber == 2) {
            _playerCardTwo.childNodes[1].childNodes[1].innerText = playerOb.playerName
            _playerCardTwo.childNodes[3].childNodes[1].innerText = 0
        }

    }


    const slowShow = (el) => {
        setTimeout(function () {
            document.getElementById(el).classList.remove('hideClass')
            document.getElementById(el).classList.add('fadeIn')
        }, 500)
    }

    const slowHide = (el) => {
        setTimeout(function () { document.getElementById(el).classList.add('hideClass') }, 500)
        document.getElementById(el).classList.add('fadeOut')
    }

    const changeText = (id, text) => { document.getElementById(id).innerText = text }


    //init

    //Returning Moudles Methods and Props
    return {
        slowShow,
        slowHide,
        changeText,
        setPlayerCard
    }



})();








