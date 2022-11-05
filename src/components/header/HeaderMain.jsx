import React, { useState } from "react";
import { Link } from "react-router-dom";

// styling & mui
import { Hidden, IconButton, makeStyles } from "@material-ui/core";
import useGlobalStyles from "../../styles/jss/globalStyles";

// components
import { Divide as Hamburger } from "hamburger-react";
import SideDrawer from "./SideDrawer";

// icons
import {
  Brightness4TwoTone,
  BrightnessHighTwoTone,
  CloseTwoTone,
  SearchTwoTone,
} from "@material-ui/icons";

// redux
import { themeAction, changeMargin, searchAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  searchVisible: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "84px",
      transition: "ease-in 0.25s",
    },
  },
  searchHidden: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
  },
  headerMain: {
    backgroundColor: theme.palette.background.bg,
    width: "100%",
    minHeight: "60px",
    boxShadow: theme.shadows[1],
    padding: "0 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    borderBottom:
      theme.palette.type === "light"
        ? "none"
        : `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("sm")]: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      color: theme.palette.text.white,
    },
  },
  logo: {
    marginLeft: "16px",
    height: "50px",
    width: "60px",
    backgroundImage: `url(${"https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "50px",
      marginLeft: "8px",
      backgroundImage: `url(${"https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"})`,
    },
  },
  searchBar: {
    marginRight: "16px",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding:
        theme.palette.type === "light" ? "0 8px 8px 8px" : "8px 8px 8px 8px",

      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.primary.main
          : theme.palette.background.bg,
      boxShadow: `0 4px 4px -2px rgba(0,0,0,0.35)`,
      width: "100vw",
    },
  },
  modal: {
    backgroundColor: theme.palette.background.bg,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "90vw",
    maxWidth: "620px",
    maxHeight: "70vh",
    zIndex: 99999,
    marginTop: "60px",
  },
  link: {
    alignSelf: "flex-end",
    width: "100%",
    color: theme.palette.primary.main,
    padding: "8px",
    textDecoration: "none",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

const HeaderMain = () => {
  const cls = useStyles();
  const globalCls = useGlobalStyles();
  const dispatch = useDispatch();
  const helper = useSelector((state) => state.helper);

  // local state management
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [moreOptAnchorEl, setMoreOptAnchorEl] = useState(null);
  const [mobSearchVisible, setMobSearchVisible] = useState(
    helper.marginTop ? true : false
  );

  const moreOptionOpen = Boolean(moreOptAnchorEl);

  // handleThemeToggle
  const handleThemeToggle = () => {
    if (helper.themeName === "light") {
      dispatch(themeAction("dark"));
    } else {
      dispatch(themeAction("light"));
    }
  };

  // handleMobSearchToggle
  const handleMobSearchToggle = () => {
    setMobSearchVisible(!mobSearchVisible);

    if (mobSearchVisible) {
      dispatch(changeMargin(false));
    } else {
      dispatch(changeMargin(true));
    }

    if (moreOptionOpen) {
      setMoreOptAnchorEl(null);
    }
  };

  // renderSearchBar
  const renderSearchBar = () => {
    return (
      <div className={cls.searchBar}>
        <input
          className={globalCls.inputSearch}
          type="text"
          name="searchText"
          placeholder="Search files/folders here"
          // value={searchText}
          onChange={(e) => dispatch(searchAction(e.target.value))}
        />
        <button type="button" className={globalCls.searchBtn}>
          <SearchTwoTone />
        </button>
      </div>
    );
  };

  /*
  // optimize search
  const optimizeSearch = (fun, delay) => {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(context, args);
      }, 500);
    };
  };
  const debounceSearch = optimizeSearch(renderSearchBar);
  */

  return (
    <div className={cls.searchHidden} style={{ zIndex: "9999" }}>
      <div className={cls.headerMain}>
        <div className="fc">
          <Hidden mdUp implementation="css">
            <Hamburger
              rounded
              size={24}
              label="Show menu"
              toggled={isMenuOpen}
              toggle={setMenuOpen}
              hideOutline={false}
            />
            <SideDrawer isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
          </Hidden>

          <Link to="/" className="fc">
            <div className={cls.logo}></div>
          </Link>
        </div>
        <div className="fc">
          {/* for mobile */}
          <Hidden mdUp implementation="css">
            <IconButton color="inherit" onClick={handleMobSearchToggle}>
              {mobSearchVisible ? <CloseTwoTone /> : <SearchTwoTone />}
            </IconButton>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {helper.themeName === "light" ? (
                <Brightness4TwoTone />
              ) : (
                <BrightnessHighTwoTone />
              )}
            </IconButton>
          </Hidden>
          {/* for pc */}
          <Hidden smDown implementation="css">
            <div className="fc">
              {renderSearchBar()}
              <IconButton color="primary" onClick={handleThemeToggle}>
                {helper.themeName === "light" ? (
                  <Brightness4TwoTone />
                ) : (
                  <BrightnessHighTwoTone />
                )}
              </IconButton>
            </div>
          </Hidden>
        </div>
      </div>
      {/* mob visible - search bar */}
      <Hidden mdUp implementation="css">
        {mobSearchVisible ? renderSearchBar() : null}
      </Hidden>
    </div>
  );
};

export default HeaderMain;
