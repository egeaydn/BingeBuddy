import { Movie, MovieDetails, MovieResponse, ApiError } from '@/types/movie'

const API_KEY = '9695deb18593f63180797e59ba9f236c'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// API fetch wrapper with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Popüler filmleri getir
export async function getPopularMovies(page: number = 1): Promise<MovieResponse> {
  return apiRequest<MovieResponse>(
    `/movie/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`
  )
}

// Şu an gösterimdeki filmleri getir
export async function getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
  return apiRequest<MovieResponse>(
    `/movie/now_playing?api_key=${API_KEY}&language=tr-TR&page=${page}`
  )
}

// En yüksek puanlı filmleri getir
export async function getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
  return apiRequest<MovieResponse>(
    `/movie/top_rated?api_key=${API_KEY}&language=tr-TR&page=${page}`
  )
}

// Film detaylarını getir
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return apiRequest<MovieDetails>(
    `/movie/${movieId}?api_key=${API_KEY}&language=tr-TR`
  )
}

// Film arama
export async function searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
  const encodedQuery = encodeURIComponent(query)
  return apiRequest<MovieResponse>(
    `/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodedQuery}&page=${page}`
  )
}

// Resim URL'lerini oluştur
export function getImageUrl(path: string | null, size: 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string {
  if (!path) return '/placeholder-movie.svg'
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Poster URL'si
export function getPosterUrl(path: string | null, size: 'w300' | 'w500' | 'w780' = 'w500'): string {
  return getImageUrl(path, size)
}

// Backdrop URL'si
export function getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
  return getImageUrl(path, size)
}

// Yıl formatı
export function getYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString()
}

// Rating formatı
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

// Runtime formatı (dakikayı saat:dakika)
export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'Bilinmiyor'
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return hours > 0 ? `${hours}sa ${remainingMinutes}dk` : `${remainingMinutes}dk`
}