import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import BarreMenu from './barreMenu';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <header className="fixed-top">
      <div className="d-flex justify-content-between height-row-bar">
        <h1 className="col-4 d-flex align-items-center">
          <Brand/>
         
        </h1>
        <form className="col-4 d-flex algn-items-center form-inline">
          <input className="rounded-pill col-12" type="search" placeholder="Search" />
        </form>
        <div className="d-flex col-4 flex-row-reverse">
          <Collapse isOpen={menuOpen}>
            <Nav id="header-tabs" className="d-flex flex-row justify-content-around align-items-center h-100">
              <Home />
              {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
              {props.isAuthenticated && props.isAdmin && (
                <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
              )}
              <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
              <AccountMenu isAuthenticated={props.isAuthenticated} />
            </Nav>
          </Collapse>
        </div>
      </div>
      <BarreMenu />
    </header>
  );
};

export default Header;
