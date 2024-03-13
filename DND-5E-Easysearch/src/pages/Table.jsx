import React from "react";
import { useParams } from "react-router-dom";

const Table = () => {
  const params = useParams();
  return <h1>Members {params.id}</h1>;
};

export default Table;
