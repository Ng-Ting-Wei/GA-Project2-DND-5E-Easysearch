import React from "react";
import styles from "./Styles.module.css";

const Feats_List = (props) => {
  const handleFeats = () => {
    props.updateFeatName(props.index);
  };
  return (
    <div>
      <button className={`${styles.feats}`} onClick={handleFeats}>
        {props.name}
      </button>
    </div>
  );
};

export default Feats_List;
