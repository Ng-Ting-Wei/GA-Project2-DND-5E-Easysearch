import React from "react";
import styles from "./Styles.module.css";

const Subrace = (props) => {
  return (
    <div>
      <button className={`${styles.race}`}>{props.nameSR}</button>
    </div>
  );
};

export default Subrace;
