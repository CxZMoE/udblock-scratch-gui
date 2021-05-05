
const reducer = (state={editorMode: "default"},action) =>{
    switch (action.type){
        case "TOGGLE_CODE":
            return {editorMode: "code"}
        case "TOGGLE_DEFAULT":
            return {editorMode: "default"}
        default: 
            return state
    }
}

const editorToggleCode = function(){
    return {
        type: "TOGGLE_CODE"
    }
}

const editorToggleDefault = function(){
    return {
        type: "TOGGLE_DEFAULT"
    }
}

export {
    reducer as default,
    editorToggleCode,
    editorToggleDefault
}