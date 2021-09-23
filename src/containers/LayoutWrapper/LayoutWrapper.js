import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Grid,
  Menu,
  // Button,
  // Icon,
  // Input,
} from 'semantic-ui-react';

import { routeByPageKey } from '../../routes';

import SIDE_MENU_NAV from './side-menu-nav';

import 'semantic-ui-css/semantic.min.css';

import './layout-wrapper.css';

const TITLE = 'fun programming';

const LayoutWrapper = ({ children }) => {
  // const [dropdownMenuStyle, setDropdownMenuStyle] = React.useState({
  //   display: 'none',
  // });

  // const handleToggleDropdownMenu = React.useCallback(() => {
  //   if (dropdownMenuStyle.display === 'none') {
  //     setDropdownMenuStyle({ display: 'flex' });
  //   } else {
  //     setDropdownMenuStyle({ display: 'none' });
  //   }
  // }, [dropdownMenuStyle]);

  return (
    <div className="layout-wrapper">
      <Grid padded className="tablet computer only">
        <Menu borderless inverted fluid fixed="top">
          <Link to="/" className="header item">
            {TITLE}
          </Link>
          {/*
          <Menu.Menu position="right">
            <Menu.Item>
              <Input placeholder="Search..." size="small" />
            </Menu.Item>
            <Menu.Item as="a">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">Profile</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
          </Menu.Menu>
           */}
        </Menu>
      </Grid>
      <Grid padded className="mobile only">
        <Menu borderless inverted fluid fixed="top">
          <Link to="/" className="item">
            {TITLE}
          </Link>

          {/*
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                basic
                inverted
                icon
                toggle
                onClick={handleToggleDropdownMenu}
              >
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>

          <Menu borderless fluid inverted vertical style={dropdownMenuStyle}>
            <Menu.Item as="a">Dashboard</Menu.Item>
            <Menu.Item as="a">Settings</Menu.Item>
            <Menu.Item as="a">Profile</Menu.Item>
            <Menu.Item as="a">Help</Menu.Item>
            <Divider fitted />
            <Menu.Item>
              <Input placeholder="Search..." size="small" />
            </Menu.Item>
          </Menu>
        */}
        </Menu>
      </Grid>
      <Grid padded>
        <Grid.Column
          tablet={3}
          computer={3}
          only="tablet computer"
          id="sidebar"
        >
          <Menu vertical borderless fluid text>
            <NavLink
              exact
              to="/"
              // component={Menu.Item}
              className="item"
              activeClassName="active"
            >
              Home
            </NavLink>
            {SIDE_MENU_NAV.map(({ title, pageKey }) => (
              <NavLink
                key={`sideMenuNav${pageKey}`}
                to={routeByPageKey[pageKey].path}
                // component={Menu.Item}
                className="item"
                activeClassName="active"
                exact
              >
                {title}
              </NavLink>
            ))}
          </Menu>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={13}
          computer={13}
          floated="right"
          id="content"
        >
          {children}
        </Grid.Column>
      </Grid>
    </div>
  );
};

LayoutWrapper.Content = ({ children }) => (
  <div className="layout-wrapper__content">{children}</div>
);

export default LayoutWrapper;
