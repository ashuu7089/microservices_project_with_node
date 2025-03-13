import prisma from '../configs/dbConfig.js'
import axios from 'axios';
class PostController {
    static async index(req, res){
        try {
           const posts = await prisma.post.findMany({}) 
        
            //  Method -1 
            // let postWithUser = await Promise.all(
            //     posts.map(async (post)=> {
            //         const res = await axios.get(`${process.env.AUTH_MICRO_URL}/api/user/get_user/${post.user_id}`)
            //         return {
            //             ...post,
            //             ...res.data
            //         }
            //     })
            // )

            // Method -2=================================2========

            /*let userIds =[]
            posts.map((data)=> userIds.push(data.user_id))

            const fetchUser = await axios.post(`${process.env.AUTH_MICRO_URL}/api/user/getUsers`, userIds)

            const usersData = fetchUser.data.users;

            let postWithUser = await Promise.all(
                posts.map((post)=>{
                    const user = usersData.find((item)=> item.id ===post.user_id)
                    return {
                        ...post,
                        user,
                    }
                })
            )
         */
          
        // Method -3 
        let userIds =[]
        posts.map((data)=> userIds.push(data.user_id))
        const fetchUser = await axios.post(`${process.env.AUTH_MICRO_URL}/api/user/getUsers`, userIds)
        const users ={}
        fetchUser.data.users.map((item)=>{
            users[item.id] = item;
        })

        let postWithUser = await Promise.all(
            posts.map((post)=>{
                const user = users[post.user_id]
                return {
                    ...post,
                    user
                }
            })
            
        )
            return res.status(200).json({
                status : true,
                message : "Post Retrieved successfully",
                data :postWithUser,
                // posts
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status :false,
                message: error.message
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
            data : post
         })
        } catch (error) {
            return res.status(500).json({
                status :false,
                message: error.message
            }) 
        }
        
    }
}

export default PostController