import React, { useEffect, useState } from "react";
import Spell_List from "./Spell_List";
import styles from "./Styles.module.css";

const SpellList = () => {
  const [spells, setSpells] = useState([]);
  const [spellSelect, setSpellSelect] = useState([]);
  const [spellName, setSpellName] = useState("");

  const getSpellsData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/spells/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setSpells(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedSpellsData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/spells/${spellName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSpellSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateSpellName = (index) => {
    setSpellName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getSpellsData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (spellName !== "") {
      getSelectedSpellsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [spellName]);

  const renderTextOneSpellsDetails = (spells) => {
    if (!spells || Object.keys(spells).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.spelldisplay}`}>
        <h1>Spell Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {spells.name}
          </li>
          <li>
            <strong>Description:</strong> {spells.desc}
          </li>
          <li>
            <strong>Higher Level:</strong> {spells.higher_level}
          </li>
          <li>
            <strong>Range:</strong> {spells.range}
          </li>
          <li>
            <strong>Components:</strong> {spells.components.join(", ")}
          </li>
          <li>
            <strong>Components:</strong> {spells.material}
          </li>
          <li>
            <strong>Ritual:</strong> {spells.ritual}
          </li>
          <li>
            <strong>Duration:</strong> {spells.duration}
          </li>
          <li>
            <strong>Concentration:</strong> {spells.concentration}
          </li>
          <li>
            <strong>Casting Time:</strong> {spells.casting_time}
          </li>
          <li>
            <strong>Level:</strong> {spells.level}
          </li>
          <li>
            <strong>Attack Type:</strong> {spells.attack_type}
          </li>
          {spells.damage && spells.damage.damage_type && (
            <li>
              <strong>Damage Type:</strong> {spells.damage.damage_type.name}
            </li>
          )}
          {spells.damage && spells.damage.damage_at_slot_level && (
            <li>
              <strong>Damage at Slot Level:</strong>
              <ul>
                {Object.entries(spells.damage.damage_at_slot_level).map(
                  ([level, damage]) => (
                    <li key={level}>
                      Level {level}: {damage}
                    </li>
                  )
                )}
              </ul>
            </li>
          )}
          <li>
            <strong>School:</strong> {spells.school.name}
          </li>
          <li>
            <strong>Class:</strong>
            <ul>
              {spells.classes.map((classItem) => (
                <li key={classItem.index}>{classItem.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1>Spell List</h1>
      <div>Name</div>
      {spells.map((item) => {
        return (
          <Spell_List
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateSpellName={updateSpellName}
          ></Spell_List>
        );
      })}

      {renderTextOneSpellsDetails(spellSelect)}
    </div>
  );
};

export default SpellList;
