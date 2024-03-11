const initialState =
{
    path: "",
    content: {},
    user: {},
    users: [],
    downloadFile: Blob,
};


function rootReducer(state = initialState, {type, payload})
{
    switch(type)
    {
        case "REGISTER":
            return {...state};
        
        case "LOGIN":
            return {...state, user: payload.content};
        
        case "GET_USERS":
            return {...state, users: payload};
        
        case "GET_DIR":
            return {...state, path: payload.path, content: payload.content};
        
        case "POST_DIR":
            return {...state, path: payload.path, content: payload.content};
        
        case "PUT_DIR":
            return {...state, path: payload.path, content: payload.content};
        
        case "DELETE_DIR":
            return {...state, path: payload.path, content: payload.content};
        
        case "GET_FILE":
            return {...state, downloadFile: payload};
        
        case "POST_FILE":
            return {...state};
        
        case "PUT_FILE":
            return {...state, path: payload.path, content: payload.content};
        
        case "DELETE_FILE":
            return {...state, path: payload.path, content: payload.content};
        
        default:
            return {...state};
    };
};


export default rootReducer;