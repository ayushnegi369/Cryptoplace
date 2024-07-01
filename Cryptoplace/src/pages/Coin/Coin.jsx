import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { useContext, useEffect, useState } from "react";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalData] = useState();
    const { currency } = useContext(CoinContext);

    const fetchCoinData = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-pro-api-key": "CG-QFndEcrBo8bEfLup9Sc2Qj4a",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setCoinData(json))
            .catch((err) => console.error("error:" + err));
    };

    const fetchHistoricalData = async () => {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-pro-api-key": "CG-QFndEcrBo8bEfLup9Sc2Qj4a",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setHistoricalData(json))
            .catch((err) => console.error("error:" + err));
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [currency]);

    if (coinData && historicalData) {
        return (
            <div className="coin">
                <div className="coin-name">
                    {coinData.image && coinData.image.large ? (
                        <img src={coinData.image.large} alt="Image" />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>
                        <b>
                            {coinData.name} (
                            {coinData.symbol
                                ? coinData.symbol.toUpperCase()
                                : "N/A"}
                            )
                        </b>
                    </p>
                </div>
                <div className="coint-chart">
                    <LineChart historicalData={historicalData} />
                </div>
                <div className="coin-info">
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>
                            {currency.Symbol}
                            {coinData.market_cap_rank.current_price[
                                currency_name
                            ].toLocaleString()}
                        </li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>
                            {currency.Symbol}
                            {coinData.market_data.market_cap[
                                currency.name
                            ].toLocaleString()}
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="spinner">
                <div className="spin"></div>
            </div>
        );
    }
};

export default Coin;
