import React from "react";
import styles from "../components/Styles.module.css";
import SchoolofMagicList from "../components/SchoolofMagicList";

const SchoolofMagics = () => {
  return (
    <div className={`${styles.background}`}>
      <SchoolofMagicList></SchoolofMagicList>
    </div>
  );
};

export default SchoolofMagics;
