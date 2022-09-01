import React from 'react';
import Slide from '../menu/Slide';
import Header from '../navigation/Header';
import ListEmprunt from './ListEmprunt';

const Emprunt = () => {
    return (
        <div className='versement'>
            <Header />
            <Slide />

                <div className="col-md-10">
                    <div className="container mt-5">
                        <h1 className="titleContent mt-2 pb-3"><i className="fa fa-openid"></i> Emprunt</h1>
                        <ListEmprunt />
                    </div>
                </div>
        </div>
    );
};

export default Emprunt;