import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { getMovieDetails } from '@/lib/tmdb'
import { getPosterUrl, getBackdropUrl, formatRating, formatRuntime, getYear } from '@/lib/tmdb'
import { MoviePageProps } from '@/types/page'

async function MovieDetailsPage({ params }: MoviePageProps) {
  const t = await getTranslations()
  
  try {
    const resolvedParams = await params
    const { id, locale } = resolvedParams
    const movieId = parseInt(id)
    
    if (isNaN(movieId)) {
      notFound()
    }

    const movie = await getMovieDetails(movieId)

    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        
        {/* Backdrop Hero */}
        <div className="relative h-96 md:h-screen max-h-[600px] overflow-hidden">
          <Image
            src={getBackdropUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Movie Details */}
        <div className="relative -mt-32 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <div className="w-64 mx-auto lg:mx-0">
                  <Image
                    src={getPosterUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    width={256}
                    height={384}
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <div className="space-y-6">
                  {/* Title & Basic Info */}
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                    {movie.tagline && (
                      <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-300">
                      <span className="text-lg">{getYear(movie.release_date)}</span>
                      <span>•</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold">{formatRating(movie.vote_average)}</span>
                        <span className="text-gray-400">({movie.vote_count} {t('movieDetail.votes')})</span>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t('movieDetail.genres')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overview */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('movieDetail.overview')}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {movie.overview || t('movieDetail.noOverview')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {t('movieDetail.watchTrailer')}
                    </button>
                    
                    <button className="inline-flex items-center justify-center px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {t('movieDetail.addToList')}
                    </button>

                    <button className="inline-flex items-center justify-center px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      {t('movieDetail.share')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
              {/* Production Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{t('movieDetail.productionInfo')}</h3>
                <div className="space-y-2 text-gray-300">
                  <div>
                    <span className="font-medium">{t('movieDetail.status')}</span> {movie.status}
                  </div>
                  <div>
                    <span className="font-medium">{t('movieDetail.originalLanguage')}</span> {movie.original_language.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium">{t('movieDetail.budget')}</span> 
                    {movie.budget > 0 ? ` $${movie.budget.toLocaleString()}` : ` ${t('movieDetail.unknown')}`}
                  </div>
                  <div>
                    <span className="font-medium">{t('movieDetail.revenue')}</span> 
                    {movie.revenue > 0 ? ` $${movie.revenue.toLocaleString()}` : ` ${t('movieDetail.unknown')}`}
                  </div>
                </div>
              </div>

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('movieDetail.productionCompanies')}</h3>
                  <div className="space-y-2 text-gray-300">
                    {movie.production_companies.slice(0, 5).map((company) => (
                      <div key={company.id}>{company.name}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries */}
              {movie.production_countries && movie.production_countries.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('movieDetail.productionCountries')}</h3>
                  <div className="space-y-2 text-gray-300">
                    {movie.production_countries.map((country) => (
                      <div key={country.iso_3166_1}>{country.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <div className="mt-12 pb-12">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('movieDetail.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    const resolvedParams = await params
    const { locale } = resolvedParams
    console.error(t('movieDetail.loadError'), error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('movieDetail.notFound')}</h1>
          <p className="text-gray-400 mb-6">{t('movieDetail.notFoundMessage')}</p>
          <Link
            href={`/${locale}`}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {t('movieDetail.backToHome')}
          </Link>
        </div>
      </div>
    )
  }
}

function LoadingMoviePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    </div>
  )
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <Suspense fallback={<LoadingMoviePage />}>
      <MovieDetailsPage params={params} />
    </Suspense>
  )
}