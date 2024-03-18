import React, { useEffect, useState } from "react";
import Skills_Listing from "./Skills_Listing";
import styles from "./Styles.module.css";

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [skillSelect, setSkillSelect] = useState([]);
  const [skillName, setSkillName] = useState("");

  const getSkillsData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/skills/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setSkills(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedSkillsData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/skills/${skillName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSkillSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateSkillName = (index) => {
    setSkillName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getSkillsData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got skillname for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (skillName !== "") {
      getSelectedSkillsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [skillName]);

  const renderTextOneSkillsDetails = (skills) => {
    if (!skills || Object.keys(skills).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.skillsdisplay}`}>
        <h1>Skill Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {skills.name}
          </li>
          <li>
            <strong>Abbreviation:</strong> {skills.abbreviation}
          </li>
          <li>
            <strong>Description:</strong> {skills.desc}
          </li>
          <li>
            <strong>Ability Score:</strong> {skills.ability_score.name}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Skill</h1>
      <div className={`${styles.boxskills}`}>
        {skills.map((item) => {
          return (
            <Skills_Listing
              key={item.index}
              index={item.index}
              name={item.name}
              url={item.url}
              updateSkillName={updateSkillName}
            ></Skills_Listing>
          );
        })}
      </div>

      {renderTextOneSkillsDetails(skillSelect)}
    </div>
  );
};

export default SkillList;
