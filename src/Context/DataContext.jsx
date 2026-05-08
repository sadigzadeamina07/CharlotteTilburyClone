
import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
const ProductContext = createContext();
export const DataProvider=({children})=> {

const [trending, setTrending] = useState([]);
        useEffect(() => {
        const TrendingNowData = async () => {
            try {
                const response = await axios.get('/Data/CharlotteTilbury_TrendingNow_Full.json')
                setTrending(response.data)
            }
            catch (error) {
                console.error(error);

            }

        }
        TrendingNowData()

    }, [])
  return (
<ProductContext.Provider value={{trending}}>
    {children}
</ProductContext.Provider>
  )
}

export const useProduct=()=>{
    return useContext(ProductContext)
}