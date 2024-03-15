import React from "react";
import styles from "./Styles.module.css";

const Skills_Listing = (props) => {
  const handleSkills = () => {
    props.updateSkillName(props.index);
  };
  return (
    <div>
      <button className={`${styles.skills}`} onClick={handleSkills}>
        {props.name}
      </button>
    </div>
  );
};

export default Skills_Listing;
