import React from "react";
import styles from "./Styles.module.css";

const Alignments = (props) => {
  const handleAlignment = () => {
    props.updateAlignmentName(props.index);
  };
  return (
    <div>
      <button className={`${styles.alignment}`} onClick={handleAlignment}>
        {props.name}
      </button>
    </div>
  );
};

export default Alignments;
