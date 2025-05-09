import { create } from 'zustand'
import axios from 'axios'
import { Review } from '../../../shared/types'


interface ReviewsState {
    moviesReviews: Review[]
    tvReviews: Review[]
    fetchMovieReviews: () => Promise<void>
    fetchTvReviews: () => Promise<void>
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  moviesReviews: [],
  tvReviews: [],
  fetchMovieReviews: async () => {
    const res = await axios.get('/api/review/movie/all')
    set({ moviesReviews: res.data.reviews })
    console.log(res.data.reviews)
  },
  fetchTvReviews: async () => {
    const res = await axios.get('/api/review/tv/all')
    set({ tvReviews: res.data.reviews })
    console.log(res.data.reviews)
  },
}))