import React from "react";
import styles from "./Styles.module.css";

const RaceTraits = (props) => {
  return (
    <div>
      <button className={`${styles.race}`}>{props.nameRT}</button>
    </div>
  );
};

export default RaceTraits;
