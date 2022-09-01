import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";
import Header from "../navigation/Header";
import Slide from "../menu/Slide";
import http from "../../http-common";

const Client = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pdv, setPdv] = useState("");
  const [solde, setSolde] = useState("");
  const [adresse, setAdress] = useState("");
  const [telephone, setTelephone] = useState("");

  const [input, setInput] = useState(false);

  const [errorUserExist, setErrorUserExist] = useState(false);
  const [succesCreateUser, setSuccesCreateUser] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const valider = (e) => {
    e.preventDefault();

    const data = {
      nom: nom,
      prenom: prenom,
      pdv: pdv,
      adresse: adresse,
      telephone: telephone,
      solde: solde,
    };

    if (nom && prenom && pdv && adresse && telephone) {
      let header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      http.post("/client/create", data, header)
        .then((res) => {
          setSuccesCreateUser(true);

          const timer = setTimeout(() => {
            // *** If you only want to automatically clear
            setRedirect(true); // *** this message and not an error message
          }, 3000);

          return () => clearTimeout(timer);
        })
        .catch((error) => {
          setErrorUserExist(true);
        });
    }

    setInput(true);
  };

  if (redirect) {
    return <Navigate to="/client" />;
  }

  return (
    <div className="clients">
      <Header />

      <div className="container">
        <div className="row">
          <Slide />

          <div className="col-md-10 ajoutclient">
            <h1 className="titleSettings mt-2 pb-3">
              {" "}
              <i className="fa fa-user-plus"></i> Ajouter un nouveau Client
            </h1>

            <div className="container shadow-sm p-3 mb-5 bg-body mt-3 addUserContent">
              <div className="row">
                <div className="col-md-11 mx-auto">
                  {errorUserExist === true && succesCreateUser === false ? (
                    <div className="alert alert-info mt-2 text-center">
                      {" "}
                      <i class="fa fa-user"></i> Ce client existe déjà.
                    </div>
                  ) : (
                    ""
                  )}
                  {succesCreateUser === true ? (
                    <div className="alert alert-success mt-2 text-center">
                      {" "}
                      <i class="fa fa-user"></i> Le client a été crée avec
                      succès.
                    </div>
                  ) : (
                    ""
                  )}

                  <form>
                    <div className="row mb-3 rowform">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Nom</label>
                        <input
                          type="text"
                          onChange={(e) => setNom(e.target.value)}
                          className={`form-control ${
                            input === true && nom.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Nom"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">Prenom</label>
                        <input
                          type="text"
                          onChange={(e) => setPrenom(e.target.value)}
                          className={`form-control ${
                            input === true && prenom.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Prénom"
                        />
                      </div>
                    </div>

                    <div className="row mb-3 rowform">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">PDV</label>
                        <input
                          maxLength="9"
                          type="text"
                          onChange={(e) => setPdv(e.target.value)}
                          className={`form-control ${
                            input === true && pdv.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Numéro PDV "
                          aria-label="First name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">Téléphone</label>
                        <input
                          type="text"
                          onChange={(e) => setTelephone(e.target.value)}
                          className={`form-control ${
                            input === true && telephone.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Numéro Telephone"
                          aria-label="Last name"
                        />
                      </div>
                    </div>

                    <div className="row mb-3 rowform">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Solde</label>
                        <input
                          type="text"
                          onChange={(e) => setSolde(e.target.value)}
                          className={`form-control`}
                          placeholder="Solde"
                          disabled
                        />

                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">Adress</label>
                        <input
                          type="text"
                          onChange={(e) => setAdress(e.target.value)}
                          className={`form-control ${
                            input === true && adresse.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Adress"
                        />
                      </div>
                    </div>

                    <div className=" row btnConfirm">
                      <div className="col-md-12">
                        <button
                          onClick={valider}
                          type="submit"
                          value="Enregistrer"
                          className="btn btnRegister"
                        >
                          Valider
                        </button>

                        <NavLink to="/client" className="btn btnAnnuler">
                          Annuler
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
