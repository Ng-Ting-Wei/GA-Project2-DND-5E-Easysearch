import React, { useEffect, useState } from "react";
import Class from "./Class";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [classSelect, setClassSelect] = useState([]);
  const [className, setClassName] = useState("");

  const getClassesData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/classes/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setClasses(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedClassData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/classes/${className}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setClassSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateClassName = (index) => {
    setClassName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getClassesData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (className !== "") {
      getSelectedClassData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [className]);

  const renderTextOneClassDetails = (classes, section) => {
    // return a message indicating no classes details available
    if (!classes || Object.keys(classes).length === 0) {
      return null;
    }
    switch (section) {
      case "classDetails":
        return (
          <div>
            <h1>Class</h1>
            <h2>Class Details:</h2>
            <ul>
              {/* Render other specific properties of the classes object here */}
              <ul>
                <li>
                  <strong>Name:</strong> {classes.name}
                </li>
                <li>
                  <strong>Hitdice:</strong> {classes.hit_die}
                </li>
              </ul>
            </ul>
          </div>
        );
      case "startingProficiencies":
        return (
          <div>
            <h2>Starting Proficiencies:</h2>
            <ul>
              {classes.proficiencies.map((proficiency) => (
                <li key={proficiency.index}>
                  <strong>{proficiency.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        );
      case "proficiencyChoices":
        return (
          <div>
            <h2>Proficiency Choices:</h2>
            {classes.proficiency_choices.map((choice, index) => (
              <div key={index}>
                <h3>{`Choose ${choice.choose} from:`}</h3>
                <ul>
                  {choice.from.options.map((option) => (
                    <li key={option.item?.index}>
                      <strong>{option.item?.name}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case "spellcasting":
        return (
          <div>
            <h2>Spellcasting:</h2>
            <ul>
              {classes.spellcasting &&
                classes.spellcasting.info.map((spellInfo) => (
                  <li key={spellInfo.name}>
                    <strong>{spellInfo.name}</strong>: {spellInfo.desc}
                  </li>
                ))}
            </ul>
          </div>
        );
      case "startingEquipment":
        return (
          <div>
            <h2>Starting Equipment:</h2>
            <ul>
              {classes.starting_equipment.map((equipment) => (
                <li key={equipment.equipment.index}>
                  <strong>{equipment.equipment.name}</strong>: Quantity{" "}
                  {equipment.quantity}
                </li>
              ))}
            </ul>
          </div>
        );
      case "startingEquipmentOptions":
        return (
          <div>
            <h2>Starting Equipment Options:</h2>
            {classes.starting_equipment_options.map((option, index) => (
              <div key={index}>
                <div>{option.desc}</div>
              </div>
            ))}
          </div>
        );
      case "multiClassing":
        if (!classes.multi_classing) {
          return null;
        }
        let prerequisites = classes.multi_classing.prerequisites || [];
        let proficiencyOptions =
          classes.multi_classing.prerequisite_options?.from?.options || [];

        return (
          <div>
            <h2>Multi-classing:</h2>
            <ul>
              <li>
                <strong>Prerequisites:</strong>{" "}
                {prerequisites.map((prereq) => (
                  <span key={prereq.ability_score.index}>
                    {prereq.ability_score.name} (Minimum Score:{" "}
                    {prereq.minimum_score})
                  </span>
                ))}
              </li>
              <li>
                <strong>Proficiencies:</strong>{" "}
                {proficiencyOptions.map((prof) => (
                  <span key={prof.index}>{prof.name}, </span>
                ))}
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Class List</h1>
      <div>Name</div>
      {classes.map((item) => {
        return (
          <Class
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            getClassesData={getClassesData}
            updateClassName={updateClassName}
          ></Class>
        );
      })}
      {renderTextOneClassDetails(classSelect, "classDetails")}
      {renderTextOneClassDetails(classSelect, "startingProficiencies")}
      {renderTextOneClassDetails(classSelect, "proficiencyChoices")}
      {renderTextOneClassDetails(classSelect, "spellcasting")}
      {renderTextOneClassDetails(classSelect, "startingEquipment")}
      {renderTextOneClassDetails(classSelect, "startingEquipmentOptions")}
      {renderTextOneClassDetails(classSelect, "multiClassing")}
    </div>
  );
};

export default ClassList;
