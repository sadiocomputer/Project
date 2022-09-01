import React from 'react';
import { NavLink } from 'react-router-dom';
import Slide from '../menu/Slide';
import Header from '../navigation/Header';

const Settings = () => {
    return (
        <div className='settings'>
            <Header />
            <Slide />

                <div className="col-md-10">
                    <div className="container contentSetting">
                        <h1 className="titleContent mt-2 pb-3 "><i className="fa fa-tools"></i> Paramètres</h1>

                                                            <ul className='d-flex'>
                                    <li className='me-4'>
                                        <NavLink to="/settings-users" >
                                            <i className="fa fa-users "></i>
                                            <span className="nav-text"> Utilisateurs</span>
                                        </NavLink>                    
                                    </li>
                                    <li>
                                        <NavLink to="/settings-users" >
                                            <i className="fa fa-users "></i>
                                            <span className="nav-text"> A Propos</span>
                                        </NavLink>                    
                                    </li>
                                </ul>                        



                    </div>
                </div>
        </div>
    );
};

export default Settings;