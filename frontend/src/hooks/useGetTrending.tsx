import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContentStore } from '../store/contentStore'
import { Content } from '../../../shared/types'

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState<Content | null>(null)
  const { contentType } = useContentStore()
  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`http://localhost:4001/${contentType}/trending`)
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
