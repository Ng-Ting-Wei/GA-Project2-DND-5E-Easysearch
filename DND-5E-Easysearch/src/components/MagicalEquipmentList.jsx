import React, { useEffect, useState } from "react";
import Magical_Equipment from "./Magical_Equipment";
import styles from "./Styles.module.css";

const MagicalEquipmentList = () => {
  const [magicalEquipments, setMagicalEquipments] = useState([]);
  const [magicalEquipmentSelect, setMagicalEquipmentSelect] = useState([]);
  const [magicalEquipmentName, setMagicalEquipmentName] = useState("");

  const getMagicalEquipmentData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/magic-items/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setMagicalEquipments(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedMagicalEquipmentsData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/magic-items/${magicalEquipmentName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMagicalEquipmentSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateMagicalEquipmentName = (index) => {
    setMagicalEquipmentName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getMagicalEquipmentData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got magicalEquipmentName for get getSelectedMagicalEquipmentsData
  useEffect(() => {
    const controller = new AbortController();
    if (magicalEquipmentName !== "") {
      getSelectedMagicalEquipmentsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [magicalEquipmentName]);

  const renderTextOneMagicalEquipmentsDetails = (magicalequipment) => {
    if (!magicalequipment || Object.keys(magicalequipment).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.magicalequipmentdisplay}`}>
        <h1>Magical Equipment Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {magicalequipment.name}
          </li>
          <li>
            <strong>Equipment Category:</strong>{" "}
            {magicalequipment.equipment_category.name}
          </li>
          <li>
            <strong>Rarity:</strong> {magicalequipment.rarity.name}
          </li>
          <ul>
            {magicalequipment.variants && (
              <li>
                <strong>Variants:</strong>{" "}
                {magicalequipment.variants.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </li>
            )}
          </ul>
          <li>
            <strong>Description:</strong>
            {magicalequipment.desc.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Magical Equipment</h1>
      <div className={`${styles.box}`}>
        {magicalEquipments.map((item) => {
          return (
            <Magical_Equipment
              key={item.index}
              index={item.index}
              name={item.name}
              url={item.url}
              updateMagicalEquipmentName={updateMagicalEquipmentName}
            ></Magical_Equipment>
          );
        })}
      </div>
      {renderTextOneMagicalEquipmentsDetails(magicalEquipmentSelect)}
    </div>
  );
};

export default MagicalEquipmentList;
