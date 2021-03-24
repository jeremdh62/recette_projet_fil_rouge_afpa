import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';




const Footer = props => (



  <div className="footer page-content mt-5">
    {/* <Row> */}
      <Col md="12 ">
        {/* <Translate contentKey="messageFooter"></Translate><br/>
          <Translate contentKey="footer"></Translate> */}
          <div className="row logo-reseaux">
            <div className="col-2 col-sm-3 col-md-3 col-lg-3 ">
              <i className="fab fa-facebook-square fa-4x"></i>
            </div>
            <div className="col-2 col-sm-3 col-md-3 col-lg-3">
              <i className="fab fa-instagram-square fa-4x"></i>
            </div>
            <div className="col-2 col-sm-3 col-md-3 col-lg-3">
              <i className="fab fa-twitter fa-4x"></i>
            </div>
            <div className="col-2 col-sm-3 col-md-3 col-lg-3">
              <i className="fab fa-snapchat-square fa-4x"></i>
            </div>
          </div>
          <hr />
          <div className="row mt-3 d-flex justify-content-center recettes ">
          <div className="col-sm-4 col-md-4 col-lg-3 " >
              <h3 className="recettes">RECETTES</h3>
              <ul className="recettelist">

                <li>tiramitsu</li>
                <li>Tarte aux pommes</li>
                <li>Mousse au chocolat</li>
                <li>Blanquette de veau</li>
                <li>Pain perdu</li>
              </ul>

            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <h3 className="catégories" >CATÉGORIES</h3>
              <ul className="categorieslist">

                <li>Entrées</li>
                <li>Déssert</li>
                <li>Plats</li>
                <li>Saisons</li>
                <li>Menu complet</li>

              </ul>

            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <h3 className="partenaires">PARTENAIRES</h3>
              <ul className="partenaireslist">

                <li>Déco.fr</li>
                <li>M6</li>
                <li>Afpa</li>
                <li>Rtl.fr</li>
                <li>Intersport</li>
              </ul>

            </div>

          </div>

          <hr />
          <div className="info">
            
           
           <ul className="liste">
           <li><a href="#">Mentions légales</a> -</li>
             <li><a href="#">Conditions générales</a> -</li>
             <li><a href="#">Vos questions</a> -</li>
             <li><a href="#">Contact</a></li>
           </ul>
</div>
            
           
         

          <div className="row droits">
            <div className="col-lg-12">
              <span className="droits">Tous droits résrvés Afpa Recette - 2021</span>
            </div>
          </div>



      </Col>
    {/* </Row> */}
  </div>
);

export default Footer;
