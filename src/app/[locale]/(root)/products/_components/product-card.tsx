'use client'

import { useProductActions } from '@/hooks/use-products'
import { Product } from '@/types/products'
import React, { useState } from 'react'

interface ProductProps {
  product: Product
}

const ProductCard = ({ product }: ProductProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)
  const [isLoading, setIsLoading] = useState(false)
  const { updateProduct, deleteProduct } = useProductActions()

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      await updateProduct(editedProduct)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setIsLoading(true)
    try {
      await deleteProduct(product.id)
    } catch (error) {
      console.error('Failed to delete product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              price: Number(e.target.value)
            })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, description: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
