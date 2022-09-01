import bcrypt from "bcrypt"
import { json } from "body-parser";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../entities/User";

export const login = async (req:any,res:any) => {

      const {identifiant, password } = req.body;
    

        if (!identifiant) {

            res.status(422).send({ message: 'erreur identifiant required' , indentifiant:'identifiant'});
        }

        if (!password) {

            res.status(422).send({ message: 'erreur password required' , password:'password'});
        }


        const user = await User.findOne({where:{identifiant:identifiant}})

         if(!user) {

             return res.status(404).json({message:'identifiant not found' , identifiant:'identifiant'})
         }


         const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
        
            return res.status(401).json({ message: 'bad credential ' , password:'password' })

        }

        if(user.isActive==false) {

            return res.status(401).json({message:"votre compte est desactiver veillez consulter votre administrateur"})
        }
 
        try {


            const token = jwt.sign({identifiant},config.key, {
               // expiresIn: "24h",
            })

           return res.status(200).json({token:token})

        } catch (error) {

            console.log(error)
        }
     

}


export const creatUser = async (req:any,res:any) => {

    // let id = req.identifiant

   // const user = await User.findOne({ where: { identifiant: id.identifiant } })

    /* if(user?.role !== 'admin') {

         return res.status(401).json({message:"you are not authorized to access this resource"})
     }
     */ 
    const {identifiant, password, nom, prenom } = req.body ;

        if(!identifiant) {

            res.status(422).send({message:'erreur identifiant required'});
        }
        
        if(!password) {

            res.status(422).send({ message: 'erreur password required' });
        }

        const userFind = await User.findOne({ where: {identifiant:identifiant}}) ; 

        if (userFind) {

            res.status(409).send({ message: 'user all ready exist' })
        }

        else{
                const hash = await bcrypt.hash(password, 12);
                User.insert({

                    identifiant: identifiant,
                    password: hash,
                    role: 'user',
                    nom:nom,
                    prenom:prenom,
                    isActive:true
                })


                res.status(201).send({ message: ' user create succesful ' })
        }
       

}


export const activeUserOrDesable = async(req:any,res:any) =>  {

          const [id , checked] = req.body

        if(!id) {

            return res.status(422).json({message:"identifiant required "})
        }

        const findUser = await User.findOne({where:{id:id}})

        if(!findUser) {

            return res.status(404).json({ message: 'identifiant not found' });
        }

        if(checked== true) {

            User.update({ id }, { isActive: true });
        }

        User.update({ id }, { isActive: false });
      

        return res.status(200).json({message:"user desabled succesful"});

}

/*
export const activeUser = async (req: any, res: any) => {

        let id = req.params.id;

        if (!id) {

            return res.status(422).json({ message: "id required " })
        }

        const findUser = await User.findOne({ where: { id: id } })

        if (!findUser) {

            return res.status(404).json({ message: 'id not found' });
        }

        User.update({ id }, { isActive: true });

        return res.status(200).json({ message: "user enable succesful" });

}

*/
export const resetPassword = async(req:any,res:any) => {

       let id = req.params.id

        const {newpassword} = req.body;

        const findUser = await User.findOne({ where: {id:id } })

        if (!findUser) {

            return res.status(404).json({ message: 'id not found' });
        }

        if(findUser.role ==='admin')  {

            return res.status(303).json({message:'error'});
        }

        const hash = await bcrypt.hash(newpassword,12);

        User.update({id},{password:hash})

        return res.status(200).json({message:"password changed succesful"});

}


export const users = async  (req:any,res:any) => {

         const Users = await User.find({skip:1 , take:2});

         return res.status(200).json({User:Users})
}


export const user = async (req:any,res:any) => {

     let id = req.params.id ;

     const user = await User.findOne({ where: { id: id } })

    if (!id) {

        return res.status(422).json({ message: "identifiant required " })
    }

    if (!user) {

        return res.status(404).json({ message: 'id not found' });
    }

    return res.status(200).json({user:user})


}

export const IsTokenValid = async (req:any, res:any) => {

       let identifiant = req.identifiant;
     
       const user = await User.findOne({where : {identifiant:identifiant.identifiant}})

       return res.status(200).json({name:user?.nom, role:user?.role})

} 


export const MakeAdmin = async(req:any , res:any) => {

    let identifiant = req.identifiant;

    const user = await User.findOne({ where: { identifiant: identifiant.identifiant } })

    let id = user?.id;

    User.update({id},{role:'admin'})

    return res.status(200).json({message:"role updated"})

}

