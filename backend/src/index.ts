import express from  "express";
import bodyParser from "body-parser";
import {  createConnection } from "typeorm";
import { User } from "./entities/User";
import router from "./route";
import { auth } from "./Auth/Auth";
import { Client } from "./entities/Client";
import cors from 'cors';
import { Transaction } from "./entities/Transaction";
import { Versement } from "./entities/Versement";
import { Emprunt } from "./entities/Emprunt";
import * as path from 'path';



const main = async () => {
    
    const corsOpts = {
        origin: '*',

        methods: [
            'GET',
            'POST',
        ],

        allowedHeaders: [
            'Content-Type',
        ],
    };

 /*

    await createConnection({

        type: "mysql",
        username: "root",
        database: "orange",
        password: "sadiodiallo",
        logging: false,
        synchronize: true,
       
        entities: [User, Client, Transaction]
    });

    */
    await createConnection({

        type: "mysql",
        host: "localhost",
        port:3306,
        database: "orange",
        username: "root",
        password:"",
        logging: false,
        synchronize: true,
        /*ssl: {
            rejectUnauthorized: false
        },
        */
        entities: [User, Client, Transaction,Versement,Emprunt]
    });

    
    const app = express();

 //const port = process.env.PORT || 8080

   const port = 4000;
    app.use(express.static(path.resolve(__dirname,'../../orange-moni/build')))

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

   
    
    app.use('/',router)

    app.get('*',(req:any,res:any)=>{

        res.sendFile(path.resolve(__dirname,'../../orange-moni/build','index.html'))
   })

    app.listen(port,()=>{

        console.log('listent to port ' , port)
     })
}


main().catch((err) => {

    console.log(err)
})


