import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { PriceData } from "./Coin";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface PriceProps {
  coinId: string;
}

const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 30px 20px;
  border-radius: 5px;
  color: ${(props) => props.theme.bgColor};
  span {
    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      color: ${(props) => props.theme.accentColor};
    }
    &:nth-child(2) {
      font-size: 11px;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    &:last-child {
      font-size: 30px;
    }
  }
`;

function Price({ tickersData }: { tickersData: PriceData }) {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <PriceInfoContainer>
      <PriceInfo>
        <span>percent change</span>
        <span>[1 year]</span>
        <span>{tickersData.quotes.USD.percent_change_1y}</span>
      </PriceInfo>
    </PriceInfoContainer>
  );
}

export default Price;
