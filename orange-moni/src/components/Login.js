import React, { useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import http from '../http-common'

const Login = () => {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [errorIdentifiant, setErrorIdentifiant] = useState("");
  const [errorPassword, setErrorPassord] = useState("");

  const [btn, setBtn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [connecting, setConnecting] = useState(false);

  let token = localStorage.getItem("token");

  const valider = (event) => {
    event.preventDefault();
    setConnecting(true);

    const data = {
      identifiant: identifiant,
      password: password,
    };

    const d = new FormData();

    d.set("identifiant", identifiant);
    d.set("password", password);

    if (identifiant && password) {
     http.post("/user/login", data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setRedirect(true);
        })
        .catch((error) => {
          setConnecting(false);

          setErrorIdentifiant(error.response.data.identifiant);
          setErrorPassord(error.response.data.password);
        });
    }

    setBtn(true);
  };

  if (token) {
    return <Navigate to="/home" />;
  }

  if (redirect) {
    return <Navigate to="/home" />;
  }

  const red = () => {
    window.location.reload();
  };

  return (
    <div className="login-form">
      <div className="container">
        <div className="row">
          <div className="box col-md-5 p-5 mx-auto">
            <h1 className="text-center  mb-4">
              {" "}
              <i className="fa fa-user fa-3x"></i>
            </h1>
            <h3 className="text-center text-black fw-bold">My OrangeMoney</h3>
            <hr className="text-black" />
            <form onSubmit={valider}>
              <div className="mb-3">
                <label className="form-label text-black">
                  {" "}
                  <i className="fa fa-id-badge fa-0x"></i> Identifiant
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    btn === true && identifiant.trim().length === 0
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  id="identifiant"
                  placeholder="Identifiant ou Email"
                />
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label text-black">
                  {" "}
                  <i className="fa fa-lock"></i> Mot de passe{" "}
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    btn === true && password.trim().length === 0
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Mot de passe"
                />
              </div>

              {errorIdentifiant || errorPassword ? (
                <div className="container">
                  <span class="alert alert-danger">
                    {" "}
                    <i class="fa fa-circle-exclamation"></i> Identifiant ou mot
                    de passe invalid !{" "}
                  </span>
                </div>
              ) : (
                " "
              )}

              <div className="d-grid gap-2">
                <input type="submit" value="Connexion" className="mt-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
       { connecting && identifiant.trim().length !== 0  && password.trim().length !==0 ?
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
       : ''
       }
    </div>
  );
};

export default Login;
