export interface IGeneralBikeInformation {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IBelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface IGenre {
  id: number
  name: string
}

export interface IProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface IProductionCountry {
  iso_3166_1: string
  name: string
}

export interface ISpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IBikeDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: IBelongsToCollection
  budget: number
  genres: IGenre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ICredit {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface IAuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating?: any
}

export interface IReviews {
  author: string
  author_details: IAuthorDetails
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

export interface IReviewRequest {
  id: number
  page: number
  results: IReviews[]
  total_pages: number
  total_results: number
}
