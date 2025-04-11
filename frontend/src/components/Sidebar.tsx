import React from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaStar, FaSteamSquare } from 'react-icons/fa'
import { useState } from 'react'
import NavItem from './NavItem'
import { useSidebarStore } from '../store/sidebarStore'
import { useEffect } from 'react'
import { LuNotebookPen } from 'react-icons/lu'

const menuItems = [
  { icon: <FaStar />, text: 'Favoritos' },
  { icon: <LuNotebookPen />, text: 'Mis Reseñas' },
]

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore()
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      // Espero 300ms a que la animacion de cierre termino
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer) // Limpiar el timer
    }
  }, [isOpen])

  return (
    <div style={{ overflow: 'hidden' }}>
      {isVisible && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isOpen ? 240 : 0 }}
          transition={{ duration: 0.3 }}
          className={`bg-gray-900 h-screen text-white p-4 `}
          style={{ outline: 'none' }}
        >
          <nav
            className={`flex flex-col gap-11 h-full overflow-y-auto ${!isOpen && 'scrollbar-hide'}`}
          >
            {menuItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                text={item.text}
                isOpen={isOpen}
                setIsOpen={toggleSidebar}
              />
            ))}
          </nav>
        </motion.div>
      )}
    </div>
  )
}

export default Sidebar
