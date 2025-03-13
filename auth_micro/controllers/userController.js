import prisma from "../configs/dbConfig.js";

class UserController {
    static async getUser(req, res){
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where : {id : id},
                select :{
                    id:true,
                    name:true,
                    email:true
                }
            
        })
        return res.status(200).json({
            status : true,
            message : "User details",
            data : user
        })
    }
    static async getUsers(req, res){
        const {userIds} = req.body;
        const users = await prisma.user.findMany({
            where :{ id:{
                in:userIds
            }},
            select:{
                id:true,
                name:true,
                email:true
            }
        })
       
        return res.status(200).json({users
           
        })
        
    }
}

export default UserController