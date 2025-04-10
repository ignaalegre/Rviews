import { create } from 'zustand'

type ContentStore = {
  contentType: string
  setContentType: (type: string) => void
}

export const useContentStore = create<ContentStore>(set => ({
  contentType: 'movie',
  setContentType: (type: string) => set({ contentType: type }),
}))
