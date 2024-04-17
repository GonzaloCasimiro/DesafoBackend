/*
export const productSocket=(socketServer)=>{
    return(req,res,next)=>{
        req.socketServer=socketServer
        return next()
    }
}
*/
const productsSocket=(socketServer)=>{
    return(req,res,next)=>{
        req.socketServer=socketServer
        return next()
    }
}

module.exports = {productsSocket}