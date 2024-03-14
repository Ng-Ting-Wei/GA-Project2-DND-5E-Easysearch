import React from "react";
import styles from "./Styles.module.css";

const Subrace = (props) => {
  const handleRaceName = () => {
    // Call the updateRaceName function when the button is clicked
    props.updateRaceName1(props.nameSR, props.indexSR);
  };
  return (
    <div>
      <button className={`${styles.race}`} onClick={handleRaceName}>
        {props.nameSR}
      </button>
    </div>
  );
};

export default Subrace;
