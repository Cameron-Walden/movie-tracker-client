import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./CrewTab.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  crew,
  setCrew,
  cast,
  setCast,
  getFilmCredits,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
        className={styles.tabsContainer}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="CAST"
            {...a11yProps(0)}
            className={value === 0 ? styles.selected : styles.unselected}
          />
          <Tab
            label="CREW"
            {...a11yProps(1)}
            className={value === 1 ? styles.selected : styles.unselected}
          />
          <Tab
            label="DETAILS"
            {...a11yProps(2)}
            className={value === 2 ? styles.selected : styles.unselected}
          />
          <Tab
            label="GENRES"
            {...a11yProps(3)}
            className={value === 3 ? styles.selected : styles.unselected}
          />
        </Tabs>
      </Box>
      <Box className="tab-panel">
        <TabPanel
          value={value}
          index={0}
          className={`${value === 0 ? styles.selected : styles.unselected} ${styles.castTabPanel}`}
        >
          <div className={styles.castContainer}>
            {cast.map((member) => (
              <div key={member.id} className={styles.castMember}>
                {member.name}
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          className={`${value === 1 ? styles.selected : styles.unselected} ${styles.crewTabPanel}`}
        >
          <div className={styles.crewContainer}>
            {crew.map((member) => (
              <div key={member.id} className={styles.crewMember}>
                {member.name}...{member.department}
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          className={`${value === 2 ? styles.selected : styles.unselected} ${styles.detailsTabPanel}`}
        >
          <div className={styles.detailsContainer}>
            <div className={styles.details}>DETAILS</div>
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
          className={`${value === 3 ? styles.selected : styles.unselected} ${styles.genresTabPanel}`}
        >
          <div className={styles.genresContainer}>
            <div className={styles.genres}>GENRES</div>
          </div>
        </TabPanel>
      </Box>
    </Box>
  );
}
