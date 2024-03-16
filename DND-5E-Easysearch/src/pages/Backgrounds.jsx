import React from "react";
import BackgroundList from "../components/BackgroundList";
import styles from "../components/Styles.module.css";

const Backgrounds = () => {
  return (
    <div className={`${styles.background}`}>
      <BackgroundList></BackgroundList>
    </div>
  );
};

export default Backgrounds;
