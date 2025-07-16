import { z } from 'zod'

// Esquema de validación para la entidad "producto"
const productoSchema = z.object({
  nombre: z
    .string({
      required_error: 'Debe especificar un nombre',
      invalid_type_error: 'El nombre ingresado no es válido, debe ser texto'
    })
    .min(1, 'El nombre no puede estar vacío')
    .regex(
      /^[\w\sáéíóúÁÉÍÓÚñÑ0-9-]+$/,
      'El nombre solo admite letras, números, espacios y guiones'
    ),

  precio: z
    .number({
      required_error: 'Se requiere un precio',
      invalid_type_error: 'El precio debe ser un valor numérico'
    })
    .positive('El precio debe ser mayor que 0'),

  descripcion: z
    .string({
      required_error: 'Debe ingresar una descripción',
      invalid_type_error: 'La descripción debe ser de tipo texto'
    })
    .min(1, 'La descripción no puede ir vacía'),

  disponible: z
    .boolean({
      required_error: 'Debe indicar si está disponible',
      invalid_type_error: 'El campo disponible solo acepta true o false'
    }),

  fecha_ingreso: z
    .string({
      required_error: 'Debe proporcionar la fecha de ingreso'
    })
    .refine(
      (valor) => !isNaN(Date.parse(valor)),
      {
        message: 'La fecha no es válida, use formato ISO (ej: 2025-07-16T15:00:00Z)'
      }
    ),

  categoria_id: z
    .number({
      required_error: 'El campo categoria_id es obligatorio',
      invalid_type_error: 'El campo categoria_id debe ser un número'
    })
    .int('El id de categoría debe ser un número entero')
    .positive('El id de categoría debe ser mayor a 0')
}).strict()


export const validateProducto = (producto) => {
  
  return productoSchema.safeParse(producto)
}
