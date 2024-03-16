import React from "react";
import styles from "./Styles.module.css";

const Spell_List = (props) => {
  const handleSpells = () => {
    props.updateSpellName(props.index);
  };
  return (
    <div>
      <button className={`${styles.spells}`} onClick={handleSpells}>
        {props.name}
      </button>
    </div>
  );
};

export default Spell_List;
