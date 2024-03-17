import React from "react";
import Damagetype from "../components/Damagetype";
import styles from "../components/Styles.module.css";

const DamageTypes = () => {
  return (
    <div className={`${styles.background}`}>
      <Damagetype></Damagetype>
    </div>
  );
};

export default DamageTypes;
