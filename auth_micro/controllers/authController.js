import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../configs/dbConfig.js';

class AuthController {
    static async register(req, res) {
        try {
            const payload = req.body;
            const salt = bcrypt.genSaltSync(10)
            payload.password = bcrypt.hashSync(payload.password, salt)
            
            const user = await prisma.user.create({
                data : payload
            })
            return res.status(201).json({
                status : true,
                message : "Account created successfully",
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                status : false,
                message : error.message
            })
        }
    }

    static async login(req, res){
       try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({
            where: { email : email}
        })
        if(user){
           if(!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({
                status : false,
                message : "Invalid credential"
            })
           }
           const payload = {
            id : user.id,
            name : user.name,
            email: user.email 
           
        }
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '10m'})
            return res.status(200).json({
            status : true,
            message : "Login successfully",
            data : user.name,
            token: token
           })
        }
        return res.status(401).json({
            status : false,
            message : "Invalid credential"
        })
       } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
       }
    }
    
    static async user(req, res){
       
        const user = req.user;
        return res.status(200).json({
            user: user
        })
    }
}

export default AuthController;