import React, { useEffect, useState } from "react";
import Condition_List from "./Condition_List";
import styles from "./Styles.module.css";

const ConditionList = () => {
  const [conditions, setConditions] = useState([]);
  const [conditionSelect, setConditionSelect] = useState([]);
  const [conditionName, setConditionName] = useState("");

  const getConditionsData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/conditions/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setConditions(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedConditionsData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/conditions/${conditionName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setConditionSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateConditionName = (index) => {
    setConditionName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getConditionsData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got conditionName for get getSelectedConditionsData
  useEffect(() => {
    const controller = new AbortController();
    if (conditionName !== "") {
      getSelectedConditionsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [conditionName]);

  const renderTextOneSkillsDetails = (conditions) => {
    if (!conditions || Object.keys(conditions).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.conditiondisplay}`}>
        <h1>Condition Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {conditions.name}
          </li>
          <li>
            <strong>Description:</strong>
            {conditions.desc.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Condition</h1>
      {conditions.map((item) => {
        return (
          <Condition_List
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateConditionName={updateConditionName}
          ></Condition_List>
        );
      })}

      {renderTextOneSkillsDetails(conditionSelect)}
    </div>
  );
};

export default ConditionList;
