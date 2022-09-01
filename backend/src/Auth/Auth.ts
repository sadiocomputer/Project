import jwt from 'jsonwebtoken'
import { config } from '../config';
import { User } from '../entities/User';
export const auth = async (req: any, res: any, next: any) => {

    const authHeader = req.get('Authorization');

    if (!authHeader) {

       return res.status(404).json({message:"not header content"})
        next();
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === '') {

      
        return res.status(402).json({ message: "token required" })
         next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.key)
    } catch (error) {

      
      return  res.status(404).json({ tokenError: 'bad token'})
         next();
    }


    if (!decodedToken) {

       return res.status(404).json({ message: " invalid token " })
       
         next();
    }


   

    
    req.user = decodedToken;

    const userfind = await User.findOne({ where: { identifiant: req.user.identifiant } })
    
   /* if(userfind?.role!=='admin') {

       return res.status(401).json({message:'your are not authaurizid to access this ressource'});
    }
*/
    req.identifiant = decodedToken;
    next()
    
}


export const UserAuth = (req:any , res:any , next:any) => {


    const authHeader = req.get('Authorization');

    if (!authHeader) {

        return res.status(404).json({ message: "not header content" })
        next();
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === '') {


        return res.status(402).json({ message: "token required" })
        next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.key)
    } catch (error) {


        return res.status(404).json({ message: "bad token ", token: "error" })
        next();
    }
    if (!decodedToken) {

        return res.status(404).json({ message: " invalid token " })

        next();
    }
    req.identifiant = decodedToken;
    next()

}

