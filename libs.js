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

})



 module.exports = { libs}

