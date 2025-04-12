import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { FavouriteContent } from '../../../shared/types'
import { RiTvFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { MdLocalMovies } from 'react-icons/md'
import { Review } from '../../../shared/types'

interface NavItemProps {
  icon: React.ReactNode
  text: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  expandableMovies?: FavouriteContent[] | Review[]
  expandableSeries?: FavouriteContent[] | Review[]
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  isOpen,
  expandableMovies,
  expandableSeries,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [expandedMovies, setExpandedMovies] = useState(false)
  const [expandedSeries, setExpandedSeries] = useState(false)

  const handleTitleClick = () => {
    if (isOpen) {
      setExpanded(prev => !prev)
    }
  }

  const handleMoviesClick = () => {
    if (isOpen) {
      setExpandedMovies(prev => !prev)
    }
  }

  const handleSeriesClick = () => {
    if (isOpen) {
      setExpandedSeries(prev => !prev)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-green-400 w-full justify-between"
        onClick={handleTitleClick}
      >
        <div className="flex items-center gap-2 ">
          <span className="text-xl">{icon}</span>
          {isOpen && <span>{text}</span>}
          {isOpen && <span>{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>}
        </div>
      </div>

      {/* Boton  de lista expandible de movies */}
      {isOpen && expanded && (
        <div
          onClick={handleMoviesClick}
          className="flex flex-row ml-4 mt-4 items-center gap-2 cursor-pointer hover:text-green-400 transform w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <MdLocalMovies />
            <span>Peliculas</span>
            {expandedMovies ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      )}

      {/* Listado de movies */}
      {isOpen && expanded && expandedMovies && (
        <div className="ml-8 mt-4 flex flex-col gap-3 text-sm text-gray-300 font-light">
          {expandableMovies && expandableMovies?.length > 0 ? (
            expandableMovies?.map(item => {
              const id = 'id' in item ? item.id : item.show_id
              return (
                <Link to={`/${item.contentType}/${id}`} key={id}>
                  <div className="cursor-pointer hover:text-green-400">{item.title}</div>
                </Link>
              )
            })
          ) : (
            <div className="mt-2">No hay nada aquí 😕</div>
          )}
        </div>
      )}
      {/* Boton  de lista expandible de series */}
      {isOpen && expanded && (
        <div
          onClick={handleSeriesClick}
          className="flex flex-row ml-4 mt-4 items-center gap-2 cursor-pointer hover:text-green-400 transform w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <RiTvFill />
            <span>Series</span>
            {expandedSeries ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      )}
      {/* Listado de Series */}
      {isOpen && expanded && expandedSeries && (
        <div className="ml-8 mt-2 flex flex-col gap-3 text-sm text-gray-300">
          {expandableSeries && expandableSeries?.length > 0 ? (
            expandableSeries?.map(item => {
              const id = 'id' in item ? item.id : item.show_id
              return (
                <Link to={`/${item.contentType}/${id}`} key={id}>
                  <div className="cursor-pointer hover:text-green-400">{item.title}</div>
                </Link>
              )
            })
          ) : (
            <div className="mt-2">No hay nada aquí 😕</div>
          )}
        </div>
      )}
    </div>
  )
}

export default NavItem
