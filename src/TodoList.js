import React, { Component } from 'react'
import TodoListUI from './TodoListUI'
import store from './store'
import * as actionCreators from './store/actionCreators'

class TodoList extends Component {

  constructor (props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    return <TodoListUI
      input={this.state.input}
      list={this.state.list}
      handleInputChange={this.handleInputChange}
      handleBtnClick={this.handleBtnClick}
      handleItemDelete={this.handleItemDelete}
    />
  }

  componentDidMount () {
    // redux-thunk
    // const action = actionCreators.getTodoList();
    // // action为一个函数则store.dispatch为执行该函数（该函数接收dispatch为参数）
    // store.dispatch(action);

    // redux-saga
    // 先dispatch'get_init_list'，在reducer不处理，由sagas来捕获，之后由sagas put'init_list_action'再给reducer处理
    const action = actionCreators.getInitListAction();
    store.dispatch(action);
  }

  handleInputChange (e) {
    const action = actionCreators.getInputChangeAction(e.target.value);
    store.dispatch(action);
  }

  handleStoreChange () {
    this.setState(store.getState());
  }

  handleBtnClick () {
    const action = actionCreators.getAddItemAction();
    store.dispatch(action);
  }

  handleItemDelete (index) {
    const action = actionCreators.getDeleteItemAction(index);
    store.dispatch(action);
  }

}

export default TodoList;

// redux note
// 1. reducer.js：创建reducer(state, action)
// 2. index.js：创建store：createStore(reducer)
// 3. constructor获取state：store.getState()
// 4. 创建action：action = {type: '...', value: ...}
// 5. 将action传给store：store.dispatch(action)，之后store会自动将prevState，state传给reducer
// 6. reducer将处理后的newState返回给store
// 7. store接收来自reducer的newState并替换掉原来的state
// 8. store.subscribe(fn)：store发生变化时就会自动调用fn，在fn中更新组件state

// 9. 优化：
// 9.1 将action.type统一放在一个文件中管理
// 9.2 actionCreators管理所有action

// 10. 注意点
// 10.1 store是唯一的
// 10.2 不是reducer更新了store，而是store拿到reducer返回的newState自我更新
// 10.3 reducer必须是纯函数

// 11. redux-thunk中间件
// 11.1 作用：可以在action中异步请求数据并dispatch
// 11.2 启用：参考官方文档
// 11.3 actionCreators既可以返回一个action对象，返回到组件中dispatch；在redux-thunk作用下也可以返回一个函数，且参数为dispatch，直接在函数中dispatch。
// 11.4 如果组件中dispatch的是一个函数，会调用该函数

// 12. 中间件：中间件就是对action和store之间的dispatch进行封装和升级。例如redux-thunk，原生的dispatch并不支持将函数作为参数，而redux-thunk实现了这一点

// 13. redux-saga中间件
// 13.1 特点：单独一个文件操作管理所有异步操作（/store/sagas.js）
// 13.2 index.js：创建中间件，引入sagas并运行
// 13.3 sagas.js：捕获指定action类型并执行相应函数（异步操作就放在这里）
// 13.4 TodoList.js：同样在此处dispatch一个初始action，dispatch但reducer不做处理，由sagas捕获并创建另一个用于异步操作的action并put给reducer处理
