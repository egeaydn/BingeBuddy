'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ImageTestPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  
  const testImages = [
    {
      name: 'Direct TMDB URL',
      url: 'https://image.tmdb.org/t/p/w500/fBmLlHKvDuvO4316qzqaDxEuKsg.jpg'
    },
    {
      name: 'Placeholder',
      url: '/placeholder-movie.svg'
    }
  ]
  
  useEffect(() => {
    // Test API
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9695deb18593f63180797e59ba9f236c&language=tr-TR&page=1')
      .then(r => r.json())
      .then(data => {
        console.log('API Response - First Movie:', data.results[0])
        setTestResults(prev => [...prev, { type: 'API', data: data.results[0] }])
      })
      .catch(err => {
        console.error('API Error:', err)
        setTestResults(prev => [...prev, { type: 'API Error', data: err.message }])
      })
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl text-white mb-8">Image Debug Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {testImages.map((test, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-white text-xl mb-4">{test.name}</h2>
            <div className="relative w-64 h-96 bg-gray-700 rounded">
              <Image
                src={test.url}
                alt={test.name}
                fill
                className="object-cover"
                unoptimized={true}
                loader={({ src }) => src}
                onError={(e) => {
                  console.error(`Failed to load: ${test.url}`)
                  const target = e.target as HTMLImageElement
                  target.style.border = '3px solid red'
                }}
                onLoad={() => {
                  console.log(`Successfully loaded: ${test.url}`)
                }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2 break-all">{test.url}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-white text-xl mb-4">Test Results (Check Console)</h2>
        <pre className="text-green-400 text-xs overflow-auto">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>
      
      <div className="mt-8 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-white text-xl mb-4">Using standard img tag</h2>
        <img 
          src="https://image.tmdb.org/t/p/w500/fBmLlHKvDuvO4316qzqaDxEuKsg.jpg"
          alt="Direct img test"
          className="w-64 rounded"
          onError={(e) => {
            console.error('IMG tag failed to load')
            e.currentTarget.style.border = '3px solid red'
          }}
          onLoad={() => console.log('IMG tag loaded successfully')}
        />
        <p className="text-gray-400 text-sm mt-2">Standard img tag (no Next.js Image)</p>
      </div>
    </div>
  )
}
