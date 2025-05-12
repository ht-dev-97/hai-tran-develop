import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const folders = searchParams.get('folders')

    if (!folders) {
      const allResults = await list({ mode: 'folded' })
      return NextResponse.json(allResults)
    }

    const foldersList = folders.split(',').map((f) => f.trim())

    if (foldersList.length === 1) {
      const prefix = foldersList[0].endsWith('/')
        ? foldersList[0]
        : `${foldersList[0]}/`
      const result = await list({ mode: 'folded', prefix })
      return NextResponse.json(result)
    }

    const promises = foldersList.map((folder) => {
      const prefix = folder.endsWith('/') ? folder : `${folder}/`
      return list({ mode: 'folded', prefix })
    })

    const results = await Promise.all(promises)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const combinedResult: any = {
      folders: [],
      blobs: []
    }

    results.map((result) => {
      combinedResult.folders.push(...result.folders)
      combinedResult.blobs.push(...result.blobs)
    })

    return NextResponse.json(combinedResult)
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Error fetching images' },
      { status: 500 }
    )
  }
}
