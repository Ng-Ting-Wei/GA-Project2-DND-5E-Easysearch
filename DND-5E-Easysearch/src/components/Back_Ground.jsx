import React from "react";
import styles from "./Styles.module.css";

const Back_Ground = (props) => {
  const handleBackground = () => {
    props.updateBackgroundName(props.index);
  };
  return (
    <div>
      <button className={`${styles.backgroundlist}`} onClick={handleBackground}>
        {props.name}
      </button>
    </div>
  );
};

export default Back_Ground;
