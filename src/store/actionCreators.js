import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = value => ({
  type: actionTypes.CHANGE_INPUT_VALUE,
  value
});

export const getAddItemAction = () => ({
  type: actionTypes.ADD_TODO_ITEM,
});

export const getDeleteItemAction = index => ({
  type: actionTypes.DELETE_TODO_ITEM,
  index
});

// action中进行axios请求，action除了返回一个对象，也可以返回函数，且该函数接收dispatch作为参数
export const getTodoList = () => {
  return dispatch => {
    axios.get('http://localhost:1201/test').then(({data: {data}}) => {
      const action = getInitListAction(data);
      dispatch(action);
    });
  }
};

const getInitListAction = data => ({
  type: actionTypes.INIT_LIST_ACTION,
  data
});