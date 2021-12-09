
const reducer = (state={showPrompt: false},action) =>{
    switch (action.type){
        case "SHOW":
            //console.log("before: " + state.value)
            return {showPrompt: true}
        case "HIDE":
            //console.log("before: " + state.value)
            return {showPrompt: false}
        default: 
            return state
    }
}

const makeShowPrompt = function(value){
    console.log("显示弹窗")
    //console.log(value)
    return {
        type: "SHOW",
        value: true
    }
}
const makeHidePrompt = function(value){
    console.log("隐藏弹窗")
    //console.log(value)
    return {
        type: "HIDE",
        value: false
    }
}

export {
    reducer as default,
    makeShowPrompt,
    makeHidePrompt
}