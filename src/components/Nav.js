import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Nav.css'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

let Nav = () => {
    return (
      <Menu
        mode="horizontal"
        className={styles['navbar-top']}
      >
        <Menu.Item key="main">
          <Link to='/'><Icon type="home"/>Home</Link>
        </Menu.Item>
        <Menu.Item key="books">
          <Link to='/books'><Icon type="book"/>Books</Link>
        </Menu.Item>
        <Menu.Item style={{ float: 'right' }}>
          <SearchBar/>
        </Menu.Item>
      </Menu>
    );
};

export default Nav;
