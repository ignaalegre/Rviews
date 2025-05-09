import axios from 'axios'
import { useEffect, useState } from 'react'
import { Content } from '../../../shared/types'

const useGetTrendingContent = (contentType: 'movie' | 'tv') => {
  const [trendingContent, setTrendingContent] = useState<Content | null>(null)
  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`http://localhost:4001/api/${contentType}/trending`)
      const content = res.data.content
      setTrendingContent({
        ...content,
        title: content.title || content.name,
      })
    }
    getTrendingContent()
  }, [contentType])

  return { trendingContent }
}

export default useGetTrendingContent
