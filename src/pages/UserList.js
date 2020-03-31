import React from 'react';
import { message, Table, Button, Popconfirm, Input, Row, Col} from 'antd';
import { get, del } from '../utils/request';
import classNames from 'classnames';
const InputGroup = Input.Group;

class UserList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userList: [],
      value: "",
      focus: false
    };
    this.addClick = this.addClick.bind(this)
  }

  componentWillMount () {
    this.getList()
  }

  handleEdit (user) {
    this.context.router.push('/user/edit/' + user.id);
  }

  getList() {
    get('http://localhost:3000/user')
    .then(res => {
      this.setState({
        userList: res
      });
    });
  }

  handleDel (user) {
    del('http://localhost:3000/user/' + user.id)
      .then(res => {
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id)
        });
        message.success('删除用户成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除用户失败');
      });
  }

  addClick() {
    this.context.router.push('/user/add')
  }

  handleInputChange =(e)=>{
    this.setState({
      value: e.target.value
    })
  }

  handleFocusBlur = (e) => {
    this.setState({
      focus: e.target === document.activeElement
    })
  }

  filterArr = (data, value) => {
    let arr = []
    if (data.length > 0) {
      data.map((item, index) => {
        if (item.phone == value || item.name == value) {
          arr.push(item)
        }
      })
      
      return arr
    }
  }

  handleSearch = () => {
    const { value } = this.state

    get('http://localhost:3000/user')
    .then(res => {
      this.setState({
        userList: this.filterArr(res, value)
      });
    });

    if(!value) {
      this.getList()
    }
  }

  render () {
    const {userList, value} = this.state;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const style = {
      width: '60%',
      marginBottom: '10px'
    }

    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '学院',
        dataIndex: 'college'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
              <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                <Button size="small">删除</Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];

    return (
      <div>
        <div className="ant-search-input-wrapper" style={style}>
          <Row>
            <Col span={8}>
              <InputGroup className={searchCls}>
                <Input
                  placeholder='请输入用户名 / 手机号'
                  value={value}
                  onChange={this.handleInputChange}
                  onFocus={this.handleFocusBlur}
                  onBlur={this.handleFocusBlur}
                  onPressEnter={this.handleSearch}
                />
                <div className="ant-input-group-wrap">
                  <Button
                    className={btnCls}
                    icon="search"
                    size='small'
                    onClick={this.handleSearch} />
                </div>
              </InputGroup>
            </Col>
            <Col span={2} style={{marginLeft: '12px'}}>
              <Button type="primary" onClick={this.addClick}>添加用户</Button>
            </Col>
          </Row>
        </div>
        <Table columns={columns} dataSource={userList} rowKey={row => row.id}/>
      </div>
    );
  }
}

UserList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserList;
