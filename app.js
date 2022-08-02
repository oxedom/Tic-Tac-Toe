const libs = (() => {

    const getFormData = (event) => {
        const formData = new FormData(event.target)
        const formProps = Object.fromEntries(formData)
        return formProps
    }

    return {
        getFormData
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

    const _board = []
    const _players = []

    const addPlayer = (playerObj) => {
        
        if(_players.length < 2) {
            const player = Player(playerObj.playerName)
            _players.push(player)
            console.log(_players);
        }
        else {
            dom.hideForm()
        }

    const checkGame = (player) => {
        player.getProp('moves') 
    }    
    }


    return { addPlayer}


})()


const dom = (() => {
    'use strict';

    //Private Vars
    const _form = document.getElementById("form")
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
    const hideForm = () => {_form.parentElement.style.display = "none"}
    const showForm = () => {_form.parentElement.style.display = "block"}   



    _form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = libs.getFormData(e)
        game.addPlayer(data)
        _form.reset()

    })


    //Returning Moudles Methods and Props
    return {
        toogleForm,
        hideForm,
        showForm
    }

 
    

})();








