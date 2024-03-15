import React, { useEffect, useState } from "react";
import Alignments from "./Alignments";

const AlignmentList = () => {
  const [alignments, setAlignments] = useState([]);
  const [alignmentSelect, setAlignmentSelect] = useState([]);
  const [alignmentName, setAlignmentName] = useState([]);

  const getAlignmentData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/alignments/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setAlignments(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedAlignmentData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/alignments/${alignmentName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAlignmentSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateAlignmentName = (index) => {
    setAlignmentName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getAlignmentData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (alignmentName !== "") {
      getSelectedAlignmentData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [alignmentName]);

  const renderTextOneBackgroundDetails = (alignment) => {
    if (!alignment || Object.keys(alignment).length === 0) {
      return null;
    }
    return (
      <div>
        <h1>Alignment Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {alignment.name}
          </li>
          <li>
            <strong>Abbreviation:</strong> {alignment.abbreviation}
          </li>
          <li>
            <strong>Description:</strong> {alignment.desc}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Alignment List</h1>
      <div>Name</div>
      {alignments.map((item) => {
        return (
          <Alignments
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateAlignmentName={updateAlignmentName}
          ></Alignments>
        );
      })}
      {renderTextOneBackgroundDetails(alignmentSelect)}
    </div>
  );
};

export default AlignmentList;
