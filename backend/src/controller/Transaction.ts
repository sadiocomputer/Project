import bodyParser, { json } from "body-parser";
import { Double, getManager, getRepository } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";

export const creatTransaction = async (req: any, res: any) => {
  let type: string = "";
  let pdv: string = "";
  let pdv1: string = "";
  let montant: number = 0;
  let date: string = " ";
  let str: string;

 

  let newSolde = 0;

  let dt = [];

  const { data } = req.body;

  str = data[0][1];

  const clients = await Client.find();

  const isExiste = await Transaction.findOne({
    where: { datetransaction: str },
  });

  if (isExiste) {
    return res.status(409).json({ message: "date all ready existe" });
  }

  for (let j = 0; j < clients.length; j++) {
      let solde: number = 0;
      let sommeap: number = 0;
      let sommeret: number = 0;
      const c1 = await getManager()
        .getRepository(Client)
        .findOne({ where: { id: clients[j].id } });

      const client = new Client();

      client.id = c1?.id || 0;

      pdv1 = clients[j].pdv;

      for (let i = 0; i < data.length; i++) {
        if (data[i][8] === pdv1) {
          pdv = data[i][8];

          if (data[i][14] && data[i][14] !== 0 && !data[i][13]) {
            montant = data[i][14];
            sommeap = sommeap + montant;
            await Transaction.insert({
              pdv: pdv1,
              type: "approvisionnement",
              client: client,
              montant: montant,
              heuretransaction: data[i][2],
              datetransaction: data[i][1],
            });
          }

          if (data[i][13] && data[i][13] !== 0 && !data[i][14]) {
            montant = data[i][13];

            sommeret = sommeret + montant;
            await Transaction.insert({
              pdv: pdv1,
              type: "retour",
              client: client,
              montant: montant,
              heuretransaction: data[i][2],
              datetransaction: data[i][1],
            });
          }

          solde = sommeret - sommeap;
      }

    }
      if(solde !== 0) {
         
        newSolde = (await (c1?.solde || 0)) + solde;
    
        Client.update({ id: c1?.id }, { solde: newSolde });
      }

    
    
   
  }

  const transaction = await Transaction.find({
    where: { datetransaction: str },
    order: { id: "DESC" },
    relations: ["client"],
  });

  return res.status(200).json({ transaction: transaction, date: str });
};

export const transactions = async (req: any, res: any) => {
  const transaction = await Transaction.find({
    order: { id: "DESC" },
    relations: ["client"],
  });

  return res.status(200).json({ transaction: transaction });
};

export const deleteTransaction = async (req: any, res: any) => {
  let id = req.params.id;

  const transaction = await Transaction.findOne({ where: { id: id } });

  if (!id) {
    return res.status(422).json({ message: "identifiant required " });
  }

  if (!transaction) {
    return res.status(404).json({ message: "client not found" });
  }

  await Transaction.delete(id);

  return res.status(200).json({ message: "client deleted " });
};

export const Testdelete = async (req: any, res: any) => {
  let id = req.params.id;

  for (let i = 0; i <= id; i++) {
    await Transaction.delete(i);
  }

  return res.status(200).json({ message: "client deleted " });
};


export const putSolde = async(req:any, res:any) =>{

      const find = await Client.find() 

      find.map((s)=>{

          Client.update({id:s.id},{solde:0})
      })

      return res.status(200).json({mesaage:'ok'})
}
