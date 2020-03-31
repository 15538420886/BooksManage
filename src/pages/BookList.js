import React from 'react';
import { message, Table, Button, Popconfirm, Input, Row, Col, Modal } from 'antd';
import classNames from 'classnames';
import { get, del } from '../utils/request';
const InputGroup = Input.Group;

class BookList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookList: [],
      value: '',
      focus: false,
      placeholder: '请输入图书ID / 书名',
      size: 'small'
    };
    this.addClick = this.addClick.bind(this)
  }

  componentWillMount () {
    this.getList()
  }

  getList() {
    get('http://localhost:3000/book')
    .then(res => {
      this.setState({
        bookList: res
      });
    });
  }

  addClick() {
    this.context.router.push('/book/add')
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleFocusBlur = (e) => {
    this.setState({
      focus: e.target === document.activeElement
    })
  }

  handleEdit (book) {
    this.context.router.push('/book/edit/' + book.id);
  }

  filterArr = (data, value) => {
    let arr = []
    if (data.length > 0) {
      data.map((item, index) => {
        if (item.id == value || item.name == value) {
          arr.push(item)
        }
      })
      
      return arr
    }
  }

  handleSearch = () => {
    const { value } = this.state

    get('http://localhost:3000/book')
    .then(res => {
      this.setState({
        bookList: this.filterArr(res, value)
      });
    });

    if(!value) {
      this.getList()
    }
  }


  handleDel (book) {
    del('http://localhost:3000/book/' + book.id)
      .then(res => {
        this.setState({
          bookList: this.state.bookList.filter(item => item.id !== book.id)
        });
        message.success('删除图书成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除图书失败');
      });
  }

  render () {
    const {bookList, placeholder, size} = this.state;
    const style = {
      width: '60%',
      marginBottom: '10px'
    }
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    const columns = [
      {
        title: '图书ID',
        dataIndex: 'id'
      },
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => <span>&yen;{record.price / 100}</span>
      },
      {
        title: '所有者ID',
        dataIndex: 'owner_id'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Button.Group type="ghost">
            <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
              <Button size="small">删除</Button>
            </Popconfirm>
          </Button.Group>
        )
      }
    ];

    return (
      <div>
        <div className="ant-search-input-wrapper" style={style}>
          <Row>
            <Col span={8}>
              <InputGroup className={searchCls}>
                <Input
                  placeholder={placeholder}
                  value={this.state.value}
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
              <Button type="primary" onClick={this.addClick}>添加图书</Button>
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={bookList}
          rowKey={row => row.id}
        />
      </div>
    );
  }
}

BookList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BookList;