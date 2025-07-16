import express from 'express'
import router from './routes/categorias.routes.js'
import ProductosRouter from './routes/productos.routes.js';


const app=express()




app.listen(3000, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:3000`);
})  

//Codigo para usar las rutas 
app.use(express.json())
app.use('/categorias', router);
app.use('/productos',ProductosRouter)