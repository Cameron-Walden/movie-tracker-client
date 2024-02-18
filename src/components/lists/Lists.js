import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FilmContext } from "../../context/FilmContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Films from "../films/Films";
// import NewList from "../newList/NewList";
import Pages from "../pages/Pages";
import CustomTabPanel from "./customTabPanel";
import a11yProps from "./a11yProps";
import { Box, Button, Tab, Tabs } from "@mui/material";
import "./Lists.css";

export default function Lists() {
  const [value, setValue] = useState(0);
  const [userLists, setUserLists] = useState([]);
  const [userHasLists, setUserHasLists] = useState(false);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

  const handleChange = (newValue) => setValue(newValue);

  const getUserLists = async () => {
    if (isAuthenticated) {
      const idTokenClaims = await getIdTokenClaims();
      const jwtToken = idTokenClaims.__raw;
      try {
        let response = await axios.get("http://localhost:3001/lists", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const userListData = response.data.map((list) => ({
          ...list,
        }));
        setUserLists(userListData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserLists();
  }, []);

  return (
    <>
      <Header />
      {hasUserSearched ? (
        <>
          <Films />
          <Pages
            search={search}
            setMovies={setMovies}
            totalResults={totalResults}
          />
        </>
      ) : (
        <div className="box-container">
          <Box sx={{ width: "100%" }} classame="box">
            <div className="inner-box">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={(event, newValue) => handleChange(newValue)}
                >
                  <Tab
                    label="Your Lists"
                    {...a11yProps(0)}
                    className={value === 0 ? "selected" : "unselected"}
                  />
                  <Tab
                    label="Shared with you"
                    {...a11yProps(1)}
                    className={value === 1 ? "selected" : "unselected"}
                  />
                </Tabs>
              </Box>
            </div>
            <div className="tab-container">
              {value === 0 && (
                <CustomTabPanel
                  value={value}
                  index={0}
                  className={`{value === 0 ? "selected" : "unselected"}`}
                >
                  {userHasLists ? (
                    {
                      /* {userLists.map((list) => (
                    <div key={list._id} className="list">
                      <h3>{list.title}</h3>
                      <h2>{list.description}</h2>
                      {list.movies.map((movie) => (
                        <div key={movie.id} className="movie">
                          <h4>{movie.title}</h4>
                        </div>
                      ))}
                    </div>
                  ))} */
                    }
                  ) : (
                    <div className="no-lists">
                      <>No lists yet...</>
                      <Link
                        to="/lists/new"
                        className="new-list"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <Button variant="text" className="create-list-btn">Create one?</Button>
                      </Link>
                    </div>
                  )}
                </CustomTabPanel>
              )}
              {value === 1 && (
                <CustomTabPanel
                  value={value}
                  index={1}
                  className={`{value === 1 ? "selected" : "unselected"}`}
                >
                  No lists have been shared with you...
                </CustomTabPanel>
              )}
            </div>
          </Box>
        </div>
      )}
    </>
  );
}
