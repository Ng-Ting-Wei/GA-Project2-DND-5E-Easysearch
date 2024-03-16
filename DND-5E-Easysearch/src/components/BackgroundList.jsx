import React, { useEffect, useState } from "react";
import Back_Ground from "./Back_Ground";
import styles from "./Styles.module.css";

const BackgroundList = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [backgroundSelect, setbackgroundSelect] = useState([]);
  const [backgroundName, setbackgroundName] = useState("");

  const getBackgroundData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/backgrounds/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setBackgrounds(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedBackgroundData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/backgrounds/${backgroundName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setbackgroundSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateBackgroundName = (index) => {
    setbackgroundName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getBackgroundData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got backgroundName for get getSelectedBackgroundData
  useEffect(() => {
    const controller = new AbortController();
    if (backgroundName !== "") {
      getSelectedBackgroundData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [backgroundName]);

  const renderTextOneBackgroundDetails = (backgrounds, section) => {
    // return a message indicating no background details available
    if (!backgrounds || Object.keys(backgrounds).length === 0) {
      return null;
    }
    switch (section) {
      case "backgroundsDetails":
        return (
          <div>
            <h1>Background</h1>
            <h2>Background Details:</h2>
            <ul>
              <li>
                <strong>Name:</strong> {backgrounds.name}
              </li>
            </ul>
          </div>
        );
      case "startingProficiencies":
        return (
          <div>
            <h2>Starting Proficiencies:</h2>
            <ul>
              {backgrounds.starting_proficiencies.map((proficiency) => (
                <li key={proficiency.index}>{proficiency.name}</li>
              ))}
            </ul>
          </div>
        );
      case "languageOptions":
        return (
          <div>
            <h2>Language Options:</h2>
            <div>
              Choose {backgrounds.language_options.choose}{" "}
              {backgrounds.language_options.type}
            </div>
          </div>
        );
      case "startingEquipment":
        return (
          <div>
            <h2>Starting Equipment:</h2>
            <ul>
              {backgrounds.starting_equipment.map((equipment) => (
                <li key={equipment.equipment.index}>
                  {equipment.quantity}x {equipment.equipment.name}
                </li>
              ))}
            </ul>
          </div>
        );
      case "startingEquipmentOptions":
        return (
          <div>
            <h2>Starting Equipment Options:</h2>
            <ul>
              {backgrounds.starting_equipment_options.map((option) => (
                <li key={option.from.equipment_category.index}>
                  <div>
                    Choose {option.choose}:{" "}
                    {option.from.equipment_category.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      case "feature":
        return (
          <div>
            <h2>Feature:</h2>
            <div>{backgrounds.feature.name}</div>
            <ul>
              {backgrounds.feature.desc.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        );
      case "personalityTraits":
        return (
          <div>
            <h2>Personality Traits:</h2>
            <div>Choose {backgrounds.personality_traits.choose}:</div>
            <ul>
              {backgrounds.personality_traits.from.options.map(
                (option, index) => (
                  <li key={index}>{option.string}</li>
                )
              )}
            </ul>
          </div>
        );
      case "ideals":
        return (
          <div>
            <h2>Ideals:</h2>
            <div>Choose {backgrounds.ideals.choose}:</div>
            <ul>
              {backgrounds.ideals.from.options.map((option, index) => (
                <li key={index}>
                  {option.desc} (
                  {option.alignments
                    .map((alignment) => alignment.name)
                    .join(", ")}
                  )
                </li>
              ))}
            </ul>
          </div>
        );
      case "bonds":
        return (
          <div>
            <h2>Bonds:</h2>
            <div>Choose {backgrounds.bonds.choose}:</div>
            <ul>
              {backgrounds.bonds.from.options.map((option, index) => (
                <li key={index}>{option.string}</li>
              ))}
            </ul>
          </div>
        );
      case "flaws":
        return (
          <div>
            <h2>Flaws:</h2>
            <div>Choose {backgrounds.flaws.choose}:</div>
            <ul>
              {backgrounds.flaws.from.options.map((option, index) => (
                <li key={index}>{option.string}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.word}`}>
      <h1 className={`${styles.word}`}>Background</h1>
      {backgrounds.map((item) => {
        return (
          <Back_Ground
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateBackgroundName={updateBackgroundName}
          ></Back_Ground>
        );
      })}

      {renderTextOneBackgroundDetails(backgroundSelect, "backgroundDetails")}
      {renderTextOneBackgroundDetails(
        backgroundSelect,
        "startingProficiencies"
      )}
      {renderTextOneBackgroundDetails(backgroundSelect, "languageOptions")}
      {renderTextOneBackgroundDetails(backgroundSelect, "startingEquipment")}
      {renderTextOneBackgroundDetails(
        backgroundSelect,
        "startingEquipmentOptions"
      )}
      {renderTextOneBackgroundDetails(backgroundSelect, "feature")}
      {renderTextOneBackgroundDetails(backgroundSelect, "personalityTraits")}
      {renderTextOneBackgroundDetails(backgroundSelect, "ideals")}
      {renderTextOneBackgroundDetails(backgroundSelect, "bonds")}
      {renderTextOneBackgroundDetails(backgroundSelect, "flaws")}
    </div>
  );
};

export default BackgroundList;
