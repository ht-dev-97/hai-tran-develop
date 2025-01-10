'use client'

import { useProducts } from '@/hooks/use-products'
import React, { useState } from 'react'

import ProductCard from './product-card'

const ProductsList = () => {
  const [page, setPage] = useState<number>(1)
  const limit = 10

  const { products, total, isLoading, error } = useProducts(page, limit)
  const totalPages = Math.ceil(total / limit)

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-500 rounded">
        Failed to load products
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading products...</div>
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductsList
