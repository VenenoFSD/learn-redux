import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from "./actionTypes";

const defaultState = {
  input: '',
  list: []
};

export default (state = defaultState, action) => {
  console.log(state, action);
  if (action.type === CHANGE_INPUT_VALUE) {
    // reducer不能修改state，所以要拷贝state
    let newState = JSON.parse(JSON.stringify(state));
    newState.input = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(state.input);
    newState.input = '';
    return newState;
  }
  if (action.type === DELETE_TODO_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  return state;
}