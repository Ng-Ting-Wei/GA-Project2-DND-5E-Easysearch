import React from "react";
import styles from "./Styles.module.css";

const Condition_List = (props) => {
  const handleConditions = () => {
    props.updateConditionName(props.index);
  };
  return (
    <div>
      <button className={`${styles.conditions}`} onClick={handleConditions}>
        {props.name}
      </button>
    </div>
  );
};

export default Condition_List;
