
const reducer = (state={editorHide: false},action) =>{
    switch (action.type){
        case "TOGGLE_SHOW":
            return {editorHide: false}
        case "TOGGLE_HIDE":
            return {editorHide: true}
        default: 
            return state
    }
}

const editorToggleHide = function(){
    console.log("code hide")
    return {
        type: "TOGGLE_HIDE"
    }
}
const editorToggleShow = function(){
    console.log("code show")
    return {
        type: "TOGGLE_SHOW"
    }
}


export {
    reducer as default,
    editorToggleHide,
    editorToggleShow
}