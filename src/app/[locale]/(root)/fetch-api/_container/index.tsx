/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@/i18n/routing'
import { serverFetch } from '@/utils/server-fetch'
import React from 'react'

const FetchAPIContainer = async () => {
  const response = await serverFetch.get('https://dogapi.dog/api/v2/breeds')

  if (!response?.data) return []

  const data = JSON.parse(response.data)
  const dogs = data?.data || []

  if (!dogs.length) return <div>No Dogs</div>

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {dogs.map((dog: any) => (
        <Link key={dog.id} href={`/fetch-api/${dog.id}`} className="p-4 border">
          <p>{dog.attributes.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default FetchAPIContainer
