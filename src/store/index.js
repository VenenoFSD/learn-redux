import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import todoSaga from './sagas'

// 创建redux-saga中间件
const sagaMiddleware = createSagaMiddleware();

// 同时启用redux-thunk/redux-saga和redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// const enhancer = composeEnhancers(applyMiddleware(thunk));
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancer);

// 运行saga
sagaMiddleware.run(todoSaga);

export default store