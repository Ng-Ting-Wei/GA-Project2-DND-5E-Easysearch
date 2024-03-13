import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="container">
      <div>
        <Link to="/info/a">A</Link>
      </div>
      <div>
        <Link to="/info/b">B</Link>
      </div>
    </div>
  );
};

export default Info;
