const initialState = {
  token: '' || localStorage.getItem('token'),
  task: null,
  search: '',
}

export default initialState;