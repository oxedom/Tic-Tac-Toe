const Player = function (name, symbol, icon) {
    'use strict';

    let score = 0;
    let ass = 'OrignalAss'

    const playerMethods = {
        logAss() {
            console.log(ass)
        },
        plus() {
            score++

            console.log(score);
        },
        context() {
            console.log(this)
        }
    }

    return {
        name,
        Symbol,
        score,
        icon,
        playerMethods,
    };
};

const jeff = Player('Jeff', 1, 2);


jeff.playerMethods.plus()
console.log(jeff.score);
jeff.playerMethods.plus()
jeff.playerMethods.plus()
jeff.playerMethods.plus()
console.log(jeff.score);
jeff.score = 100
console.log(jeff.score);



const dom = (() => {
    'use strict';

    //Private Vars
    const form = document.getElementById("form")

    //Public Vars
    let _privateProp = "Big Dog"
    let publicProp = _privateProp

    let _privateProp2 = "Big Cat"
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
    //Returning Moudles Methods and Props
    return {
        publicProp,
        publicProp2,
        publicFunction,
        ass: "dog"
    }

})();

// console.log(dom.publicFunction());


// console.log(form);
// //TEST
// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     console.log(e.target);
//     const formData = new FormData(e.target)
//     const formProps = Object.fromEntries(formData)
//     console.log(formProps);




// })