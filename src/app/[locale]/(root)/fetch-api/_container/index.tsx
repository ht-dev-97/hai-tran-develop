import { Link } from '@/i18n/routing'
import { serverFetch } from '@/utils/http'
import React from 'react'

interface DogAttributes {
  name: string
}

interface Dog {
  id: string
  attributes: DogAttributes
}

interface DogResponse {
  data: Dog[]
}

const FetchAPIContainer = async () => {
  const data = await serverFetch.get<DogResponse>(
    'https://dogapi.dog/api/v2/breeds'
  )

  if (!data) return []

  const dogs = data.data || []

  if (!dogs.length) return <div>No Dogs</div>

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {dogs.map((dog) => (
        <Link key={dog.id} href={`/fetch-api/${dog.id}`} className="p-4 border">
          <p>{dog.attributes.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default FetchAPIContainer
