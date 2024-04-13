
const {Router} = require('express')
const productRouter=Router();
const ProductManager=require('../../ProductManager')
const nuevoProductManager=new ProductManager('productos.json');


productRouter.get('/',async(req,res)=>{
    try {
        
        const{limits}=req.query;
        const products=await nuevoProductManager.getProducts();
        console.log(products)
        if(!limits){res.render('index',{products:products})}else{
        const limitedProducts=products.slice(0,parseInt(limits))
        res.render('index',{products:limitedProducts})
    }
    } catch (error) {
        res.send(error)
    }

})
productRouter.get('/:pid',async(req,res)=>{
    const pid=req.params.pid
    try {
        const product=await nuevoProductManager.getProductsById(parseInt(pid))
        res.send(product)
    } catch (error) {
        res.send(error);
    }
});
productRouter.put('/:pid',async(req,res)=>{
    const {pid}=req.params;
    console.log(pid)
    const objeto=req.body
    try {
        const product=await nuevoProductManager.getProductsById(parseInt(pid));
        if(product===null){
            res.send('NO EXISTE PRODUCTO CON ESE ID');
        }else {
            if(objeto.id!==undefined)objeto.id=product.id;
            const productUpdated=await nuevoProductManager.updateProduct(parseInt(pid),objeto)
            res.send(productUpdated)
        }
        
    } catch (error) {
        res.send(error)
    }
})
productRouter.post('/',async(req,res)=>{
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

productRouter.delete('/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        console.log(pid);
        const productToDelete= await nuevoProductManager.deleteProduct(parseInt(pid));
        res.send(productToDelete)
    } catch (error) {
        res.send(error);
    }
})

module.exports =productRouter




/*productRouter.get('/realTimeProducts',async(req,res)=>{
    try {
        const products=await nuevoProductManager.getProducts();
        res.render('realTimeProducts',{products:products});
    } catch (error) {
        res.send(error)
    }
})*/