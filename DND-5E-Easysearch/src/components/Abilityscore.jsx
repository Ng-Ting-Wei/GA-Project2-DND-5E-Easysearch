import React from "react";
import styles from "./Styles.module.css";

const Abilityscore = (props) => {
  const handleAbilityScore = () => {
    props.updateAbilityscoreIndex(props.index);
  };
  return (
    <div>
      <button className={`${styles.abilityscore}`} onClick={handleAbilityScore}>
        {props.name}
      </button>
    </div>
  );
};

export default Abilityscore;
