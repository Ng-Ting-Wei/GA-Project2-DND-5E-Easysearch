import React, { useEffect, useState } from "react";
import School_of_Magic from "./School_of_Magic";
import styles from "./Styles.module.css";

const SchoolofMagicList = () => {
  const [schoolofMagics, setSchoolofMagic] = useState([]);
  const [schoolofMagicSelect, setSchoolofMagicSelect] = useState([]);
  const [schoolofMagicName, setSchoolofMagicName] = useState("");

  const getSchoolofMagicData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/magic-schools/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setSchoolofMagic(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedSchoolofMagicData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/magic-schools/${schoolofMagicName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSchoolofMagicSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateSchoolofMagicName = (index) => {
    setSchoolofMagicName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getSchoolofMagicData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got equipmentName for get getSelectedSchoolofMagicData
  useEffect(() => {
    const controller = new AbortController();
    if (schoolofMagicName !== "") {
      getSelectedSchoolofMagicData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [schoolofMagicName]);

  const renderTextOneSchoolofMagicsDetails = (schoolofMagic) => {
    if (!schoolofMagic || Object.keys(schoolofMagic).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.schoolofmagicdisplay}`}>
        <h1>School of Magic Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {schoolofMagic.name}
          </li>
          <li>
            <strong>Description:</strong> {schoolofMagic.desc}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>School of Magic</h1>
      {schoolofMagics.map((item) => {
        return (
          <School_of_Magic
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateSchoolofMagicName={updateSchoolofMagicName}
          ></School_of_Magic>
        );
      })}
      {renderTextOneSchoolofMagicsDetails(schoolofMagicSelect)}
    </div>
  );
};

export default SchoolofMagicList;
