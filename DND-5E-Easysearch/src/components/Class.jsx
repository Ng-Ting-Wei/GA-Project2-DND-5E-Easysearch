import React from "react";
import styles from "./Styles.module.css";

const Class = (props) => {
  const handleClassName = () => {
    props.updateClassName(props.index);
  };
  return (
    <div>
      <button className={`${styles.class}`} onClick={handleClassName}>
        {props.name}
      </button>
    </div>
  );
};

export default Class;
