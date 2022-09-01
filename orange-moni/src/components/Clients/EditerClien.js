import React, { useState, useEffect } from "react";
import Slide from "../menu/Slide";
import Header from "../navigation/Header";
import { Navigate, useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import http from "../../http-common";

const EditerClient = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pdv, setPdv] = useState("");
  const [solde, setSolde] = useState("");
  const [adresse, setAdress] = useState("");
  const [telephone, setTelephone] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [input, setInput] = useState(false);

  const [succesCreateUser, setSuccesCreateUser] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let mounted = true;

    http
      .get(`/client/getOne/${id}`, header)
      .then((res) => {
        if (mounted) {
          setNom(res.data.Client.nom);
          setPrenom(res.data.Client.prenom);
          setAdress(res.data.Client.adresse);
          setSolde(res.data.Client.solde);
          setTelephone(res.data.Client.telephone);
          setPdv(res.data.Client.pdv);
        }
      })
      .catch((error) => {});

    return () => (mounted = false);
  }, []);

  const modifier = (e) => {
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

      http
        .put(`/client/update/${id}`, data, header)
        .then((res) => {
          navigate("/client");
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="clients">
      <Header />

      <div className="container">
        <div className="row">
          <Slide />

          <div className="col-md-10 ajoutclient">
            <h1 className="titleSettings mt-2 pb-3">
              {" "}
              <i className="fas fa-user-edit"></i> Modifier le Client
            </h1>

            <div className="container mt-3 addUserContent">
              <div className="bg-dark mb-3 text-white text-center p-2">
                <i className="fa fa-user-plus"></i> Modifier un nouveau client
              </div>

              <div className="row">
                <div className="col-md-11 mx-auto">
                  {succesCreateUser === true ? (
                    <div className="alert alert-success mt-2 text-center">
                      {" "}
                      <i class="fa fa-user"></i> Le client a été modifier avec
                      succès.
                    </div>
                  ) : (
                    ""
                  )}

                  <form>
                    <div className="row mb-3 rowform">
                      <div className="col-md-6">
                        <label className="form-label">Nom</label>
                        <input
                          type="text"
                          onChange={(e) => setNom(e.target.value)}
                          className={`form-control ${
                            input === false && nom.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Nom Utilisateur"
                          value={nom}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Prenom</label>
                        <input
                          type="text"
                          onChange={(e) => setPrenom(e.target.value)}
                          className={`form-control ${
                            input === true && prenom.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Prenom Utilisateur"
                          value={prenom}
                        />
                      </div>
                    </div>

                    <div className="row rowform">
                      <div className="col-md-6">
                        <label className="form-label">Pdv</label>
                        <input
                          type="text"
                          onChange={(e) => setPdv(e.target.value)}
                          className={`form-control ${
                            input === true && pdv.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Montant initial "
                          aria-label="First name"
                          value={pdv}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Téléphone</label>
                        <input
                          type="text"
                          onChange={(e) => setTelephone(e.target.value)}
                          className={`form-control ${
                            input === true && telephone.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="PhoneNumber"
                          aria-label="Last name"
                          value={telephone}
                        />
                      </div>
                    </div>

                    <div className="row mb-3 rowform">
                      <div className="col-md-6">
                        <label className="form-label">Solde</label>
                        <input
                          type="text"
                          onChange={(e) => setSolde(e.target.value)}
                          className={`form-control ${
                            input === true && solde.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Nom Utilisateur"
                          value={solde}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Adress</label>
                        <input
                          type="text"
                          onChange={(e) => setAdress(e.target.value)}
                          className={`form-control ${
                            input === true && adresse.trim().length === 0
                              ? "is-invalid"
                              : " "
                          }`}
                          placeholder="Prenom Utilisateur"
                          value={adresse}
                        />
                      </div>
                    </div>

                    <div className="mt-4 btnConfirm">
                      <button
                        onClick={modifier}
                        type="submit"
                        value="Enregistrer"
                        className="btn btnRegister"
                      >
                        Modifier
                      </button>

                      <NavLink to="/home" className="btn btnAnnuler">
                        Annuler
                      </NavLink>
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

export default EditerClient;
