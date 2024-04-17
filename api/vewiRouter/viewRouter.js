
const {Router} = require('express')

const viewRouter=Router();


const ProductManager=require('../../ProductManager')
const nuevoProductManager=new ProductManager('productos.json');

viewRouter.get('/',async(req,res)=>{
    try {
        const products=await nuevoProductManager.getProducts();
        res.render('chat',{products:products});
    } catch (error) {
        res.send(error)
    }
})
viewRouter.get('/products',async(req,res)=>{
    try {
        const products=await nuevoProductManager.getProducts();
        res.render('realTimeProducts',{products:products});
    } catch (error) {
        res.send(error)
    }
})
viewRouter.post('/products',async(req,res)=>{
    console.log(req.body);
    try {
        const {title,description,price,thumbnail,code,stock,category}=req.body;
        if(thumbnail===undefined){
        const results=await nuevoProductManager.addProduct(title,description,parseInt(price),parseInt(code),parseInt(stock),category,"#");
        res.send(results)}
        else{
            const results=await nuevoProductManager.addProduct(title,description,parseInt(price),parseInt(code),parseInt(stock),category,thumbnail);
            res.send(results)
        }
    } catch (error) {
        res.send(`${error}`)
    }
})
viewRouter.delete('/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        console.log(pid);
        const productToDelete= await nuevoProductManager.deleteProduct(parseInt(pid));
        res.send(productToDelete)
    } catch (error) {
        res.send(error);
    }
})
viewRouter.get('/indexb',async(req,res)=>{
    try {
        res.render('indexb')
    } catch (error) {
        res.send(error)
    }
})





module.exports =viewRouter