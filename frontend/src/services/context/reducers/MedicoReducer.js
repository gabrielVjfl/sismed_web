export const InitialState = {
    
    token: '',
    auth:  sessionStorage.getItem('medicoToken'),
    loading: true,
    dados: []
    
} // Setando os dados do medico por enquanto!

export const UserReducer = (state, action) => {
    console.log('Meu payload', action.payload)

    switch (action.type) {

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
        }
    case 'SETdados':
        return {
            ...state,
            dados: action.payload.dados
        }
        default:
            return state
     
    }
}