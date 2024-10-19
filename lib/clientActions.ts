'use client'
import {z} from 'zod'
export const ProductFormSchema = z.object({
    product: z.string({
      invalid_type_error: 'Please add product name.',
    }),
    price: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    category: z.string({
      invalid_type_error: 'Please add product name.',
    }),
    description: z.string({
      invalid_type_error: 'Please enter product description.',
    }).min(10, { message: 'Description must be at least 10 characters long.' }),
    stockQuantity: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    imageFiles: z.array(z.instanceof(File)).length(3, { message: 'Please select exactly three files.' })
  });