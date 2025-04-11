import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean
  toggleSidebar: () => void
  setIsOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarStore>(set => ({
  isOpen: false,
  toggleSidebar: () => set(state => ({ isOpen: !state.isOpen })),
  setIsOpen: open => set({ isOpen: open }),
}))
