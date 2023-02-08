import { createContext, useState } from "react";

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {

    const [servEmpId, setServEmpId] = useState("")

    const updateIdservEmp = (id) => {
        setServEmpId(id)
    }

    return (
        <DataContext.Provider value={{
            updateIdservEmp,
            servEmpId
           
        }}>
            {children}
        </DataContext.Provider>
    )
}