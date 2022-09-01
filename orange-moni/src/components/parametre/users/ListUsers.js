import React, { useState } from 'react';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import { Link, NavLink } from 'react-router-dom';
import Slide from '../../menu/Slide';
import Header from '../../navigation/Header';

const ListUsers = () => {
    const [recherche, setRecherche] = useState('');

    return (
        <div className='versement settings '>
            <Header />
            <Slide />

                <div className="listversement">
                    <div className="col-md-10">

                        



                    <div className="container  mt-5">
                        <div className="contentSetting">

                        <h1 className="titleContent mt-2 pb-3 "><i className="fa fa-tools"></i> Paramètres</h1>

                                <ul className='d-flex justify-content-center'>
                                    <li className='me-4'>
                                        <NavLink to="/settings-users" >
                                            <i className="fa fa-users "></i>
                                            <span className="nav-text"> Utilisateurs</span>
                                        </NavLink>                    
                                    </li>
                                    <li>
                                        <NavLink to="/a-propos" >
                                            <i className="fa fa-info-circle "></i>
                                            <span className="nav-text"> A Propos</span>
                                        </NavLink>                    
                                    </li>
                                </ul>                        
                    </div>
















                            <h1 className="lead mt-2 pb-3"><i className="fa fa-users"></i> Utilisateurs</h1>
                            <div className="bg-dark mb-3 text-white text-center p-2">
                                <i className="fa fa-rectangle-list"></i> Liste des utilisateurs
                        </div>
                        
                        <div className='headerVersement  d-flex justify-content-between align-items-center'>
                            {/* Ajout de l'utilisateur en Modal */}
                            <div>
                                <button type="button" className="btn btnaddVersement" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat"> <i className="fa fa-plus-circle"></i> Nouvel utilisateur</button>
                                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"> <i className="fa fa-plus-circle"></i> Ajouter un nouvel utilisateur</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <form>
                                                <div className="form-group">
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Nom</label>
                                                            <input type="text" name=""  className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Prénom</label>
                                                            <input type="text" name=""  className="form-control" />

                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Identifiant</label>
                                                            <input type="text" name=""  className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Téléphone</label>
                                                            <input type="text" name=""  className="form-control" />

                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Password</label>
                                                            <input type="password" name=""  className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Confirm Password</label>
                                                            <input type="password" name=""  className="form-control" />

                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Role</label>
                                                            <select name="" id="" className="form-select">
                                                                <option value="">Selectionner</option>
                                                                <option value="">User</option>
                                                                <option value="">Admin</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="form-label">Adress</label>
                                                            <input type="text" name=""  className="form-control" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </form>



                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-primary">Ajouter</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                            </div>
                            {/* Fin de l'utilisateur en Modal */}
                        
                            <div className='d-flex headerExport'>



                                    <form className="d-flex">
                                        <div className="search-box">
                                            <button onClick={(e=>e.preventDefault())} className="btn-search"><i className="fas fa-search"></i></button>
                                            <input type="text" className="input-search" onChange={e=>setRecherche(e.target.value)} placeholder="Rechercher" />
                                        </div>
                                    </form> 

                                    


                                    <ReactHtmlTableToExcel
                                        
                                        className=" btn fa fa-cloud-download"
                                        table="tableContent"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText=""
                                    />
                                    

                            </div>
                        </div> 

                        </div>

                        
                        <table  className="table table-striped" id='tableContent' >
                            <thead>
                                <tr>
                                    <th  className='fw-normal text-danger'>  Nom  </th>
                                    <th  className='fw-normal text-danger'>  Prénom </th>
                                    <th className='fw-normal text-danger'>   Identifiant </th>
                                    <th className='fw-normal text-danger'>  Password </th>
                                    <th  className='fw-normal text-danger'>  Modifier </th>
                                    <th  className='fw-normal text-danger'>  Téléphone</th>
                                    <th className='fw-normal text-danger'>  Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="7" className='text-center text-muted'>Pas d'utilisateurs pour le moment ! </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
        </div>
    );
};

export default ListUsers;