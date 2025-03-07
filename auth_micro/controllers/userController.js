import prisma from "../configs/dbConfig.js";

class UserController {
    static async getUser(req, res){
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where : {id : id}
        })
        return res.status(200).json({
            status : true,
            message : "User details",
            data : user
        })
    }
}

export default UserController