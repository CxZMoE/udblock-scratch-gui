
const reducer = (state={value: ""},action) =>{
    switch (action.type){
        case "UPDATE":
            //console.log("before: " + state.value)
            return {value: action.value}
        default: 
            return state
    }
}

const updatePyCode = function(value){
    console.log("update code")
    //console.log(value)
    return {
        type: "UPDATE",
        value: value
    }
}

export {
    reducer as default,
    updatePyCode,
}