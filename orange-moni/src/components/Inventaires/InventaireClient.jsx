import React, { useEffect, useRef, useState } from "react";
import Header from "../navigation/Header";
import Slide from "../menu/Slide";
import axios from "axios";
import { useParams } from "react-router";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import http from "../../http-common";

const InventaireClient = () => {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [solde, setSolde] = useState(0);
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [dateDebut, setDateddebut] = useState('')
  const [dateFin , setDateFin] = useState('')
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
   
    let mounted = true;
     http
    //  .get(`http://20.234.215.190:4000/inventaire/getClient/${id}`, header)
      .get(`/inventaire/getClient/${id}`, header)
      .then((res) => {
        if (mounted) {
          setData(res.data.Data);
          setName(res.data.client.nom);
          setPrenom(res.data.client.prenom);
          setSolde(res.data.client.solde);
        }
      })
      .catch((error) => {});

    return () => (mounted = false);
  }, []);

  const rechercher = () => {

       const data = {

           dateDebut:dateDebut,
           dateFin:dateFin,
           id:id
       }

       if(dateDebut&&dateFin) {

        http
        .post(`/inventaire/findDate/`,data,header)
        .then((res) => {
          
          setData(res.data.Data);
          //setName(res.data.client.nom);
          //setPrenom(res.data.client.prenom);
          //setSolde(res.data.client.solde);

        })
        .catch((error)=>{
        })
       }
  }

  const componentRef = useRef();
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
        @page { size: landscape; }
      }
  
    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
  `;

  return (
    <div className="inventairesClient settings">
      <Header />
      <Slide />

      <div className="col-md-10 mt-3" ref={componentRef}>
        <div className=" contentSetting ">
          <div className="HeadInventaire mt-2 d-flex justify-content-between">
            <h4 className="lead">
              Inventaires : {name} {prenom}{" "}
            </h4>
            <h4 className="lead text-success">
              {" "}
              Soldes :{" "}
              <NumberFormat
                value={solde}
                thousandSeparator
                suffix="GNF"
                displayType="text"
                className={`${solde < 0 ? "text-danger" : "text-success"}`}
              />{" "}
            </h4>
          </div>

          <div className="mt-4 mb-3">
            <div className="bg-dark mb-3 text-white text-center p-2">
              <i className=""></i> Inventaire
            </div>

            <div className="off">
              <div className="row">
                <div className="col-md-2 d-flex justify-content-end">
                  <p className="txtDate">Date début</p>
                </div>
                <div className="col-md-2">
                  <input onChange={(e)=>setDateddebut(e.target.value)} type="date" className="form-control" />
                </div>

                <div className="col-md-2 d-flex justify-content-end">
                  <p className="txtDate">Date Fin</p>
                </div>
                <div className="col-md-2">
                  <input onChange={(e)=>setDateFin(e.target.value)} type="date" className="form-control" />
                </div>

                <div className="col-md-2">
                  <button  onClick={rechercher} className="btn btnSearch">Rechercher</button>
                </div>

                <div className="col-md-2">
                  <div className="d-flex justify-content-end">
                    <Link to="/client" className="btn ">
                      <i className="fa fa-chevron-left"></i>
                    </Link>

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
              </div>
            </div>
          </div>

          <div className="mt-4">
            <table className="table table-striped" id="tableContent">
              <thead className="">
                <tr className="border ">
                  <th className="border  text-center " colSpan="4">
                    Transactions
                  </th>
                  <th className="border text-center " colSpan="3">
                    Versements
                  </th>
                  <th className="border text-center" colSpan="3">
                    Emprunts
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="textE">
                  <th className="border ">
                    <h6>Montant</h6>
                  </th>
                  <th className="border">
                    <h6>Type</h6>
                  </th>
                  <th className="border">
                    <h6>Date</h6>
                  </th>
                  <th className="border">
                    <h6>Heure</h6>
                  </th>

                  <th className="border">
                    <h6>Montant Versé</h6>
                  </th>
                  <th className="border">
                    <h6>Type</h6>
                  </th>
                  <th className="border">
                    <h6>Date</h6>
                  </th>

                  <th className="border">
                    <h6>Montant Emprunté</h6>
                  </th>
                  <th className="border">
                    <h6>Type</h6>
                  </th>
                  <th className="border">
                    <h6>Date</h6>
                  </th>
                </tr>

                {Data.map((dt) => (
                  <tr key={dt.id}>
                    <td>
                      {" "}
                      <NumberFormat
                        value={dt.montant}
                        thousandSeparator
                        suffix="GNF"
                        displayType="text"
                        className={`${
                          dt.montant < 0 ? "text-danger" : "text-success"
                        }`}
                      />
                    </td>
                    <td> {dt.type} </td>
                    <td> {dt.datetransaction} </td>
                    <td> {dt.heuretransaction} </td>

                    <td>
                      <NumberFormat
                        value={dt.montantverser}
                        thousandSeparator
                        suffix="GNF"
                        displayType="text"
                        className={`${
                          dt.montantverser < 0 ? "text-danger" : "text-success"
                        }`}
                      />
                    </td>
                    <td>Versement</td>
                    <td> {dt.dateversement} </td>

                    <td>
                      <NumberFormat
                        value={dt.montantemprunt}
                        thousandSeparator
                        suffix="GNF"
                        displayType="text"
                        className={"text-danger"}
                      />
                    </td>
                    <td>emprunt</td>

                    <td> {dt.dateemprunt} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventaireClient;
