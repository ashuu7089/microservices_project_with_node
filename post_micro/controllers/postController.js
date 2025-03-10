import prisma from '../configs/dbConfig.js'
class PostController {
    static async index(req, res){
        try {
           const post = await prisma.post.findMany({}) 

            return res.status(200).json({
                status : true,
                message : "Post Retrieved successfully",
                data :post
            })
        } catch (error) {
            return res.status(500).json({
                status :false,
                error: error.error
            })
        }
    }
    static async store(req, res) {
        try {
            const authUser = req.user;
        const {title, content} = req.body;
        const post = await prisma.post.create({
            data:{
                user_id : authUser.id,
                title,
                content
            }
        })
         return res.status(201).json({
            status : true,
            message : "Post created successfully",
            data : data
         })
        } catch (error) {
            return res.status(500).json({
                status :false,
                error: error.error
            }) 
        }
        
    }
}

export default PostController