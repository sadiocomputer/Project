import { Emprunt } from "../entities/Emprunt";
import { Transaction } from "../entities/Transaction";
import { Client } from "../entities/Client";
import { Versement } from "../entities/Versement";
import { Between } from "typeorm";


export const inventaire = async (req: any, res: any) => {

    let id = req.params.id

    const date = new Date()

    let DateNow = date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })

    const client = await Client.findOne({ where: { id: id } })
    const transactions = await Transaction.find({ where: { client: { id: id } }, order: { id: 'DESC' } , take:10 });

    const versement = await Versement.find({ where: { client: { id: id } }, order: { id: 'DESC' }, take: 10
})
    const emprunt = await Emprunt.find({ where: { client: { id: id } }, order: { id: 'DESC' } , take: 10 })

    return res.status(200).json({ Data: [...transactions , ...versement , ...emprunt] , client:client, date: DateNow })


}

export const findWithDate = async (req: any, res: any) => {

    const {dateDebut, dateFin,id} = req.body

    let newDateDebut = dateDebut.split('-').reverse().join('/')

    let newDateFin = dateFin.split('-').reverse().join('/')

  
    const client = await Client.findOne({ where: { id: id } })
    const transactions = await Transaction.find({ where: { client: { id: id } , datetransaction:Between(newDateDebut,newDateFin)}, order: { id: 'DESC' } , take:10 });

    const versement = await Versement.find({ where: { client: { id: id } ,dateversement:Between(newDateDebut,newDateFin) }, order: { id: 'DESC' }, take: 10
})
    const emprunt = await Emprunt.find({ where: { client: { id: id } ,dateemprunt:Between(newDateDebut,newDateFin)}, order: { id: 'DESC' } , take: 10 })

    return res.status(200).json({ Data: [...transactions , ...versement , ...emprunt]  })


}