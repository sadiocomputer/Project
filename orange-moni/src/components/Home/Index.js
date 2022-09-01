import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../navigation/Header';
import Slide from '../menu/Slide';
import { useEffect } from 'react';


const Index = () => {

    const [time , setTime] = useState(null)

    const nombreClient = localStorage.getItem('nombreClient')

   
   
    
    return (
        <div className="home">
            <Header />

            <div className="container">
                <Slide />

                <div className='positionHome'>
                    <div className="centerHome">
                                <h3 className='text-black pb-3'><i className='fa fa-home '></i> Home </h3>
                            
                                <main>
                                <div className='contentOne row'>
                                    <div className='  col-md-4 p-5 rounded box1'>
                                    
                                    </div>

                                    <div className='box2 rounded col-md-4 '>
                                        <NavLink to="/versement">
                                            
                                            <h5>Versements</h5>
                                            <p>Total de vos chiffres d'affaires.</p>
                                        </NavLink> 
                                    </div>

                                    <div className='box3 rounded col-md-4 '>
                                        <NavLink to="/transactions">
                                            
                                            <h5>Transactions</h5>
                                            <p>Clients, Versements ...</p>
                                        </NavLink> 
                                    </div>
                                </div>

                                <div className='contentTwo row'>
                                    <div className='box21 p-5 rounded col-md-4 '>
                                        <NavLink to="/emprunt">
                                            <h5>Emprunt</h5>
                                            <p>Qui vous dois de l'argent ?</p>
                                        </NavLink>
                                    </div>
                                    <div className='box22  rounded col-md-4 '>
                                        <NavLink to="/client">
                                            
                                            <h5>{nombreClient} Clients</h5>
                                            <p>Consultez vos clients.</p>
                                        </NavLink>
                                    </div>
                                    <div className='box23 rounded col-md-4 '>
                                        <NavLink  to="/settings">
                                        
                                            <h5>Parametres</h5>
                                            <p>Configuration de l'application.</p>
                                        </NavLink>
                                    </div>
                                </div>
                                </main>           
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;