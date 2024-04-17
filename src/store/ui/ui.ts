import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  // estado (se inicializa en false):
  isSideMenuOpen: false,

  openSideMenu: () => set({isSideMenuOpen: true}),
  closeSideMenu: () => set({isSideMenuOpen: false}),
}))