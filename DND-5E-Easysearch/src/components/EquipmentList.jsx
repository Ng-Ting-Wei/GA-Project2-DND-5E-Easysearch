import React, { useEffect, useState } from "react";
import Equipment_List from "./Equipment_List";
import styles from "./Styles.module.css";

const EquipmentList = () => {
  const [equipments, setEquipments] = useState([]);
  const [equipmentSelect, setEquipmentSelect] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");

  const getEquipmentData = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/equipment/", {
        signal,
      });
      if (res.ok) {
        const data = await res.json();
        setEquipments(data.results.map((result) => result));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const getSelectedEquipmentsData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/equipment/${equipmentName}`,
        {
          signal,
        }
      );
      if (res.ok) {
        const data = await res.json();
        setEquipmentSelect(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  const updateEquipmentName = (index) => {
    setEquipmentName(index);
  };

  useEffect(() => {
    const controller = new AbortController();
    getEquipmentData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got equipmentName for get getSelectedEquipmentssData
  useEffect(() => {
    const controller = new AbortController();
    if (equipmentName !== "") {
      getSelectedEquipmentsData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [equipmentName]);

  const renderTextOneEquipmentsDetails = (equipment) => {
    if (!equipment || Object.keys(equipment).length === 0) {
      return null;
    }
    return (
      <div className={`${styles.equipmentdisplay}`}>
        <h1>Equipment Details:</h1>
        <ul>
          <li>
            <strong>Name:</strong> {equipment.name}
          </li>
          <li>
            <strong>Equipment Category:</strong>{" "}
            {equipment.equipment_category.name}
          </li>
          <ul>
            {equipment.gear_category && (
              <li>
                <strong>Gear Category:</strong> {equipment.gear_category.name}
              </li>
            )}
            {equipment.tool_category && (
              <li>
                <strong>Tool Category:</strong> {equipment.tool_category}
              </li>
            )}
            {equipment.vehicle_category && (
              <li>
                <strong>Vehicle Category:</strong> {equipment.vehicle_category}
              </li>
            )}
            {equipment.weapon_category && (
              <li>
                <strong>Weapon Category:</strong> {equipment.weapon_category}
              </li>
            )}
          </ul>

          <li>
            <strong>Cost:</strong> {equipment.cost.quantity}
            {equipment.cost.unit}
          </li>
          <li>
            <strong>Weight:</strong> {equipment.weight} lb
          </li>
          {equipment.desc.length > 0 && (
            <li>
              <strong>Description:</strong>
              {equipment.desc.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </li>
          )}
          {equipment.damage && (
            <li>
              <strong>Damage:</strong> {equipment.damage.damage_dice}{" "}
              {equipment.damage.damage_type.name}
            </li>
          )}
          {equipment.range && (
            <li>
              <strong>Range:</strong> {equipment.range.normal} feet
            </li>
          )}
          {equipment.properties.length > 0 && (
            <li>
              <strong>Properties:</strong>{" "}
              {equipment.properties.map((prop) => prop.name).join(", ")}
            </li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className={`${styles.word}`}>Equipment</h1>
      {equipments.map((item) => {
        return (
          <Equipment_List
            key={item.index}
            index={item.index}
            name={item.name}
            url={item.url}
            updateEquipmentName={updateEquipmentName}
          ></Equipment_List>
        );
      })}

      {renderTextOneEquipmentsDetails(equipmentSelect)}
    </div>
  );
};

export default EquipmentList;
