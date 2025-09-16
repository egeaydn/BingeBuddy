'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import MovieCard from '@/components/MovieCard'
import { searchMovies } from '@/lib/tmdb'
import { Movie } from '@/types/movie'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setLoading(false)
      return
    }

    const search = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await searchMovies(query)
        setMovies(response.results)
      } catch (err) {
        console.error('Arama hatası:', err)
        setError('Arama sonuçları yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [query])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Bir hata oluştu</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Arama yapın</h2>
        <p className="text-gray-400">Film aramak için yukarıdaki arama kutusunu kullanın.</p>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Sonuç bulunamadı</h2>
        <p className="text-gray-400">
          &ldquo;{query}&rdquo; için arama sonucu bulunamadı. Farklı anahtar kelimeler deneyin.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Arama Sonuçları
        </h1>
        <p className="text-gray-400">
          &ldquo;{query}&rdquo; için {movies.length} sonuç bulundu
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

function LoadingSearchPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSearchPage />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}