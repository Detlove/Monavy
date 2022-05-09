import { createContext, useContext } from 'react'

const AppContext = createContext()

export const AppProvider = (props) => {
  const value = {
    //
  }
  return <AppContext.Provider value={value} {...props} />
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    console.log('error context')
  }
  return context
}
