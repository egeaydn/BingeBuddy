import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'

interface MovieListProps {
  title: string
  movies: Movie[]
  priority?: boolean
  showViewAll?: boolean
  viewAllLink?: string
}

export default function MovieList({ 
  title, 
  movies, 
  priority = false, 
  showViewAll = false, 
  viewAllLink 
}: MovieListProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        {showViewAll && viewAllLink && (
          <a 
            href={viewAllLink}
            className="text-red-400 hover:text-red-300 font-medium transition-colors flex items-center space-x-1"
          >
            <span>Tümünü Gör</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            priority={priority && index < 6}
          />
        ))}
      </div>
    </section>
  )
}