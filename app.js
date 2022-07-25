 const Player = function (name, icon, avatar) {
        'use strict';
    
        let _score = 0;
        let _moves = [];
        let _name = name;
    
        let _propObj = {
            icon,
            avatar,
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

const jeff = Player('jeff', '1337', '666')



const dom = (() => {
        'use strict';

        //Private Vars
        const _form = document.getElementById("form")


        
       
        let _privateProp = "Big Dog"
        let _privateProp2 = "Big Cat"
        // console.log('1')
        //Public Vars
        let publicProp = _privateProp
        let publicProp2 = _privateProp2
        
    
    
        //Private Methods
        let _privateFunction = () => {
            console.log([1, 2, 3, 4])
            return ['one,two'];
        }
    
        //Public Methods
        let publicFunction = () => {
            return _privateFunction()
        }
        
        let renderScore = () => {    
         
           

        }
    
        //TEST
        _form.addEventListener("submit", (e) => {
            e.preventDefault()
            console.log(e.target);
            const formData = new FormData(e.target)
            const formProps = Object.fromEntries(formData)
            console.log(formProps)
    })
        //Returning Moudles Methods and Props
        return {
            publicProp,
            publicProp2,
            publicFunction,
            renderScore
        }

     
        
    
    })();
    
    

dom.renderScore()
dom.renderScore()
dom.renderScore()











