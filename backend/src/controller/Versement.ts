import { json } from "body-parser";
import { Client } from "../entities/Client";
import { Versement } from "../entities/Versement";

export const creatVersement = async (req: any, res: any) => {


    const { montant , clientid , date } = req.body;

    !montant ? res.status(422).json({ massage: "montant required" }) : ''
    !clientid ? res.status(422).json({ massage: "client require required" }) : ''
    !date ? res.status(422).json({ massage: " date require required" }) : ''

    var newDate = date.split('-').reverse().join('/')

   

    const c1 = await Client.findOne({ where: { id: clientid } });

    if (!c1) {

        return res.status(404).json({ message: 'not found client' })
    }

    const client = new Client()

    client.id = c1?.id || 0


        Versement.insert({

            montantverser:montant,
            client: client,
            dateversement:newDate

        })

        const newSolde = c1.solde + montant


       await Client.update({id:c1.id},{solde:newSolde})


    

      return  res.status(201).json({ message: 'Versement effectuer avec succès ' })
    

}


export const versements = async (req: any, res: any) => {

       const date =  new Date()
    /* 
    let DateNow = date.toLocaleDateString("en-GB", { 
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
       
    */
    //console.log(req.ip.split(':'))
    const versements = await Versement.find({ take:20,skip:0, order: { id: 'DESC' } ,relations: ["client"] });

    return res.status(200).json({ versements: versements })
}


export const deleteVersements  = async (req: any, res: any) => {

    let id = req.params.id

    const versements = await Versement.findOne({ where: { id: id }, relations: ["client"] })

    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }

    if (!versements) {

        return res.status(404).json({ message: 'versements not found' });
    }

     await Versement.delete(id)

    const newSolde = versements.client.solde - versements.montantverser

       Client.update({id:versements.client.id},{solde: newSolde})

    return res.status(200).json({ message: 'versement supprimer' });
}


export const updateVersement = async (req: any, res: any) => {

    const { montant, clientid, date } = req.body;

    let id:number = req.params.id


    const versements = await Versement.findOne({ where: { id: id } })
    const c1 = await Client.findOne({ where: { id: clientid } });

    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }

    if (!versements) {

        return res.status(404).json({ message: 'versements not found' });
    }



    const client = new Client()

    client.id = c1?.id || 0


   await  Versement.update({ id }, { montantverser:montant, client:client  , dateversement:date})

    let oldSolde

        oldSolde = await ((c1?.solde || 0) - (versements.montantverser))


    await Client.update({id:c1?.id},{solde:oldSolde})
     

     let newSolde = await oldSolde  + montant

     await Client.update({ id: c1?.id }, { solde: newSolde })
    
    return res.status(200).json({ message: 'updated' });
}


export const versement = async (req: any, res: any) => {

    let id = req.params.id

    
    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }
    const versements = await Versement.findOne({ where: { id: id } })
   

    if (!versements) {

        return res.status(404).json({ message: 'versement not found' });
    }

    return res.status(200).json({ Versements: versements })
}