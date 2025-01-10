import React from 'react'

import { CreateProductForm } from '../_components/create-product-form'
import ProductsList from '../_components/product-list'

const ProductsContainer = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <CreateProductForm />
      </div>
      <ProductsList />
    </div>
  )
}

export default ProductsContainer
