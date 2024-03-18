import React from "react";
import styles from "./Styles.module.css";

const School_of_Magic = (props) => {
  const handleSchoolofMagic = () => {
    props.updateSchoolofMagicName(props.index);
  };
  return (
    <div>
      <button
        className={`${styles.schoolofmagic}`}
        onClick={handleSchoolofMagic}
      >
        {props.name}
      </button>
    </div>
  );
};

export default School_of_Magic;
