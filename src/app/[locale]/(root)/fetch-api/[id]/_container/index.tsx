'use client'

import { showToast } from '@/components/layout/toast.tsx'
import { useRouter } from '@/i18n/routing'
import { clientFetch } from '@/utils/client-fetch'
import { ArrowLeftIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { BreedData } from '../../_types'

const FetchAPIDetailContainer = () => {
  const [dogBreed, setDogBreed] = useState<BreedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams<{ id: string }>() || { id: null }

  const router = useRouter()

  const t = useTranslations('FetchAPIPage')

  const handleBackToDogs = () => {
    router.push('/fetch-api')
  }

  useEffect(() => {
    const fetchDogBreedDetail = async () => {
      try {
        setIsLoading(true)
        const response = await clientFetch.get(
          `https://dogapi.dog/api/v2/breeds/${id}`
        )

        if (!response?.data) return {}

        const data = JSON.parse(response.data)
        setDogBreed(data?.data || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        showToast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchDogBreedDetail()
    }
  }, [id])

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-8">
          <button
            onClick={handleBackToDogs}
            className="w-fit bg-colorBrand-primary hover:bg-colorBrand-primary/80 font-bold py-2 px-4 rounded flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            {t('back')}
          </button>
          <div>
            <h2 className="text-xl font-bold text-colorBrand-primary mb-3">
              {dogBreed?.attributes?.name}
            </h2>
            <p>{dogBreed?.attributes?.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FetchAPIDetailContainer
