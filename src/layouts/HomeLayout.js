import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Row, Col } from 'antd';
import style from '../styles/home-layout.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class HomeLayout extends React.Component {
  loginOut =()=> {
    localStorage.clear()
    this.context.router.push('/login');
  }
  render () {
    const {children} = this.props;
    return (
      <div>
        <header className={style.header}>
        <Row>
          <Col span={8}><Link to="/">军军图书管理中心</Link></Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Link to="/login"><div style={{textAlign: 'right', fontSize: 12, cursor: 'pointer'}}>退出登录</div></Link>
          </Col>
        </Row>
        </header>

        <main className={style.main}>
          <div className={style.menu}>
            <Menu mode="inline" theme="dark" style={{width: '240px'}}>
              <SubMenu key="user" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                <MenuItem key="user-list">
                  <Link to="/user/list">用户列表</Link>
                </MenuItem>
              </SubMenu>

              <SubMenu key="book" title={<span><Icon type="book"/><span>图书管理</span></span>}>
                <MenuItem key="book-list">
                  <Link to="/book/list">图书列表</Link>
                </MenuItem>
              </SubMenu>
            </Menu>
          </div>

          <div className={style.content}>
            {children}
          </div>
        </main>
      </div>
    );
  }
}

export default HomeLayout;
