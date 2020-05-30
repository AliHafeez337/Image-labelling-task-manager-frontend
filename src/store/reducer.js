import initialState from './initialState'; 

const reducer = (state = initialState, action) => {
  if (action.type === 'SETTOKEN'){
    return {
      token: action.token
    }
  }
  return state;
}

export default reducer;