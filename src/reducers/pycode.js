
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
    console.log("更新Python代码")
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