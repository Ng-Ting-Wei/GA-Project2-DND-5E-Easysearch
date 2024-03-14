import React, { useEffect, useState } from "react";
import Race from "./Race";
import Subrace from "./Subrace";
import RaceTraits from "./RaceTraits";

const Display = () => {
  const [races, setRaces] = useState([]);
  const [raceTraits, setRaceTraits] = useState([]);
  const [subraces, setSubraces] = useState([]);
  const [raceName, setRaceName] = useState("");

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
  const updateRaceName = (name) => {
    setRaceName(name);
  };

  const getSubraceData = async (signal) => {
    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/races/${raceName}/subraces`,
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

  const getRaceTraits = async (signal) => {
    try {
      const res = await fetch("https://www.dnd5eapi.co/api/traits", { signal });
      if (res.ok) {
        const data = await res.json();
        setRaceTraits(data.results.map((result) => result));
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
    getRaceTraits(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // confirm got racename for get subracedata
  useEffect(() => {
    const controller = new AbortController();
    if (raceName !== "") {
      getSubraceData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [raceName]);

  return (
    <div>
      <h1>Race</h1>
      <div>
        <div>Name</div>
      </div>
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
      <h1>Subrace</h1>
      <div>
        <div>Name</div>
      </div>
      {subraces.map((item) => {
        return (
          <Subrace
            key={item.index}
            indexSR={item.index}
            nameSR={item.name}
            urlSR={item.url}
            getSubraceData={getSubraceData}
          ></Subrace>
        );
      })}
      {/* 
      {raceTraits.map((item) => {
        return (
          <RaceTraits
            key={item.index}
            indexRT={item.index}
            nameRT={item.name}
            urlRT={item.url}
          ></RaceTraits>
        );
      })} */}
    </div>
  );
};

export default Display;
