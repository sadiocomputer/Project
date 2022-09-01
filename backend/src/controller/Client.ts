import { json } from "body-parser";
import { Client } from "../entities/Client";

export const creatClient = async (req:any,res:any)=>{


       const {pdv,nom,prenom,telephone,adresse,solde} = req.body;
       
        !pdv ? res.status(422).json({massage:"pdv required"}): ''
        !nom ? res.status(422).json({ massage: "nom required" }) : ''
        !prenom ? res.status(422).json({ massage: "prenom required" }) : ''    
      
        !telephone ? res.status(422).json({ massage: "telephone required" }) : '' 
        !adresse ? res.status(422).json({ massage: "adresse required" }) : ''
      

        const client = await Client.findOne({ where: { pdv: pdv } });

        if (client) {

              return  res.status(409).json({ message: 'client all ready existe' })
        }

        else {
               
                Client.insert({

                        nom: nom,
                        prenom: prenom,
                        solde: solde,
                        adresse: adresse,
                        telephone: telephone,
                        pdv:pdv
                       
                })

                res.status(201).send({ message: ' client create succesful ' })
        }

}


export const  clients = async (req:any,res:any) => {

        const clients = await Client.find({order:{id:'DESC'}});

        return res.status(200).json({ Clients: clients })
}


export const deleteClient = async(req:any, res:any) =>{

         let id = req.params.id

        const client = await Client.findOne({ where: { id: id } })

        if (!id) {

                return res.status(422).json({ message: "identifiant required " })
        }

        if (!client) {

               return res.status(404).json({ message: 'client not found' });
        }

        await Client.delete(id)

        return res.status(200).json({message:"client deleted "})

}


export const updateClient = async(req:any , res:any) => {

        let id = req.params.id
        const { pdv, nom, prenom, telephone, adresse, solde } = req.body;

        const client = await Client.findOne({ where: { id: id } })

        if (!id) {

                return res.status(422).json({ message: "identifiant required " })
        }

        if (!client) {

                return res.status(404).json({ message: 'client not found' });
        }


        !pdv ? res.status(422).json({ massage: "pdv required" }) : ''
        !nom ? res.status(422).json({ massage: "nom required" }) : ''
        !prenom ? res.status(422).json({ massage: "prenom required" }) : ''
        
        !telephone ? res.status(422).json({ massage: "telephone required" }) : ''
        !adresse ? res.status(422).json({ massage: "adresse required" }) : ''

        Client.update({ id }, { pdv: pdv ,nom:nom, prenom:prenom,telephone:telephone,adresse:adresse,solde:solde })

        
        return res.status(200).json({ message: "client updated " })


}


export const client = async (req: any, res: any) => {

        let id = req.params.id

        const client = await Client.findOne({ where: { id: id } })

        if (!id) {

                return res.status(422).json({ message: "identifiant required " })
        }


        if(!client) {

                return res.status(404).json({ message: 'client not found' });
        }

        return res.status(200).json({ Client: client })
}