import React from "react";
import MagicalEquipmentList from "../components/MagicalEquipmentList";
import styles from "../components/Styles.module.css";

const MagicalEquipments = () => {
  return (
    <div className={`${styles.background}`}>
      <MagicalEquipmentList></MagicalEquipmentList>
    </div>
  );
};

export default MagicalEquipments;
