export type Book = {
  id: string
  title: string
}

export interface Content {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path: string
}
