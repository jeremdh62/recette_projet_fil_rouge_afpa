import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

 export const BrandIcon = props => (
  <div {...props} className="brand-icon">

  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo d-flex">
    <span className="brand-title mt-4">
      <Translate contentKey="global.title">Afparecette</Translate>
      <img className="chef" src="content/images/logochef2.png" alt="Logo" />

    </span>
    
    {/* <img src={chef} /> */}
    {/* <span className="navbar-version">{appConfig.VERSION}</span> */}
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      {/* <FontAwesomeIcon icon="home" /> */}
      <span>
        {/* <Translate contentKey="global.menu.home">Home</Translate> */}
      </span>
    </NavLink>
  </NavItem>
);
