import React, { createContext, useContext, useState } from 'react'

type Option = 'movie' | 'tv'

type ContentTypeContextType = {
    selected: Option
    setSelected: (value: Option) => void
}

const ContentTypeContext = createContext<ContentTypeContextType | undefined>(undefined)

export const ContentTypeProvider = ({ children }: { children: React.ReactNode }) => {
    const [selected, setSelected] = useState<Option>('movie')

    return (
        <ContentTypeContext.Provider value={{ selected, setSelected }}>
            {children}
        </ContentTypeContext.Provider>
    )
}

export const useContentType = () => {
    const context = useContext(ContentTypeContext)
    if (!context) throw new Error('useContentType must be used within ContentTypeProvider')
    return context
}