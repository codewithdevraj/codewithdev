import React,{ useEffect,useState} from "react";
import "../css/App.css";
import "../css/Responsive.css";
import Hero from "../components/herohm";
import About from "../components/abouthm";
import Skills from "../components/skills"

const HomePage = ({ data }) => {
  if (!data) {
    return (
      <main className="main" id="main">
        <div>Loading...</div>
      </main>
    );
  }
  return (
    <main className="main" id="main">
      <Hero data={data} />
      <About data={data} />
      <Skills data={data} />
    </main>
  );
}

export {
  HomePage
}