import { json } from "body-parser";
import { Client } from "../entities/Client";
import { Emprunt } from "../entities/Emprunt";
import { Versement } from "../entities/Versement";

export const creatEmprunt = async (req: any, res: any) => {


    const { montant, clientid, date } = req.body;

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


    Emprunt.insert({

        montantemprunt: montant,
        client: client,
        dateemprunt: newDate

    })

    const newSolde = c1.solde - montant


    Client.update({ id: c1.id }, { solde: newSolde })


    return res.status(201).json({ message: 'opération effectuer avec succès ' })


}


export const emprunts = async (req: any, res: any) => {

    const date = new Date()
/*
    let DateNow = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
*/
    const emprunts = await Emprunt.find({  take:20,skip:0, order: { id: 'DESC' }, relations: ["client"] });

    return res.status(200).json({ emprunts: emprunts })
}


export const deleteEmprunts = async (req: any, res: any) => {

    let id = req.params.id

    const emprunt = await Emprunt.findOne({ where: { id: id }, relations: ["client"] })

    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }

    if (!emprunt) {

        return res.status(404).json({ message: 'versements not found' });
    }

    await Emprunt.delete(id)

    const newSolde = emprunt.client.solde + emprunt.montantemprunt

    Client.update({ id: emprunt.client.id }, { solde: newSolde })

    return res.status(200).json({ message: 'emprunt supprimer' });
}


export const updateEmprunt = async (req: any, res: any) => {

    const { montant, clientid, date } = req.body;

    let id: number = req.params.id

    let solde:number = 0
    const emprunts = await Emprunt.findOne({ where: { id: id } })
    const c1 = await Client.findOne({ where: { id: clientid } });

    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }

    if (!emprunts) {

        return res.status(404).json({ message: 'versements not found' });
    }



    const client = new Client()

    client.id = c1?.id || 0
     solde = c1?.solde || 0

    Emprunt.update({ id }, { montantemprunt: montant, client: client, dateemprunt: date })

   let  oldSolde = await ((c1?.solde || 0) + (emprunts.montantemprunt))


    await Client.update({ id: c1?.id }, { solde: oldSolde })


    let newSolde = await oldSolde + montant

    await Client.update({ id: c1?.id }, { solde: newSolde })

    return res.status(200).json({ message: "  updated " })


}


export const emprunt = async (req: any, res: any) => {

    let id = req.params.id


    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }
    const emprunt = await Emprunt.findOne({ where: { id: id } })


    if (!emprunt) {

        return res.status(404).json({ message: 'vnot found' });
    }

    return res.status(200).json({ Emprunts: emprunt })
}