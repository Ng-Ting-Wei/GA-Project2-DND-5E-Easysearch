import React from "react";
import { Link } from "react-router-dom";
import styles from "../components/Styles.module.css";

const Main = () => {
  return (
    <div className="container">
      <h1>Main Page</h1>
      <Link to="/abilityscore">
        <button className={`${styles.functionoddbutton}`}>Ability Score</button>
      </Link>
      <Link to="/races">
        <button className={`${styles.functionevenbutton}`}>Races</button>
      </Link>
      <Link to="/races">
        <button className={`${styles.functionoddbutton}`}>Races</button>
      </Link>
      <Link to="/classes">
        <button className={`${styles.functionevenbutton}`}>Classes</button>
      </Link>
      <Link to="/backgrounds">
        <button className={`${styles.functionoddbutton}`}>Backgrounds</button>
      </Link>
      <Link to="/alignments">
        <button className={`${styles.functionevenbutton}`}>Alignments</button>
      </Link>
      <Link to="/skills">
        <button className={`${styles.functionoddbutton}`}>Skills</button>
      </Link>
      <Link to="/feats">
        <button className={`${styles.functionevenbutton}`}>Feats</button>
      </Link>
      <Link to="/spells">
        <button className={`${styles.functionoddbutton}`}>Spells</button>
      </Link>
      <Link to="/equipments">
        <button className={`${styles.functionevenbutton}`}>Equipments</button>
      </Link>
      <Link to="/conditions">
        <button className={`${styles.functionoddbutton}`}>Conditions</button>
      </Link>
      <Link to="/damagetypes">
        <button className={`${styles.functionevenbutton}`}>Damage Type</button>
      </Link>
      <Link to="/magicalequipments">
        <button className={`${styles.functionoddbutton}`}>
          Magical Equipment
        </button>
      </Link>
      <Link to="/schoolofmagics">
        <button className={`${styles.functionevenbutton}`}>
          School of Magic
        </button>
      </Link>
    </div>
  );
};

export default Main;
