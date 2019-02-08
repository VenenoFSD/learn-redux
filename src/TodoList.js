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
