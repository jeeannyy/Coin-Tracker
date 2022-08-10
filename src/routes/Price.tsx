import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { PriceData } from "./Coin";
import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartPrice {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({coinId}: ChartPrice){
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return(
    <div>
    {isLoading ? (
      "Loading..."
    ) : (
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => price.high)??[],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
          },
        }}
      />
    )}
  </div>
);
}


export default Price;
