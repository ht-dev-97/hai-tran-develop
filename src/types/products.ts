export interface Product {
  id: string
  name: string
  price: number
  description: string
  stock: number
  createdAt: string
}

export interface CreateProductData {
  name: string
  price: number
  description: string
  stock: number
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string
}
