import React from 'react';
import Slide from '../menu/Slide';
import Header from '../navigation/Header';

const Apropos = () => {
    return (
        <div className='versement settings '>
            <Header />
            <Slide />

                <div className="listversement">
                    <div className="col-md-10">

                        <div className="container  mt-5">
                            <div className="contentSetting">

                            <h1 className="titleContent mt-2 pb-3 "><i className="fa fa-info-circle"></i> A propos</h1>

                        
                        </div>


                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <p className='mt-5'>
                                        Application développé par tekDev-Informatique permettant la gestion d'une entreprise de micro-finance ; actuellement sous 
                                        la  <span className="text-danger">version 1.1</span>. 
                                        
                                    </p>
                                </div>
                            </div>



                        


                        </div>



                    </div>
                </div>
        </div>
    );
};

export default Apropos;