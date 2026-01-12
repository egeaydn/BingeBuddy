'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Movie } from '@/types/movie'
import { getPosterUrl, getYear, formatRating } from '@/lib/tmdb'

interface MovieCardProps {
  movie: Movie
  priority?: boolean
  size?: 'small' | 'medium' | 'large'
}

export default function MovieCard({ movie, priority = false, size = 'medium' }: MovieCardProps) {
  const params = useParams()
  const locale = params?.locale || 'tr'
  
  const sizeClasses = {
    small: 'w-36',
    medium: 'w-48',
    large: 'w-56'
  }

  const imageSize = {
    small: { width: 144, height: 216 },
    medium: { width: 192, height: 288 },
    large: { width: 224, height: 336 }
  }

  const posterUrl = getPosterUrl(movie.poster_path)
  
  return (
    <Link href={`/${locale}/movie/${movie.id}`} className="group block">
      <div className={`${sizeClasses[size]} flex-shrink-0 transform transition-all duration-300 group-hover:scale-105`}>
        {/* Poster */}
        <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-gray-800">
          <img
            src={posterUrl}
            alt={movie.title}
            width={imageSize[size].width}
            height={imageSize[size].height}
            className="w-full h-auto object-cover rounded-lg"
            loading={priority ? 'eager' : 'lazy'}
            onError={(e) => {
              console.error('Image load error:', posterUrl)
              e.currentTarget.src = '/placeholder-movie.svg'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{formatRating(movie.vote_average)}</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="pt-3 space-y-1">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>{getYear(movie.release_date)}</span>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{movie.vote_count}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}