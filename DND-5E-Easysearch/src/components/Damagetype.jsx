import React, { useEffect, useState } from "react";
import Damage_Type from "./Damage_Type";
import styles from "./Styles.module.css";

const Damagetype = () => {
  const [damagetypes, setDamagetypes] = useState([]);
  const [damagetypeSelect, setDamagetypeSelect] = useState([]);
  const [damagetypeName, setDamagetypeName] = useState("");

  const getDamagetypeData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/damage-types/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setDamagetypes(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedDamagetypesData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/damage-types/${damagetypeName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setDamagetypeSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateDamagetypeName = (index) => {
    setDamagetypeName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getDamagetypeData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got damagetypeName for get getSelectedDamagetypesData
  useEffect(() => {
    const controller = new AbortController();
    if (damagetypeName !== "") {
      getSelectedDamagetypesData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [damagetypeName]);

  const renderTextOneDamagetypesDetails = (damagetype) => {
    if (!damagetype || Object.keys(damagetype).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.damagetypedisplay}`}>
        <h1>Damagetype Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {damagetype.name}
          </li>
          <li>
            <strong>Description:</strong>
            {damagetype.desc.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Damage Type</h1>
      {damagetypes.map((item) => {
        return (
          <Damage_Type
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateDamagetypeName={updateDamagetypeName}
          ></Damage_Type>
        );
      })}
      {renderTextOneDamagetypesDetails(damagetypeSelect)}
    </div>
  );
};

export default Damagetype;
