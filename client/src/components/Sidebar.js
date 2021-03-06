import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  highlightMenu() {
    const { pathname } = window.location;
    if (pathname.includes('/home')) {
      return ['0'];
    } else if (pathname.includes('/markets')) {
      return ['1'];
    } else if (pathname.includes('/resources')) {
      return ['2'];
    } else {
      return ['0'];
    }
  };

  renderSidebar() {
    const { data } = this.props.currentUser;
    const styles = {
      logout: {
        position: 'absolute',
        bottom: 0
      },
      sidebar: {
        backgroundColor: '#36393f'
      },
      menu: {
        backgroundColor: '#36393f'
      }
    };

    const menuItems = [
      { path: 'home', icon: 'home', text: 'Home' },
      { path: 'markets', icon: 'global', text: 'Markets' },
      { path: 'resources', icon: 'database', text: 'Resources' },
      { path: 'api/signout', icon: 'logout', text: 'Logout' }
    ];

    if (data) {
      return (
        <Sider breakpoint='xl' collapsedWidth='0' style={styles.sidebar}>
          <Menu mode='inline' theme='dark' defaultSelectedKeys={this.highlightMenu()} style={styles.menu}>
            {menuItems.map(({ path, icon, text }, i) => {
              if (path === 'api/signout') {
                return (
                  <Menu.Item key={i} style={styles.logout}>
                    <a href={`/${path}`}>
                      <Icon type={icon} />
                      <span className='nav-text'>{text}</span>
                    </a>
                  </Menu.Item>
                );
              }

              return (
                <Menu.Item key={i}>
                  <Link to={`/${path}`}>
                    <Icon type={icon} />
                    <span className='nav-text'>{text}</span>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
      );
    } else {
      return null;
    }
  }

  render() {
    return <Fragment>{this.renderSidebar()}</Fragment>;
  }
};

function mapStateToProps({ currentUser }) {
  return { currentUser };
};

export default connect(mapStateToProps, null)(Sidebar);
