import React, { useState } from 'react';
import Slide from '../menu/Slide';
import Header from '../navigation/Header';
import { ExcelRenderer } from 'react-excel-renderer';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import http from '../../http-common';
const Transaction = () => {
    const [Data, setData] = useState([]);

    const [send , setSend] = useState([])
    const [btn , setBtn] = useState(false)
    const array = []
    const [connecting, setConnecting] = useState(true);
    const [recherche, setRecherche] = useState('');
    const [succesCreateUser, setSuccesCreateUser] = useState(false);

    const [fileError ,setFileError] = useState(false)
   
    const [currentPage, setCurrentPage] = useState(0);
    const [parPage, setParPage] = useState(10);
     const offset = currentPage * parPage;
    const pageCount = Math.ceil(Data.length / parPage) ;
    function handlePageClick ({selected:selectedPage}) {
       setCurrentPage(selectedPage);
       console.log(selectedPage)
   }
   const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const datas = new Array()
  const fileHandler = (event) => {
      let fileObj = event.target.files[0];
      ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
              console.log(err);
          }
          resp.rows.map(data => {

              const obj = { ...data }

              if (obj[6] === "Succès" && obj[4] === "C2C Transfer" && obj[11] === "627851560") {
                
                      array.push(obj)
              
                  
              }

          })

        

          setSend(array)

      });

  }


  const ajouter = () => {
      
       
         const  datas = {

               data:send
         }

          http.post("/transaction/create", datas,header)
             //.post("http://localhost:4000/transaction/create", datas,header)
              .then(res => {
                  setData(res.data.transaction)
                  setConnecting(false)
                   console.log(res)
                   setBtn(true)
              }).catch(error => {
                  setFileError(true)
                 
                 
                  console.log(error.response)
              })

      

    

     
  }


       
    return (
        <div className='transaction'>
            <Header />
            <Slide />

           

                <div className="col-md-10">
                    <div className="container mt-5">
                        <h1 className="titleContent mt-2 pb-3 mb-3"><i className="fa fa-refresh"></i> Transactions</h1>
                        <div className='row fileInput mt-4 mb-4 '>
                                <div className="col-md-9"><input className='form-control custom-file-input' type="file" onChange={fileHandler}  /></div>
                                <div className="col-md-3"><button onClick={ajouter} className='btn btnAjout'> <i className='fa fa-plus-circle'></i>  Ajouter</button></div>
                            </div>


                    {fileError === true ? <div className='alert alert-danger mt-2 text-center'>  <i class="fa fa-user"></i> Ce fichier a été déjà importer.</div> : ''}
                    {succesCreateUser === true ? <div className='alert alert-success mt-2 text-center'>  <i class="fa fa-user"></i> Fichier importer  avec succès.</div> : ''}

                        <div className='container'>

                        <div className="bg-dark mb-3 mt-5 text-white text-center p-2">
                            <i className="fa fa-rectangle-list"></i> Listes de vos transactions
                        </div>
                            <div className='tableData'>

                                <table className="table table-striped" id='tableContent' >
                        
                                    <thead>
                                        <tr>
                                            <th className='fw-normal text-danger'>  Client </th>
                                             <th className='fw-normal text-danger'>  PDV </th>
                                            <th className='fw-normal text-danger'>  Type </th>
                                            <th className='fw-normal text-danger'>  Montant </th>
                                            <th className='fw-normal text-danger'>  Date Transaction </th>
                                            <th className='fw-normal text-danger'>  Heure Transaction </th>
                                           
                                        </tr>
                                    </thead>

                                    <tbody className='bg-light'>
                                        
                                            {
                        
                                        Data.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className='text-center text-muted'> Pas de correpondance !</td>
                                                    </tr>
                                                ) : (
                                                    Data
                                                        .slice(offset, offset + parPage)
                                                        .filter((transaction, i) => {
                                                            if (recherche === "") {
                                                                return transaction
                                                            } else if (transaction.client.prenom.toLowerCase().includes(recherche.toLowerCase())) {
                                                                return transaction
                                                            }
                                                        })
                                                        .map((transaction) => (
                                                            <tr key={transaction.pdv}>
                
                                                                <td>{transaction.client.prenom}</td>
                                                                <td>{transaction.pdv}</td>
                                                                <td>{transaction.type}</td>
                                                                <td>{transaction.montant}</td>
                                                                <td>{transaction.datetransaction}</td>
                                                                <td>{transaction.heuretransaction}</td>
                                                             
                                                            </tr>
                                                        ))
                                                )

                                            }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>



                        
                    </div>


                    {<div className="row m-4 footTable">
                       
                        <div className="col-md-4 mx-auto">
                            <ReactPaginate 
                                breakLabel="..."
                                nextLabel="Suivant"
                                previousLabel="Précédent"
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                            />
                        </div>

                    </div> }

     { connecting  && btn ?
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
       : ''
       }
                </div>
        </div>
    );
};

export default Transaction;