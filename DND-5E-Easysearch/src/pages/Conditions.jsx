import React from "react";
import ConditionList from "../components/ConditionList";
import styles from "../components/Styles.module.css";

const Conditions = () => {
  return (
    <div className={`${styles.background}`}>
      <ConditionList></ConditionList>
    </div>
  );
};

export default Conditions;
