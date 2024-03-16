import React, { useEffect, useState } from "react";
import Feats_List from "./Feats_List";
import styles from "./Styles.module.css";

const FeatList = () => {
  const [feats, setFeats] = useState([]);
  const [featSelect, setFeatSelect] = useState([]);
  const [featName, setFeatName] = useState("");

  const getFeatsData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/feats/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setFeats(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedFeatsData = async (signal) => {
    try {
      const res = await fetch(`https://www.dnd5eapi.co/api/feats/${featName}`, {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setFeatSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateFeatName = (index) => {
    setFeatName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getFeatsData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got featName for get getSelectedFeatsData
  useEffect(() => {
    const controller = new AbortController();
    if (featName !== "") {
      getSelectedFeatsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [featName]);

  const renderTextOneFeatsDetails = (feats) => {
    if (!feats || Object.keys(feats).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.featsdisplay}`}>
        <h1>Skill Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {feats.name}
          </li>
          <li>
            <strong>Description:</strong> {feats.desc}
          </li>
          <li>
            <strong>Prerequisites:</strong>
            <ul>
              {feats.prerequisites.map((prereq, index) => (
                <li key={index}>
                  <strong>
                    {prereq.ability_score.name} (Minimum Score:{" "}
                    {prereq.minimum_score})
                  </strong>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Feat</h1>
      {feats.map((item) => {
        return (
          <Feats_List
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateFeatName={updateFeatName}
          ></Feats_List>
        );
      })}
      {renderTextOneFeatsDetails(featSelect)}
    </div>
  );
};

export default FeatList;
