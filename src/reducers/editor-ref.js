const reducer = (state={o: undefined},action)=>{
    switch (action.type){
        case 'EDITOR_CREATE':
            return {o: action.value}
        case 'EDITOR_DELETE':
            return {o: undefined}
        default:
            return state
    }
}

const editorCreate = (editor)=>{
    // console.log("Create Editor")
    // console.log(editor)
    return ({
        type: "EDITOR_CREATE",
        value: editor
    })
}

const editorDelete = ()=>{
    return ({
        type: "EDITOR_DELETE"
    })
}

export {
    reducer as default,
    editorCreate,
    editorDelete
}