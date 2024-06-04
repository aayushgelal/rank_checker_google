"use client"
import { createContext, useContext, useState } from 'react';


 const FormDataContext = createContext<any>(undefined);


export function RankListProvider({ children }:{
  children: React.ReactNode;
}) {
  const [RankData, setRankData] = useState([]);
  


  return (
    <FormDataContext.Provider value={{RankData,setRankData}}>
      {children}            
    </FormDataContext.Provider>
  );
}

export function useRankData() {
  return useContext(FormDataContext);
}
