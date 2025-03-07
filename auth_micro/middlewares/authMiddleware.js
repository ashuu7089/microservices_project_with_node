import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res, next) =>{
    try {
        const authHeader = req.headers.authorization;
        if(authHeader === null || authHeader === undefined){
            return res.status(401).json({
                status : false,
                message : "Unauthorized"
            })
        }
        const token = authHeader.split(" ")[1]
        // console.log(token, "token");
        jwt.verify(token, process.env.SECRET_KEY, (err, payload)=>{
            if(err){
                return res.status(401).json({
                    status : false,
                    message : "Unauthorized"
                })
            }
            
            req.user = payload;
            next()
        })
    } catch (error) {
        return res.send(error)
    }
}
export default authMiddleware;