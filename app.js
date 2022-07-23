const Player = function (name, symbol, icon) {

    let score = 0
    let ass = 'OrignalAss'

    let logAss = () => {
        console.log(ass)
    };

    let plus = (score) => {
        score++
    }

    return {
        name,
        Symbol,
        icon,
        score,
        plus: plus.bind(this),
        logAss

    };
};

const jeff = Player('Jeff', 1, 2);

jeff.ass = "Biggest Ass in the UK"
console.log(jeff)
jeff.ass = 5
jeff.logAss()
jeff.plus()
console.log(jeff.score);
jeff.plus()
jeff.plus()
jeff.plus()
console.log(jeff.score);
jeff.score = 100
console.log(jeff)

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