import React from 'react';
import './barreMenu.scss';
import { Navbar } from 'reactstrap';
import{Link} from 'react-router-dom'


const BarreMenu = () => {
    return (
        <Navbar className="menum navbar navbar-expand-md justify-content-center  ">
            <div className="container">
                <div className="navbar-collapse collapse justify-content-between align-items-center w-100" id="collapsingNavbar2">
                    <ul className="topBotomBordersOut navbar-nav mx-auto text-center menu ">
                        <li className="nav-item mr-5">
                        <Link className="nav-link" to="/plats">Plats</Link>
                        </li>
                        <li className="nav-item mr-5">
                        <Link className="nav-link" to="/desserts">Desserts</Link>
                            </li>
                        <li className="nav-item mr-5">
                        <Link className="nav-link" to="/menuComplet">Menu complet</Link>
                            </li>
                        <li className="nav-item mr-5">
                        <Link className="nav-link" to="/entrées">Entrées</Link>
                            </li>
                        <li className="nav-item mr-5">
                        <Link className="nav-link" to="/saisons">Saisons</Link>
                            </li>
                       
                    </ul>
                </div>
            </div>
        </Navbar>
    );
};

export default BarreMenu;
