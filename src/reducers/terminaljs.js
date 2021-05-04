const reducer = (state={o: undefined}, action)=>{    
    switch(action.type){
        case "TERMINAL_ASSIGN":
            console.log("assign")
            return {o: action.value}
        case "TERMINAL_REMOVE":
            return {o: undefined}
        default:
            return state
    }
}

function assignTerminal(terminal){
    return {
        type: "TERMINAL_ASSIGN",
        value: terminal
    }
}

function removeTerminal(){
    return {
        type: "TERMINAL_REMOVE",
    }
}


export{
    reducer as default,
    assignTerminal,
    removeTerminal
}