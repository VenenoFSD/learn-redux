const defaultState = {
  input: '',
  list: []
};

export default (state = defaultState, action) => {
  console.log(state, action);
  if (action.type === 'change_input_value') {
    // reducer不能修改state，所以要拷贝state
    let newState = JSON.parse(JSON.stringify(state));
    newState.input = action.value;
    return newState;
  }
  if (action.type === 'add_todo_item') {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(state.input);
    newState.input = '';
    return newState;
  }
  return state;
}