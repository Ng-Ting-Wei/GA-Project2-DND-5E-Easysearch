import React, { useEffect, useState } from "react";
import Abilityscore from "./Abilityscore";
import styles from "./Styles.module.css";

const Ability_Score = () => {
  const [abilityscore, setAbilityscore] = useState([]);
  const [abilityscoreSelectedIndex, setAbilityscoreSelectedIndex] =
    useState("");
  const [abilityscoreSelected, setAbilityscoreSelected] = useState("");

  const getAbilityScoreData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/ability-scores/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setAbilityscore(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateAbilityscoreIndex = (index) => {
    setAbilityscoreSelectedIndex(index);
  };

  const getSelectedAbilityscore = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/ability-scores/${abilityscoreSelectedIndex.toLowerCase()}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAbilityscoreSelected(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getAbilityScoreData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (abilityscoreSelectedIndex !== "") {
      getSelectedAbilityscore(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [abilityscoreSelectedIndex]);

  const renderTextAbilityscoreDetails = (ability, section) => {
    // return a message indicating no ability details available
    if (!ability || Object.keys(ability).length === 0) {
      return null;
    }
    switch (section) {
      case "abilityscoreDetails":
        return (
          <div className={`${styles.abilityscoredisplay}`}>
            <h2>Score Details:</h2>
            <ul>
              {/* Render other specific properties of the ability object here */}
              <ul>
                <li>
                  <strong>Name:</strong> {ability.full_name}
                </li>
                <li>
                  <strong>Description:</strong> {ability.desc}
                </li>
              </ul>
            </ul>
          </div>
        );
      case "skillsDetails":
        return (
          <div className={`${styles.abilityscoredisplay}`}>
            <h2>Skills:</h2>
            <ul>
              {ability.skills.map((item) => (
                <li key={item.index}>
                  <strong>{item.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div>
      <h1>Ability Score</h1>
      {abilityscore.map((item) => {
        return (
          <Abilityscore
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            getAbilityScoreData={getAbilityScoreData}
            updateAbilityscoreIndex={updateAbilityscoreIndex}
          ></Abilityscore>
        );
      })}
      {renderTextAbilityscoreDetails(
        abilityscoreSelected,
        "abilityscoreDetails"
      )}
      {renderTextAbilityscoreDetails(abilityscoreSelected, "skillsDetails")}
    </div>
  );
};

export default Ability_Score;
