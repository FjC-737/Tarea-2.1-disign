import { Router } from 'express';
import ProductosController from '../controllers/controller_productos.js';

const ProductosRouter = Router();

ProductosRouter.get('/', ProductosController.getAll);
ProductosRouter.get('/disponible', ProductosController.ObtenerProductosDisponibles);
ProductosRouter.get('/:id', ProductosController.ObtenerProductoID);
ProductosRouter.post('/', ProductosController.CrearProducto);
ProductosRouter.put('/:id', ProductosController.ActualizarProductos);
ProductosRouter.delete('/:id', ProductosController.EliminarProducto);

export default ProductosRouter;