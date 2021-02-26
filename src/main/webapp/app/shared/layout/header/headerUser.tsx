import React from 'react';
import './header.scss';
import barreMenu from './barreMenu';


const HeaderUser = () => {
  return (
      <header className="fixed-top">
          <div className="head">
        <h1>
          <a className="nav-link bg-black text-black" href="#">
            Recette Afpa
            {/* <img className="logo" src={logo}  */}
            {/* /> */}
          </a>
        </h1>

        <form className="form-inline my-2 my-lg-0">
          <input className="rounded-pill mr-sm-2 form" type="search" placeholder="Search" />
        </form>
        <i className="fas fa-user fa-2x "></i>
        <a className="nav-link text-white" href="#">
          connexion
        </a>
        </div>
        </header>
      


  );
};

export default HeaderUser;
