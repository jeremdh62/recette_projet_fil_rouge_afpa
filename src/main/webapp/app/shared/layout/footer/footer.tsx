import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
          {/* <Translate contentKey="messageFooter"></Translate><br/>
          <Translate contentKey="footer"></Translate> */}
          <div className="footer">
            <div className="row ">
                <div className="col-4 col-md-4 col-lg-3 ">
                    <i className="fab fa-facebook-square fa-4x"></i>
                </div>
                <div className="col-4 col-md-4 col-lg-3">
                    <i className="fab fa-instagram-square fa-4x"></i>
                </div>
                <div className="col-4 col-md-4 col-lg-3">
                    <i className="fab fa-twitter fa-4x"></i>
                </div>
                <div className="col-4 col-md-4 col-lg-3">
                    <i className="fab fa-snapchat-square fa-4x"></i>
                </div>
            </div>
            <hr/>
            <div className="row mt-3 d-flex justify-content-center ing">
            <div className="col-sm-4 col-md-4 col-lg-4">
                <ul>
                <h3>Ingrédients</h3>
                    <li>Viandes</li>
                    <li>fromages</li>
                    <li>fruits</li>
                    <li>Champignons</li>
                    <li>Légumes</li>
                </ul>
                   
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                <ul>
                <h3>Ingrédients</h3>
                    <li>Viandes</li>
                    <li>fromages</li>
                    <li>fruits</li>
                    <li>Champignons</li>
                    <li>Légumes</li>
                </ul>
                   
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                <ul>
                <h3>Ingrédients</h3>
                    <li>Viandes</li>
                    <li>fromages</li>
                    <li>fruits</li>
                    <li>Champignons</li>
                    <li>Légumes</li>
                </ul>
                   
                </div>
                
                </div>
            <hr/>
            <div className="row droits">
            <div className="col-lg-12">
<span>Tous droits résrvés Marmiton.org - 1999-2021</span>
            </div>
            </div>

                </div>
        

      </Col>
    </Row>
  </div>
);

export default Footer;
