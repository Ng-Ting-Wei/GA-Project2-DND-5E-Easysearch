import React, { useEffect, useState } from "react";
import Race from "./Race";
import Subrace from "./Subrace";
import styles from "./Styles.module.css";

const Display = () => {
  const [races, setRaces] = useState([]);
  const [subraces, setSubraces] = useState([]);
  const [raceSelected, setRaceSelected] = useState([]);
  const [raceSelected1, setRaceSelected1] = useState([]);
  const [raceName, setRaceName] = useState("");
  const [raceDescriptions, setRaceDescriptions] = useState("");
  const [subraceDescriptions, setSubraceDescriptions] = useState("");

  const getRaceData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/races/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setRaces(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  // setting racename to get subrace data
  const updateRaceName = (name, index) => {
    setRaceName(name);
    setRaceDescriptions(index);
  };
  const updateRaceName1 = (name, index) => {
    setSubraceDescriptions(index);
  };

  const getAllRaceData = async (signal) => {
    try {
      const res = await fetch(
        // raceName needs to be in lowercase due to case sensitive
        `https://www.dnd5eapi.co/api/races/${raceDescriptions.toLowerCase()}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setRaceSelected(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSubraceData = async (signal) => {
    try {
      const res = await fetch(
        // raceName needs to be in lowercase due to case sensitive
        `https://www.dnd5eapi.co/api/races/${raceName.toLowerCase()}/subraces`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSubraces(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getAllSubRaceData = async (signal) => {
    try {
      const res = await fetch(
        // raceName needs to be in lowercase due to case sensitive
        `https://www.dnd5eapi.co/api/subraces/${subraceDescriptions.toLowerCase()}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setRaceSelected1(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getRaceData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (raceName !== "") {
      getSubraceData(controller.signal);
      getAllRaceData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [raceName]);

  useEffect(() => {
    const controller = new AbortController();
    if (subraceDescriptions !== "") {
      getAllSubRaceData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [subraceDescriptions]);

  const renderTextOneRaceDetails = (race, section) => {
    // return a message indicating no race details available
    if (!race || Object.keys(race).length === 0) {
      return null;
    }
    switch (section) {
      case "raceDetails":
        return (
          <div className={`${styles.racedisplay}`}>
            <h1>Race</h1>
            <h2>Race Details:</h2>
            <ul>
              {/* Render other specific properties of the race object here */}
              <ul>
                <li>
                  <strong>Name:</strong> {race.name}
                </li>
                <li>
                  <strong>Speed:</strong> {race.speed}
                </li>
                <li>
                  <strong>Age:</strong> {race.age}
                </li>
                <li>
                  <strong>Alignment:</strong> {race.alignment}
                </li>
                <li>
                  <strong>Size:</strong> {race.size}
                </li>
                <li>
                  <strong>Size Description:</strong> {race.size_description}
                </li>
                <li>
                  <strong>Language Description:</strong> {race.language_desc}
                </li>
              </ul>
            </ul>
          </div>
        );
      case "abilityBonuses":
        return (
          <div className={`${styles.racedisplay}`}>
            <h2>Ability Bonuses:</h2>
            <ul>
              {race.ability_bonuses.map((bonus) => (
                <li key={bonus.ability_score.index}>
                  <strong>{bonus.ability_score.name}:</strong> +{bonus.bonus}
                </li>
              ))}
            </ul>
          </div>
        );
      case "startingProficiencies":
        return (
          <div className={`${styles.racedisplay}`}>
            <h2>Starting Proficiencies:</h2>
            <ul>
              {race.starting_proficiencies.map((proficiency) => (
                <li key={proficiency.index}>
                  <strong>{proficiency.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
      case "racialTraits":
        return (
          <div className={`${styles.racedisplay}`}>
            <h2>Racial Traits:</h2>
            <ul>
              {race.traits.map((trait) => (
                <li key={trait.index}>
                  <strong>{trait.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const renderTextTwoRaceDetails = (race, section) => {
    // return a message indicating no race details available
    if (!race || Object.keys(race).length === 0) {
      return null;
    }
    switch (section) {
      case "raceDetails":
        return (
          <div className={`${styles.subracedisplay}`}>
            <h1>SubRace</h1>
            <h2>Race Details:</h2>
            <ul>
              {/* Render other specific properties of the race object here */}
              <ul>
                <li>
                  <strong>Name:</strong> {race.name}
                </li>
                <li>
                  <strong>Description:</strong> {race.desc}
                </li>
              </ul>
            </ul>
          </div>
        );
      case "abilityBonuses":
        return (
          <div className={`${styles.subracedisplay}`}>
            <h2>Ability Bonuses:</h2>
            <ul>
              {race.ability_bonuses.map((bonus) => (
                <li key={bonus.ability_score.index}>
                  <strong>{bonus.ability_score.name}:</strong> +{bonus.bonus}
                </li>
              ))}
            </ul>
          </div>
        );
      case "startingProficiencies":
        return (
          <div className={`${styles.subracedisplay}`}>
            <h2>Starting Proficiencies:</h2>
            <ul>
              {race.starting_proficiencies.map((proficiency) => (
                <li key={proficiency.index}>
                  <strong>{proficiency.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
      case "racialTraits":
        return (
          <div className={`${styles.subracedisplay}`}>
            <h2>Racial Traits:</h2>
            <ul>
              {race.racial_traits.map((trait) => (
                <li key={trait.index}>
                  <strong>{trait.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Race</h1>
      {races.map((item) => {
        return (
          <Race
            key={item.index}
            indexR={item.index}
            nameR={item.name}
            urlR={item.url}
            getRaceData={getRaceData}
            updateRaceName={updateRaceName}
          ></Race>
        );
      })}

      <div>
        {renderTextOneRaceDetails(raceSelected, "raceDetails")}
        {renderTextOneRaceDetails(raceSelected, "abilityBonuses")}
        {renderTextOneRaceDetails(raceSelected, "startingProficiencies")}
        {renderTextOneRaceDetails(raceSelected, "racialTraits")}
      </div>

      {subraces.map((item) => {
        return (
          <Subrace
            key={item.index}
            indexSR={item.index}
            nameSR={item.name}
            urlSR={item.url}
            getSubraceData={getSubraceData}
            updateRaceName1={updateRaceName1}
          ></Subrace>
        );
      })}

      <div>
        {renderTextTwoRaceDetails(raceSelected1, "raceDetails")}
        {renderTextTwoRaceDetails(raceSelected1, "abilityBonuses")}
        {renderTextTwoRaceDetails(raceSelected1, "startingProficiencies")}
        {renderTextTwoRaceDetails(raceSelected1, "racialTraits")}
      </div>
    </div>
  );
};

export default Display;
