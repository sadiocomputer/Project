import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';



const Slide = () => {


    const [redirect, setRedirect] = useState(false);



    return (

        <div className='slide'>
            
            <nav className="main-menu">



                <ul>
                    <li>
                        <NavLink to="/home" >
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">Home</span>
                        </NavLink>                    
                    </li>

                    <li className="">
                        <NavLink to="/client">
                            <i className="fa fa-users fa-2x"></i>
                            <span className="nav-text">Clients</span>
                        </NavLink>   
                    </li>

                    <li className="">
                        <NavLink to="/versement">   
                            <i className="fa fa-money fa-2x"></i>
                            <span className="nav-text">Versements</span>
                        </NavLink>   
                    </li>


                    <li>
                        <NavLink to="/transactions">   
                            <i className="fa fa-refresh fa-2x"></i>
                            <span className="nav-text">
                               Transactions 
                            </span>
                        </NavLink>   
                    </li>
                    <li>
                        <NavLink to="/emprunt">   
                            <i className="fa fa-openid fa-2x"></i>
                            <span className="nav-text">
                               Emprunt 
                            </span>
                        </NavLink>   
                    </li>
                    <li>
                        <NavLink to="/settings-users">   
                            <i className="fa fa-tools fa-2x"></i>
                            <span className="nav-text">
                               Paramètres
                            </span>
                        </NavLink>   
                    </li>

                    {/* <li className="dropdown">
                        <NavLink to="#" className="dropdown-toggle"  id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">   
                            <i className="fa fa-tools fa-2x"></i>
                            <span className="nav-text">Paramètres</span>
                        </NavLink>   

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                            <li>
                                <NavLink to="/factures" >   
                                    <i className="fa fa-cart-plus fa-2x"></i>
                                    <span className="nav-text">
                                        Users
                                    </span>      
                                </NavLink>       
                            </li>
                            <li>
                                <NavLink to="/factures" >   
                                    <i className="fa fa-cart-arrow-down fa-2x"></i>
                                    <span className="nav-text">
                                        Apropos
                                    </span>      
                                </NavLink>       
                            </li>
                        </ul>
                    </li> */}

                </ul>


            </nav>

        </div>
    );
};

export default Slide;