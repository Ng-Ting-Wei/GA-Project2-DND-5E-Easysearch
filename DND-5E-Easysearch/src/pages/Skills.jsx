import React from "react";
import SkillList from "../components/SkillList";
import styles from "../components/Styles.module.css";

const Skills = () => {
  return (
    <div className={`${styles.background}`}>
      <SkillList></SkillList>
    </div>
  );
};

export default Skills;
