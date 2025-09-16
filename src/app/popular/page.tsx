import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import MovieCard from '@/components/MovieCard'
import { getPopularMovies } from '@/lib/tmdb'

async function PopularMoviesPage() {
  try {
    const response = await getPopularMovies(1)
    const movies = response.results

    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Popüler Filmler</h1>
            <p className="text-gray-400">En çok izlenen ve beğenilen filmler</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Popüler filmler yüklenemedi:', error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Üzgünüz, bir hata oluştu</h1>
          <p className="text-gray-400 mb-6">Popüler filmler yüklenirken bir sorun yaşandı.</p>
        </div>
      </div>
    )
  }
}

function LoadingPopularPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    </div>
  )
}

export default function PopularPage() {
  return (
    <Suspense fallback={<LoadingPopularPage />}>
      <PopularMoviesPage />
    </Suspense>
  )
}