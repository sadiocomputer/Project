import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NumberFormat from "react-number-format";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print";
import http from "../../http-common";

const ListClient = () => {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [parPage, setParPage] = useState(16);
  const componentRef = useRef();
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const [Data, setData] = useState([]);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);

    console.log(selectedPage);
  }

  const inventaire = (id) => {
    navigate(`/inventaire/client/${id}`);
  };

  const editer = (id) => {
    navigate(`/client/editer/${id}`);
  };

  useEffect(() => {
    let mounted = true;
    http
      .get("/client/getAlls", header)
      .then((res) => {
         localStorage.setItem('nombreClient',res.data.Clients.length)
        if (mounted) {
          setData(res.data.Clients);
        }
      })
      .catch((error) => {
       
      });

    return () => (mounted = false);
  }, []);

  const offset = currentPage * parPage;
  const pageCount = Math.ceil(Data.length / parPage);

  const deleteClient = (id) => {
    let dialog = window.confirm("voulez-vous supprimé");

    if (dialog) {
      http
        .delete(`/client/delete/${id}`, header)
        .then((res) => {
          alert("client supprimer avec succè");
          window.location.reload();
        })
        .catch((error) => {});
    }
  };

  const pageStyle = `

      @media all {
        .page-break, .off {
          display: none;
        }

        .content::after {
            content:"Listes des clients";
            width:100%;
            height:100px;
            color:black;
            font-weight:bold;
            text-align:center;
            text-transform:uppercase;
        }
      }
      
      @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }
      
      @media print {
        .page-break {
          margin-top: 1.5rem;
          display: block;
          page-break-before: auto;
        }

      }
      
      @page {
        size: auto;
        margin: 20mm;
      }



      @media all {
        .pagebreak {
          display: none;
        }
      }
    
      @media print {
        .pagebreak {
          page-break-before: always;
        }
      }
    `;

  return (
    <div className="listversement">
      <div className="bg-dark mb-3 text-white text-center p-2">
        <i className="fa fa-rectangle-list"></i> Liste des clients
      </div>
      <div className="container">
        <div className="headerVersement  d-flex justify-content-between align-items-center">
          <div>
            <NavLink className="btn btnaddVersement" to="/add-client">
              <i className="fa fa-user-plus"></i> Ajouter Client
            </NavLink>
          </div>

          <div className="d-flex headerExport">
            <form className="d-flex">
              <div className="search-box">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="btn-search"
                >
                  <i className="fas fa-search"></i>
                </button>
                <input
                  type="text"
                  className="input-search"
                  onChange={(e) => setRecherche(e.target.value)}
                  placeholder="Rechercher"
                />
              </div>
            </form>

            <ReactHtmlTableToExcel
              className=" btn fa fa-cloud-download"
              table="tableContent"
              filename="tablexls"
              sheet="tablexls"
              buttonText=""
            />

            <ReactToPrint
              trigger={() => (
                <button className="btn">
                  <i className="fa fa-print"></i>
                </button>
              )}
              content={() => componentRef.current}
              pageStyle={pageStyle}
            />
          </div>
        </div>

        <table
          className="table table-striped"
          id="tableContent"
          ref={componentRef}
        >
          <thead>
            <tr>
              <th className="fw-normal text-danger"> Nom </th>
              <th className="fw-normal text-danger"> Prénom </th>
              <th className="fw-normal text-danger"> PDV </th>
              <th className="fw-normal text-danger"> Soldes </th>
              <th className="fw-normal text-danger"> Téléphone </th>
              <th className="fw-normal text-danger"> Adresse </th>
              <th className="fw-normal text-danger off"> Options</th>
            </tr>
          </thead>
          <tbody>
            {Data.length === 0 ? (
              <tr>
                <td colSpan="6"> Pas de correpondance !</td>
              </tr>
            ) : (
              Data.slice()
                .filter((client, i) => {
                  if (recherche === "") {
                    return client;
                  } else if (
                    client.nom
                      .toLowerCase()
                      .includes(recherche.toLowerCase()) ||
                    client.nom.toUpperCase().includes(recherche.toUpperCase())
                  ) {
                    return client;
                  } else if (
                    client.prenom
                      .toLowerCase()
                      .includes(recherche.toLowerCase()) ||
                    client.prenom
                      .toUpperCase()
                      .includes(recherche.toUpperCase())
                  ) {
                    return client;
                  }
                  
                })
                .map((client) => (
                  <tr
                    onDoubleClick={() => inventaire(client.id)}
                    className="click"
                    key={client.pdv}
                  >
                    <td>{client.nom}</td>
                    <td>{client.prenom}</td>
                    <td>{client.pdv}</td>

                    <td>
                      {" "}
                      <NumberFormat
                        value={client.solde}
                        thousandSeparator
                        suffix="GNF"
                        displayType="text"
                        className={`${
                          client.solde < 0 ? "text-danger" : "text-success"
                        }`}
                      />{" "}
                    </td>

                    <td>{client.telephone}</td>
                    <td>{client.adresse}</td>
                    <td>
                      <div className="btnAction">
                        <button onClick={() => editer(client.id)}>
                          <i className="edit fa fa-edit fa-1x"></i>{" "}
                        </button>
                        <button onClick={() => deleteClient(client.id)}>
                          <i className="del fa fa-trash fa-1x"></i>{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClient;
