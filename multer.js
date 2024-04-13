const multer=require('multer');
//import {__dirname} from './utils.js'     --> ESTO SOLO EN CASO QUE ESTE USANDO IMPORT EN VEZ DE REQUIRE
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/public/uploads') // ---> crear la carpeta uploads en public
    },
    filename:function(req,file,callback){
        callback(null,`${Date.now()}-${file.originalname}`)
    }
});
const uploader=multer(storage)
module.exports = uploader