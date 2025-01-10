import type {
  CreateProductData,
  Product,
  UpdateProductData
} from '@/types/products'
import { clientFetch } from '@/utils/http/client-fetch'
import useSWR, { useSWRConfig } from 'swr'

const PRODUCTS_KEY = '/products'

export function useProducts(page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useSWR<{
    products: Product[]
    total: number
  }>(`${PRODUCTS_KEY}?page=${page}&limit=${limit}`)

  return {
    products: data?.products ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    mutate
  }
}

export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Product>(
    id ? `${PRODUCTS_KEY}/${id}` : null
  )

  return {
    product: data,
    isLoading,
    error,
    mutate
  }
}

export function useProductActions() {
  const { mutate } = useSWRConfig()

  const createProduct = async (data: CreateProductData) => {
    const newProduct = await clientFetch.post<Product>(PRODUCTS_KEY, data)
    await mutate(PRODUCTS_KEY) // Revalidate products list
    return newProduct
  }

  const updateProduct = async (data: UpdateProductData) => {
    const updatedProduct = await clientFetch.put<Product>(
      `${PRODUCTS_KEY}/${data.id}`,
      data
    )
    await mutate(`${PRODUCTS_KEY}/${data.id}`) // Revalidate single product
    await mutate(PRODUCTS_KEY) // Revalidate products list
    return updatedProduct
  }

  const deleteProduct = async (id: string) => {
    await clientFetch.delete(`${PRODUCTS_KEY}/${id}`)
    await mutate(PRODUCTS_KEY) // Revalidate products list
  }

  return {
    createProduct,
    updateProduct,
    deleteProduct
  }
}
