import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface NavItemProps {
  icon: React.ReactNode
  text: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, isOpen }) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    if (isOpen) {
      setExpanded(prev => !prev)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-green-300 w-full justify-between"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 ">
          <span className="text-xl">{icon}</span>
          {isOpen && <span>{text}</span>}
          {isOpen && <span>{expanded ? <FaChevronUp /> : <FaChevronDown />}</span>}
        </div>
      </div>
      {isOpen && expanded && (
        <div className="ml-8 mt-2 flex flex-col gap-1 text-sm text-gray-300">
          <div className="cursor-pointer hover:text-blue-400">Opción 1</div>
          <div className="cursor-pointer hover:text-blue-400">Opción 2</div>
          <div className="cursor-pointer hover:text-blue-400">Opción 3</div>
        </div>
      )}
    </div>
  )
}

export default NavItem
