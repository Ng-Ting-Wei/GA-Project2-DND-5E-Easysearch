import React, { useEffect, useState } from "react";
import Condition_List from "./Condition_List";
import styles from "./Styles.module.css";

const ConditionList = () => {
  const [conditions, setConditions] = useState([]);
  const [conditionSelect, setConditionSelect] = useState([]);
  const [conditionName, setConditionName] = useState("");

  const addToFavourites = async () => {
    try {
      // If the movie does not exist, add it to the Airtable
      const addResponse = await fetch(
        "https://api.airtable.com/v0/appV5nP3FTKxmE2em/Table%201",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_SERVER_AIRTABLE_APIKEY
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Name: conditionSelect.name,
                  Type: "text",
                  Field_ID: conditionSelect.index,
                },
              },
            ],
          }),
        }
      );
      if (!addResponse.ok) {
        throw new Error("Failed to add conditions");
      }
      window.alert("Conditions added");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

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
      <button className={`${styles.savebutton}`} onClick={addToFavourites}>
        Save Condition
      </button>
    </div>
  );
};

export default ConditionList;
