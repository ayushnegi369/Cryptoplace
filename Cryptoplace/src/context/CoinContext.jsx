import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    
    const [allCoin, setAllCoin] = useState([]);
    
    const [currency, setCurrency] = useState({
        name: "usd",
        Symbol: "$",
    });
    
    const fetchAllCoin = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": "CG-QFndEcrBo8bEfLup9Sc2Qj4a",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setAllCoin(json))
            .catch((err) => console.error("error:" + err));
    };
    
    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin, currency, setCurrency
    }
    
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
