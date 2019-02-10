import {takeEvery, put} from 'redux-saga/effects'
import {GET_INIT_LIST} from './actionTypes'
import {initListAction} from "./actionCreators"
import axios from 'axios'

// 再创建一个 init_list_action action，通过put传给reducer
function* getInitList() {
  try {
    const {data: {data}} = yield axios.get('http://localhost:1201/test');
    const action = initListAction(data);
    yield put(action); // 派发给reducer
  } catch (e) {
    console.log(e);
  }
}

function* todoSaga() {
  // 捕获到 GET_INIT_LIST 类型，则会执行 getInitList
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default todoSaga;