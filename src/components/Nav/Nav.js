import React from 'react';
import { Menu, Icon, Badge, Popover } from 'antd';
import styles from './Nav.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { connect } from 'dva';


let Nav = ({ currentKey, dispatch, history, isLoggedIn, userId }) => {

  return (
    <Menu
      mode="horizontal"
      selectedKeys={currentKey}
      onClick={({ key }) => {
        dispatch({
          type: 'ui/changeKey',
          payload: key,
        });
      }}
      className={styles['navbar-top']}
    >
      <div className={styles['navbar-icons']}>
        <Icon type="bars"/>
      </div>
      <Menu.Item key="main" className={styles['nav-button']}>
        <Link to='/'><Icon type="home"/>Home</Link>
      </Menu.Item>
      <Menu.Item key="books" className={styles['nav-button']}>
        <Link to='/books'><Icon type="book"/>Books</Link>
      </Menu.Item>
      <div className={styles['filler-left']}> </div>
      <SearchBar history={history}/>
      <div className={styles.filler}> </div>
      <ShoppingCart/>
      <div>
        {isLoggedIn ?
          <Popover
            trigger="hover"
            placement="bottomLeft"
            content={
              <a
                onClick={() => dispatch({ type: 'user/logOut' })}
              >
                Logout
              </a>
            }
          >
            <Link to={"/users/" + userId}>
              <Badge count={0} showZero={true} overflowCount={5} title={'Notifications'}
                     style={{ position: 'absolute', top: 6, backgroundColor: '#f44941' }}
              >
                <Icon type="user" style={{ fontSize: 26, marginTop: 18, color: '#7f8287', fontWeight: 600 }}/>
              </Badge>
            </Link>
          </Popover>
          :
          <Popover
            trigger="hover"
            placement="bottomLeft"
            content={
              <div>
                <a onClick={() => dispatch({ type: 'ui/showLoginModal' })}>Login</a>
                <br />
                <a onClick={() => dispatch({ type: 'ui/showRegisterDrawer' })}>Register</a>
              </div>
          }
          >
            <a>
              <Icon type="user" style={{ fontSize: 26, marginTop: 18, color: '#7f8287', fontWeight: 600 }}/>
            </a>
          </Popover>
        }
      </div>
      <div className={styles['filler-right']}> </div>
    </Menu>
  );
};

export default connect(({ user }) => user)(Nav);
