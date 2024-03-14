import React from "react";
import styles from "./Styles.module.css";

const RaceTraits = (props) => {
  return (
    <div>
      <div className={`${styles.raceTrait}`}>
        <div>{props.nameRT}</div>
      </div>
    </div>
  );
};

export default RaceTraits;
