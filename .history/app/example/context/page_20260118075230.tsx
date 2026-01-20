"use client";
import { ok } from "assert";
import { useState, createContext, useContext, ReactNode } from "react";

const CountContext = createContext<any>(undefined);
const CountContextProvider = ({ children }: { children: ReactNode }) => {
    const count = 1;
    const [number, setNumber] = useState(0);
    return (
        <CountContext.Provider value={{count, number, setNumber}}>
            {children}
        </CountContext.Provider>
    )
}
export default function Page() {
    return (
        <CountContextProvider>
            <div></div>
        </CountContextProvider>
    );
}

