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
          <div className="row mt-3 d-flex justify-content-center ing">
            <div className="col-12 col-sm-4 col-md-4 col-lg-3">
              <h3 className="ingredients ">Ingrédients</h3>
              <ul>

                <li className="item-li">Viandes</li>
                <li className="item-li">fromages</li>
                <li className="item-li">fruits</li>
                <li className="item-li">Champignons</li>
                <li className="item-li">Légumes</li>
              </ul>

            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <h3 className="ingredients">Ingrédients</h3>
              <ul>

                <li>Viandes</li>
                <li>fromages</li>
                <li>fruits</li>
                <li>Champignons</li>
                <li>Légumes</li>
              </ul>

            </div>
            <div className="col-sm-4 col-md-4 col-lg-3">
              <h3 className="ingredients">Ingrédients</h3>
              <ul>

                <li>Viandes</li>
                <li>fromages</li>
                <li>fruits</li>
                <li>Champignons</li>
                <li>Légumes</li>
              </ul>

            </div>

          </div>

          <hr />
          <div className="row droits">
            <div className="col-lg-12">
              <span className="droits">Tous droits résrvées Marmiton.org - 1999-2021</span>
            </div>
          </div>



      </Col>
    {/* </Row> */}
  </div>
);

export default Footer;
