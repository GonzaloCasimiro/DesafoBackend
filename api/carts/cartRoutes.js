const {Router} = require('express')
const cartRouter=Router();
const CarManager=require('../../CarManager');
const carManager=new CarManager("cars.json");

cartRouter.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const {cid,pid}=req.params;  
        const results=await carManager.addProduct(parseInt(cid),parseInt(pid));
        console.log(results);
        res.send(results);
    } catch (error) {
            res.send(error)
    }
})
cartRouter.put('/:cid/product/:pid',async(req,res)=>{
    try {
        const {cid,pid}=req.params;
        const results=await carManager.removeProduct(parseInt(cid),parseInt(pid));
        console.log(results)
        res.send(results)
    } catch (error) {
        res.send(error);
    }
    
})
cartRouter.get('/:cid',async(req,res)=>{
    try {
        const {cid}=req.params;
        const results=await carManager.getCart(parseInt(cid))
        console.log(results)
        res.send(results)
    } catch (error) {
        res.send(error);
    }
})
cartRouter.post('/',async(req,res)=>{
    try {
        const results=await carManager.createCart();
        res.send(results)
    } catch (error) {
        res.send(error);
    }
})



module.exports = cartRouter