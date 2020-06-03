import initialState from './initialState'; 

const reducer = (state = initialState, action) => {
  if (action.type === 'SETTOKEN'){
    return {
      token: action.token
    }
  }
  else if (action.type === 'SETTASK'){
    return {
      task: action.task
    }
  }
  return state;
}

export default reducer;