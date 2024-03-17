import React from "react";
import styles from "./Styles.module.css";

const Damage_Type = (props) => {
  const handleDamagetype = () => {
    props.updateDamagetypeName(props.index);
  };
  return (
    <div>
      <button className={`${styles.damagetype}`} onClick={handleDamagetype}>
        {props.name}
      </button>
    </div>
  );
};

export default Damage_Type;
