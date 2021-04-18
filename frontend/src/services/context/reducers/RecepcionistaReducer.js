export const InitialState = {
    dados: [],
    token: '',
    loading: true,
    auth:  sessionStorage.getItem('tokenRecep')
}

export const RecepcionistaReducer = (state,action) => {
     console.log('Meu payload da context', action.payload)

     switch(action.type) {

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
              loading: false,
            };
        case 'SETdata':
            return {
            ...state,
            dados: action.payload.dados
            }
            
            default:
                return state
        }
     }


