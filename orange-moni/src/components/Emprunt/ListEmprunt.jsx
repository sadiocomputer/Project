import React from 'react';

import axios from 'axios';
import NumberFormat from 'react-number-format';

import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import http from '../../http-common';

class ListEmprunt extends React.Component {


  constructor(props) {

    super(props)

    this.state = {

      Data: [],
      DataVersement: [],
      montant: '',
      date: '',
      client: 0,
      input: false,
      succesCreate: false,
      redirec: false
    }

    this.ajouter = this.ajouter.bind(this)
  }


  deleteEmprunt = (id) => {
    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }

    }
    let dialog = window.confirm("voulez-vous supprimé")

    if (dialog) {
      http.delete(`/emprunt/delete/${id}`,header)
        .then(res => {
          alert('versement supprimer avec succè')
          window.location.reload()
        }).catch(error => {
          console.log(error.response.data)

        })
    }

  }
  ajouter(event) {
    event.preventDefault()

    const data = {

      montant: parseFloat(this.state.montant),
      date: this.state.date,
      clientid: parseInt(this.state.client)
    }

    if (this.state.montant && this.state.client && this.state.date) {

      let header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      }

      http.post("/emprunt/create", data,header)
        .then(res => {
          console.log(res)

          this.setState({ succesCreate: true })

          document.getElementById("exampleModal").classList.remove("show");

          window.location.reload()
        }).catch(error => {

          console.log(error.response.data)

        })



    }


    this.setState({ input: true })
  }


  componentDidMount() {

    let header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }

    }
    const dataClient = http
      .get("/client/getAlls",header)
      .then(res => {

        this.setState({ Data: res.data.Clients })

      })


    const dataVersement = http
      .get("/emprunt/getAlls",header)
      .then(res => {

        this.setState({ DataVersement: res.data.emprunts })

      })

      .catch((error) => {

      })


  }


  render() {

    return (
      <div className='listversement'>
            <div className="bg-dark mb-3 text-white text-center p-2">
                <i className="fa fa-rectangle-list"></i> Liste des emprunts
            </div>
        <div className="container">

          < div className='headerVersement d-flex justify-content-between align-items-center'>
            <div>
              <button type="button" className="btn btnaddVersement" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat"> <i className="fa fa-plus-circle"></i> Faire un emprunt</button>
              <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel"> <i className="fa fa-plus-circle"></i> Ajouter un emprunt</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      {this.state.succesCreate ? <div className='alert alert-info col-md-6 mx-auto text-center'>Opération effectué avec succès</div> : ''}

                      <form>
                        <div className="row">

                          <div className="col-md-6 mx-auto">
                            <label className="form-label fw-bold">Client</label>
                            <select onChange={e => this.setState({ client: e.target.value })} name="data" className={`form-select ${this.state.input === true && this.state.client === 0 ? "is-invalid" : " "}`} id="">
                              <option >Selectionner</option>
                              {this.state.Data.map((option) => (
                                <option key={option.pdv} value={option.id} >{option.prenom + ' ' + option.nom}</option>
                              ))}
                            </select>
                          </div>


                        </div>

                        <div className="row mt-3 mb-3">

                          <div className="col-md-6 mx-auto">
                            <label className="form-label fw-bold">Montant</label>
                            <input onChange={e => this.setState({ montant: e.target.value })} type="number" className={`form-control ${this.state.input === true && this.state.montant.trim().length === 0 ? "is-invalid" : " "}`} placeholder="Montant" aria-label="First name" />
                          </div>

                        </div>


                        <div className="row mt-3 mb-3">

                          <div className="col-md-6 mx-auto">
                            <label className="form-label fw-bold">Date</label>
                            <input onChange={e => this.setState({ date: e.target.value })} type="date" className={`form-control ${this.state.input === true && this.state.date.trim().length === 0 ? "is-invalid" : " "}`} placeholder="Montant" aria-label="First name" />
                          </div>

                        </div>


                      </form>

                    </div>
                    <div className="modal-footer">
                      <button type="button" onClick={this.ajouter} className="btn btn-primary">Ajouter</button>
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className='d-flex headerExport'>

              <form className="d-flex">
                  <div className="search-box">
                      <button onClick={(e=>e.preventDefault())} className="btn-search"><i className="fas fa-search"></i></button>
                      <input type="text" className="input-search" onChange={e=>this.state.recherche(e.target.value)} placeholder="Rechercher" />
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

          <table className="table table-striped" id='tableContent' >
            <thead>
              <tr>
                <th className='fw-normal text-danger'>  Nom  </th>
                <th className='fw-normal text-danger'>  Prénom  </th>
                <th className='fw-normal text-danger'>  Montant </th>
                <th className='fw-normal text-danger'>  Date </th>
                <th className='fw-normal text-danger'>  Options</th>
              </tr>
            </thead>

            <tbody>

              {

                this.state.DataVersement.length === 0 ? 
                <tr>
                  <td colSpan="6"> Pas d'emprunt !</td>
                </tr>

                :
                this.state.DataVersement

                  .map((v) => (
                    <tr key={v.id}>
                      <td>{v.client.nom}</td>
                      <td>{v.client.prenom}</td>
                      <td>  <NumberFormat
                        value={v.montantemprunt}
                        thousandSeparator
                        suffix='GNF'
                        displayType='text'
                        className="text-danger"
                      />  </td>
                      <td>{v.dateversement}</td>
                      <td>
                        <div className='btnAction'>
                          <button><i className="edit fa fa-edit fa-1x"></i> </button>
                          <button onClick={() => this.deleteEmprunt(v.id)}><i className="del fa fa-trash fa-1x"></i> </button>

                        </div>
                      </td>
                    </tr>
                  ))

              }



            </tbody>
          </table>


        </div>



      </div>
    );
  };

};
export default ListEmprunt;