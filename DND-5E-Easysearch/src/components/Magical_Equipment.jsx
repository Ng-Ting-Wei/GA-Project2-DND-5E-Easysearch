import React from "react";
import styles from "./Styles.module.css";

const Magical_Equipment = (props) => {
  const handleMagicalItem = () => {
    props.updateMagicalEquipmentName(props.index);
  };
  return (
    <div>
      <button
        className={`${styles.magicalequipment}`}
        onClick={handleMagicalItem}
      >
        {props.name}
      </button>
    </div>
  );
};

export default Magical_Equipment;
