import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/contentStore'
import { SMALL_IMG_BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Content } from '../../../shared/types'

const MovieSlider = ({ category }: { category: { id: string; label: string } }) => {
  const { contentType } = useContentStore()
  const [content, setContent] = useState<Content[]>([])
  const [showArrows, setShowArrows] = useState(false)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`http://localhost:4001/${contentType}/${category.id}`)
      setContent(res.data.content)
    }
    getContent()
  }, [contentType, category.id])

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-8 text-2xl font-bold text-center ">{category.label}</h2>
      <div className="w-full overflow-hidden">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide w-full" ref={sliderRef}>
          {content?.map(item => (
            <Link
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group hover:text-green-300"
              key={item.id}
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMG_BASE_URL + item?.backdrop_path}
                  alt="Movie image"
                  className="transition-transform duration-300 ease-in-out  group-hover:scale-125"
                ></img>
              </div>
              <p className="mt-2 text-center">{item?.title || item?.name}</p>
            </Link>
          ))}
        </div>
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center 
          justify-center size-12 rounded-full bg-black bg-opacity-50  hover:bg-green-400/50 hover:transition duration-100 hover:scale-105 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center 
          justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-green-400/50  hover:transition duration-100 hover:scale-105 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}

export default MovieSlider
