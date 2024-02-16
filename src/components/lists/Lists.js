import { useContext, useState } from "react";
import { FilmContext } from "../../context/FilmContext";

import Header from "../Header";
import Films from "../films/Films";
import Pages from "../pages/Pages";
import CustomTabPanel from "./customTabPanel";
import a11yProps from "./a11yProps";
import { Box, Tab, Tabs } from "@mui/material";
import "./Lists.css";

export default function Lists() {
  const [value, setValue] = useState(0);
  const { search, setMovies, totalResults, hasUserSearched } =
    useContext(FilmContext);

  const handleChange = (newValue) => setValue(newValue);

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
                  Your Lists
                </CustomTabPanel>
              )}
              {value === 1 && (
                <CustomTabPanel
                  value={value}
                  index={1}
                  className={`{value === 1 ? "selected" : "unselected"}`}
                >
                  Shared with you
                </CustomTabPanel>
              )}
            </div>
          </Box>
        </div>
      )}
    </>
  );
}
