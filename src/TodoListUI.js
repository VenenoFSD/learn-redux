import React, {Component} from 'react'
import { Input, Button, List } from 'antd'
import 'antd/dist/antd.css'

class TodoListUI extends Component {
  render () {
    const {input, list, handleInputChange, handleBtnClick, handleItemDelete} = this.props;
    return (
      <div style={{margin: '30px 0 0 30px'}}>
        <Input
          placeholder="something to do"
          value={input}
          style={{width: '300px', margin: '0 10px 20px 0'}}
          onChange={handleInputChange}
        />
        <Button type="primary" onClick={handleBtnClick}>添加</Button>
        <List
          bordered
          dataSource={list}
          renderItem={item => (<List.Item onClick={index => { handleItemDelete(index) }}>{item}</List.Item>)}
          style={{width: '374px'}}
        />
      </div>
    );
  }
}

export default TodoListUI;

// note
// 1. 优化：将单组件拆分成UI(傻瓜)组件和容器(聪明)组件（负责逻辑）
