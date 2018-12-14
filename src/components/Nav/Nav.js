import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import styles from './Nav.css'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import booksIconPng from '../../assets/basket.png';


let Nav = history => {

    return (
      <Menu
        mode="horizontal"
        className={styles['navbar-top']}
      >
        <div className={styles['navbar-icons']}>
          <Icon type="bars" />
          </div>
        <Menu.Item key="main" className={styles['nav-button']}>
          <Link to='/'><Icon type="home"/>Home</Link>
        </Menu.Item>
        <Menu.Item key="books" className={styles['nav-button']}>
          <Link to='/books'><Icon type="book"/>Books</Link>
        </Menu.Item>
        <div className={styles['filler-left']}></div>
        <SearchBar history={history}/>
        <div className={styles.filler}></div>
        <div className={styles.cart}>
          <Badge count={0} showZero={true} overflowCount={10} title={'Items in cart'} style={{ backgroundColor: '#1890ff' }}>
            <img src={booksIconPng} alt="shopping cart" style={{ height: 35, width: 35 }}/>
          </Badge>
        </div>
        <div>
          <Badge count={0} showZero={true} overflowCount={5} title={'Notifications'}
                 style={{ position: 'absolute', top: 8, backgroundColor: '#1890ff' }}
          >
            <Icon type="user" style={{ fontSize: 32, marginTop: 20, color: '#7f8287', fontWeight: 600 }}/>
          </Badge>
        </div>
        <div className={styles['filler-right']}></div>
      </Menu>
    );
};

export default Nav;
