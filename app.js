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
            _propObj,
            addScore,
            getAllProps,
            getProp,
            addMove
        };
    };

const jeff = Player('jeff', '1337', '666')



const dom = (() => {
        'use strict';

        const _players = []
        //Private Vars
        const _form = document.getElementById("form")
        let renderScore = () => {    
         
        }

        _form.addEventListener("submit", (e) => {
            e.preventDefault()
            if(_players.length < 2) {
                const data = libs.getFormData(e)
                const newPlayer = Player(data.playerName)
                _players.push(newPlayer)
            }
            else {
                //Hides start card after two players have been added 
                _form.parentElement.classList.add("hideClass")
            }



        })
    

        //Returning Moudles Methods and Props
        return {
        }

     
        
    
    })();
    
    











