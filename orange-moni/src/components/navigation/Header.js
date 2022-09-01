import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';

const Header = () => {

    const [redirect, setRedirect] = useState(false);

    const deleteToken = () => {
        setRedirect(true)
        localStorage.clear();
        
    }

    if (redirect) {
        return <Navigate to="/login" />
    }

    return (
        <div className='header'>
            <div className="container-fluid">
                <div className='contentHeader'>

                    <div className='contentOne'>
                        <NavLink to="/home">
                            My Orange Money
                        </NavLink>
                    </div>

                    <div className='contentTow'>
                        <NavLink to="">
                            <i className='fa fa-user fa' ></i> Admin
                        </NavLink>
                        <NavLink to="" onClick={deleteToken}>
                            <i className="fa fa-power-off fa"></i> Déconnexion
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;