import React from "react";
import EquipmentList from "../components/EquipmentList";
import styles from "../components/Styles.module.css";

const Equipments = () => {
  return (
    <div className={`${styles.background}`}>
      <EquipmentList></EquipmentList>
    </div>
  );
};

export default Equipments;
