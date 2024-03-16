import React from "react";
import ClassList from "../components/ClassList";
import styles from "../components/Styles.module.css";

const Classes = () => {
  return (
    <div className={`${styles.background}`}>
      <ClassList></ClassList>
    </div>
  );
};

export default Classes;
