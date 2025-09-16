import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import MovieList from '@/components/MovieList'
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies } from '@/lib/tmdb'

async function HomePage() {
  try {
    // API çağrılarını paralel olarak yap
    const [popularResponse, nowPlayingResponse, topRatedResponse] = await Promise.all([
      getPopularMovies(1),
      getNowPlayingMovies(1),
      getTopRatedMovies(1)
    ])

    const popularMovies = popularResponse.results
    const nowPlayingMovies = nowPlayingResponse.results
    const topRatedMovies = topRatedResponse.results

    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        {/* Hero Section */}
        <HeroSection movies={popularMovies} />
        
        {/* Movie Lists */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Popüler Filmler */}
          <MovieList
            title="Popüler Filmler"
            movies={popularMovies}
            priority={true}
            showViewAll={true}
            viewAllLink="/popular"
          />

          {/* Vizyondaki Filmler */}
          <MovieList
            title="Vizyondaki Filmler"
            movies={nowPlayingMovies}
            showViewAll={true}
            viewAllLink="/now-playing"
          />

          {/* En Yüksek Puanlı */}
          <MovieList
            title="En Yüksek Puanlı"
            movies={topRatedMovies}
            showViewAll={true}
            viewAllLink="/top-rated"
          />
        </div>

        {/* Footer */}
        <footer className="bg-gray-950 border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <span className="text-white text-xl font-bold">BingeBuddy</span>
              </div>
              <p className="text-gray-400 text-sm">
                En iyi film önerileri için doğru adres. Popüler filmlerden klasiklere kadar.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                © 2024 BingeBuddy. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error('Ana sayfa yüklenemedi:', error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Üzgünüz, bir hata oluştu</h1>
          <p className="text-gray-400 mb-6">Film verileri yüklenirken bir sorun yaşandı.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }
}

// Loading component
function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <HomePage />
    </Suspense>
  )
}
