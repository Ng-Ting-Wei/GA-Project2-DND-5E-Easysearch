import React from "react";
import FeatList from "../components/FeatList";
import styles from "../components/Styles.module.css";

const Feats = () => {
  return (
    <div className={`${styles.background}`}>
      <FeatList></FeatList>
    </div>
  );
};

export default Feats;
