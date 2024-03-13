import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Table from "./pages/Table";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import CharacterCreation from "./pages/CharacterCreation";
import Backgrounds from "./pages/Backgrounds";
import Classes from "./pages/Classes";
import Races from "./pages/Races";
import Alignments from "./pages/Alignments";
import Skills from "./pages/Skills";
import Feats from "./pages/Feats";
import Spells from "./pages/Spells";
import Equpments from "./pages/Equipments";
import AbilityScore from "./pages/AbilityScores";
import Conditions from "./pages/Conditions";
import DamageTypes from "./pages/DamageTypes";
import MagicalEquipments from "./pages/MagicalEquipments";
import SchoolofMagic from "./pages/SchoolofMagics";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />}></Route>
        <Route path="main" element={<Main />}></Route>
        <Route path="table/:id" element={<Table />}></Route>
        <Route path="table/list" element={<Info />}></Route>
        <Route path="charactercreation" element={<CharacterCreation />}></Route>
        <Route path="abilityscore" element={<AbilityScore />}></Route>
        <Route path="races" element={<Races />}></Route>
        <Route path="classes" element={<Classes />}></Route>
        <Route path="backgrounds" element={<Backgrounds />}></Route>
        <Route path="alignments" element={<Alignments />}></Route>
        <Route path="skills" element={<Skills />}></Route>
        <Route path="feats" element={<Feats />}></Route>
        <Route path="spells" element={<Spells />}></Route>
        <Route path="equipments" element={<Equpments />}></Route>
        <Route path="conditions" element={<Conditions />}></Route>
        <Route path="damagetypes" element={<DamageTypes />}></Route>
        <Route path="magicalequipments" element={<MagicalEquipments />}></Route>
        <Route path="schoolofmagics" element={<SchoolofMagic />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
