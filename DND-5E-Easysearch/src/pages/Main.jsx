import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="container">
      <h1>Main Page</h1>
      <Link to="/charactercreation">
        <button>Character</button>
      </Link>
      <Link to="/abilityscore">
        <button>Ability Score</button>
      </Link>
      <Link to="/races">
        <button>Races</button>
      </Link>
      <Link to="/classes">
        <button>Classes</button>
      </Link>
      <Link to="/backgrounds">
        <button>Backgrounds</button>
      </Link>
      <Link to="/alignments">
        <button>Alignments</button>
      </Link>
      <Link to="/skills">
        <button>Skills</button>
      </Link>
      <Link to="/feats">
        <button>Feats</button>
      </Link>
      <Link to="/spells">
        <button>Spells</button>
      </Link>
      <Link to="/equipments">
        <button>Equipments</button>
      </Link>
      <Link to="/conditions">
        <button>Conditions</button>
      </Link>
      <Link to="/damagetypes">
        <button>Damage Type</button>
      </Link>
      <Link to="/magicalequipments">
        <button>Magical Equipment</button>
      </Link>
      <Link to="/schoolofmagics">
        <button>School of Magic</button>
      </Link>
    </div>
  );
};

export default Main;
