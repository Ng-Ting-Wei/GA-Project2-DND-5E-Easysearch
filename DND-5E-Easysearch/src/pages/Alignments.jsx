import React from "react";
import AlignmentList from "../components/AlignmentList";
import styles from "../components/Styles.module.css";

const Alignments = () => {
  return (
    <div className={`${styles.background}`}>
      <AlignmentList></AlignmentList>
    </div>
  );
};

export default Alignments;
