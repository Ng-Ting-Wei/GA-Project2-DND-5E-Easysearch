import React from "react";
import Ability_Score from "../components/Ability_Score";
import styles from "../components/Styles.module.css";

const AbilityScores = () => {
  return (
    <div className={`${styles.background}`}>
      <Ability_Score></Ability_Score>
    </div>
  );
};

export default AbilityScores;
