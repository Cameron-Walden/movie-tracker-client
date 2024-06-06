import { createContext, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
export const WatchlistContext = createContext();

export default function WatchlistProvider(props) {
  const [watchlist, setWatchlist] = useState([]);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const addToWatchlist = async (film, res) => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      const config = {
        headers: { "Content-type": "application/json" },
        data: {
          title: film.title,
          description: film.overview,
          poster: film.poster_path,
          watched: false,
          tmdb_id: film.id,
        },
      };
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/watchlist`;
        const response = await axios.post(url, config.data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setWatchlist([...watchlist, response.data]);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, setWatchlist, addToWatchlist }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
}
