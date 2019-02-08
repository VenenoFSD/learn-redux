import React, { Component } from 'react';
import { Input, Button, List } from 'antd';
import store from './store'
import 'antd/dist/antd.css';

class TodoList extends Component {

  constructor (props) {
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    return (
      <div style={{margin: '30px 0 0 30px'}}>
        <Input
          placeholder="something to do"
          value={this.state.input}
          style={{width: '300px', margin: '0 10px 20px 0'}}
          onChange={this.handleInputChange}
        />
        <Button type="primary" onClick={this.handleBtnClick}>添加</Button>
        <List
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
          style={{width: '374px'}}
        />
      </div>
    );
  }

  handleInputChange (e) {
    const action = {
      type: 'change_input_value',
      value: e.target.value
    };
    store.dispatch(action);
  }

  handleStoreChange () {
    this.setState(store.getState());
  }

  handleBtnClick () {
    const action = {
      type: 'add_todo_item'
    };
    store.dispatch(action);
  }

  handleItemDelete (index) {
    const action = {
      type: 'delete_todo_item',
      index
    };
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
