export const verifyUser = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                res.status(401).json({message: "Unauthorized"})
            }
            req.user = user;
            next();
    })
}