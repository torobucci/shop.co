'use client'

import { createContext } from "react"
export const sessionContext = createContext({ user: { email: '' } })
export function SessionContext({session, children}:{session:any, children:React.ReactNode}){

    return (
        <sessionContext.Provider value={session}>
           {children}
        </sessionContext.Provider>
    )
}
