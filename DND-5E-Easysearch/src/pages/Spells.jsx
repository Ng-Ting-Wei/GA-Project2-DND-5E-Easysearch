import React from "react";
import SpellList from "../components/SpellList";
import styles from "../components/Styles.module.css";

const Spells = () => {
  return (
    <div className={`${styles.background}`}>
      <SpellList></SpellList>
    </div>
  );
};

export default Spells;
