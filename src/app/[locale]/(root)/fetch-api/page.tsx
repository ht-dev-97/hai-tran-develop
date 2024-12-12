import { Suspense } from 'react'

import FetchAPIContainer from './_container'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FetchAPIContainer />
    </Suspense>
  )
}
