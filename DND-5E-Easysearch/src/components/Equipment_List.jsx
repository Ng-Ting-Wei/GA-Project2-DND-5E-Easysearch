import React from "react";
import styles from "./Styles.module.css";

const Equipment_List = (props) => {
  const handleEquipments = () => {
    props.updateEquipmentName(props.index);
  };
  return (
    <div>
      <button className={`${styles.equipments}`} onClick={handleEquipments}>
        {props.name}
      </button>
    </div>
  );
};

export default Equipment_List;
