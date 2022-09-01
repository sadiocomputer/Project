import express from "express";
import { auth } from "./Auth/Auth";
import { UserAuth } from "./Auth/Auth";
import { activeUserOrDesable, creatUser, IsTokenValid, login, MakeAdmin, resetPassword, user, users } from "./controller/User";
import { client, clients, creatClient, deleteClient, updateClient } from "./controller/Client";
import { creatTransaction, deleteTransaction, putSolde, Testdelete, transactions } from "./controller/Transaction";
import { creatVersement, deleteVersements, updateVersement, versement, versements } from "./controller/Versement";
import { creatEmprunt, deleteEmprunts, emprunt, emprunts, updateEmprunt } from "./controller/Emprunt";
import { findWithDate, inventaire } from "./controller/Inventaire";
const router = express.Router();

/////////////////////////////////////////////////
   /* This route is accessible for admin */

 ////////////////////////////////////////////////
router.post('/user/create',creatUser)
router.post('/user/login',login)
/////////////////////////////////////////////////

router.get('/user/getAlls',auth,users)
router.get('/user/getOne/:id',auth,user)

router.post('/user/isActive',auth, activeUserOrDesable)

router.put('/user/reset/:id',auth,resetPassword)
//////////////////////////////////////////////////

router.get('/user/isTokenValid', auth,IsTokenValid)

router.get('/user/admin',auth,MakeAdmin)

/////////////////////////////////////////////////
 /*  This route is accessible for admin or Users */
//////////////////////////////////////////////////
            //66 client
/////////////////////////////////////////////
router.post('/client/create',auth,creatClient)

router.get('/client/getAlls',auth,clients)

router.delete('/client/delete/:id',auth,deleteClient)

router.put('/client/update/:id',auth,updateClient)

router.get('/client/getOne/:id',auth,client)
//////////////////////////////////////////////////
      //        transactions
///////////////////////////////////////////////// 
router.post('/transaction/create/',auth,creatTransaction)

router.get('/transaction/getAlls',auth,transactions)

router.delete('/transaction/delete/:id',auth,deleteTransaction)

router.get('/transaction/deletetest/:id', Testdelete)
router.get('/putsold',putSolde)
///////////////////////////////////////////////////////

 //            versement route
///////////////////////////////////////////////////////
router.post('/versement/create',auth ,creatVersement)

router.get('/versement/getAlls',auth, versements)

router.delete('/versement/delete/:id',auth,deleteVersements)

router.get('/versement/getOne/:id',auth, versement)

router.put('/versement/update/:id',auth, updateVersement)

//////////////////////////////////////////////////////



//            versement route
///////////////////////////////////////////////////////
router.post('/emprunt/create',auth, creatEmprunt)

router.get('/emprunt/getAlls',auth, emprunts)

router.delete('/emprunt/delete/:id',auth, deleteEmprunts)

router.get('/emprunt/getOne/:id',auth, emprunt)

router.put('/emprunt/update/:id',auth, updateEmprunt)

/////////////////////////////////////////////////

router.get('/inventaire/getClient/:id',auth, inventaire)
router.post('/inventaire/findDate',auth,findWithDate)


export default router;