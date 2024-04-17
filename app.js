const express = require('express');

const productsRouter =require('./api/products/productsRouter.js') 
const carRouter=require('./api/carts/cartRoutes.js')
const viewRouter=require('./api/vewiRouter/viewRouter.js')
const uploader=require("./multer.js")
const handlebars=require('express-handlebars')
const socket=require('socket.io')
const {Server}=require('socket.io')
const {productsSocket} =require('./utils/productSocket.js')
//import {productsSocket} from './utils/productSocket.js'
//import {__dirname} from './utils/utils.js/          => UTILS.JS // EN CASO DE USAR IMPORT EN VEZ DE REQUIRE
const ProductManager=require('./ProductManager');
const CarManager=require('./CarManager')

const nuevoProductManager=new ProductManager('productos.json');
const carManager=new CarManager("cars.json");
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products',productsRouter);
app.use('/carts',carRouter);
app.use('/chats',viewRouter)
//GUARDAR EN UNA CONSTANTE EL SERVIDOR
const htppServer=app.listen(8080,error=>{
    console.log("Escuchando servidor en puerto 8080");
}).on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });
// CREAMOS SERVER SOCKET PARA EL SERVIDOR
const io=new Server(htppServer)
app.use(productsSocket(io))
app.use('/static', express.static(__dirname+'/public'))//ESTO ES DINAMICO,FUNCIONA EN CUALQUIER FOLDER POR DIRNAME
//app.use(express.static(__dirname+'/public'))
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views');
app.set('view engine','handlebars')

app.get('/',(req,res)=>{
    res.render('index')
})
//app.use(express.static('public'))      => ESTO ES ESTATICO( FUNCIONA SOLO EN MI FOLDER POR CUESTION DE RUTAS)

app.use('/subir-archivo', uploader.single('myFile'),(req,res)=>{
    console.log(res.send)
    if(!req.file){
        return res.send('NO SE PUDO SUBIR EL ARCHIVO')
    }else{
         res.send('archivo subido')
    }
})

/*
io.on ('connection',async socket=>{
 
const listaDeProductos=await nuevoProductManager.readFile();
io.emit('listaDeProductos',listaDeProductos);


io.on('producto_nuevo',nuevoProducto=>{
    listaDeProductos.push(nuevoProducto)
    socketServer.emit('listaDeProductos',listaDeProductos);
})
    
io.on('producto_eliminado',data=>{
    const{pid}=data
    listaDeProductos=listaDeProductos.filter(producto=>producto.id!==pid)
    io.emit('listaDeProductos',listaDeProductos)
})
})
*/
 let messages=[]
io.on('connection',socket=>{
    console.log('cliente conectado')
    socket.on('message',data=>{
        console.log('message data: ',data )
        messages.push(data)
    io.emit('messageLogs',messages)
        })
    })

    //emitimos mensaje
    



/*
io.on ('connection',async socket=>{

console.log('nuevo cliente conectado')
   
    socket.on("message",data=>{
        console.log(data)
    })
    socket.emit("socket_individual","Este mensaje  lo deben recibir los socket")
    socket.broadcast.emit('para_todos_menos_el_actual',"este evento lo reciben todos los socket conectados menos el actual")
    socketServer.emit('evento_para_todos',"este msj lo reciben todos los socket,incluido el actual")
    
   const messages=[]
   socket.on('mensaje_cliente',data=>{
    console.log(data)
    messages.push({id:socket.id,message:data})
    console.log(messages)
    socketServer.emit("messages_server",messages)
   
})

})
*/
