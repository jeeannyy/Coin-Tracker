import { faMoon, faLightbulb, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import { NavigationContainer, NavigationIcon } from "./Coin";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`;

const Title = styled.h1`
font-size: 60px;
font-family: "Arvo";
font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prevMode) => !prevMode);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <NavigationContainer>
      <NavigationIcon>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </NavigationIcon>
        {isDark ? (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faMoon} />
            </Link >
          </NavigationIcon>
        ) : (
          <NavigationIcon onClick={toggleDarkAtom}>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faLightbulb} />
            </Link>
          </NavigationIcon>
        )}
      </NavigationContainer>
      <Header>
        <Title>C????in Tracker</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 30).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
