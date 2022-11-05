import React from "react";
import clsx from "clsx";

// assets
import add_new_button from "../../assets/img/add_new_button.png";

// styles
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    height: "96px",
    width: "96px",
    borderRadius: "8px",
    cursor: "pointer",
    color: theme.palette.text.secondary,
    border: `2px dashed ${theme.palette.text.secondary}`,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    "&:hover > i": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {},
  },
}));

const AddFileFolder = ({ handleAddFileFolder }) => {
  const cls = useStyles();

  return (
    <div onClick={handleAddFileFolder}>
      <div className={clsx(cls.addBtn, "fcc fsxl")}>
        <img src={add_new_button} alt="+" className={cls.img} />
        {/* <i color="primary" className="fas fa-plus"></i>  */}
      </div>
    </div>
  );
};

export default AddFileFolder;
