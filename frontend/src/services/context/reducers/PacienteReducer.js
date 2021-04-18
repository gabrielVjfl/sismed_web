export const InitialState = {

    token: '',
    auth: false,
    loading: true,
    user: []
}

export const PacienteReducer = (state, action) => {
    console.log('Meu payload paciente', action.payload)


    switch(action.type) {
    
    case 'SETuser': 
       return {
       user: action.payload.user
       };
    
    case 'SETauth':
        return {
        ...state,
        auth: action.payload.auth
    };

    case 'SETtoken':
        return {
            ...state,
            token: action.payload.token
        };
    
    case 'SETloading':
        return {
            ...state,
            loading: action.payload.loading
        };
        default:
            return state
}
}