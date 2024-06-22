import React, { useEffect, useRef, useState } from "react";

const About = ({data}) => {
  const abtSecRef = useRef(null);
  const abtWrapRef = useRef(null);
  const abtCounterRef = useRef(null);
  const abtProjectsRef = useRef(null);
  const progressBarRef = useRef(null);

  const [newCondition, setNewCondition] = useState("");

  useEffect(() => {
    const handleScrollMain = () => {
      const rectAbtSec = abtSecRef.current.getBoundingClientRect();

      let setCondition = "";

      if (rectAbtSec.top <= window.innerHeight && rectAbtSec.top >= 0) {
        setCondition = "entered";
      } else if (rectAbtSec.top <= 0) {
        setCondition = "top crossed";
      }

      if (rectAbtSec.bottom <= window.innerHeight) {
        setCondition = "bottom crossed";
      }

      if (newCondition !== setCondition) {
        setNewCondition(() => {
          showAlert(setCondition);
          return setCondition;
        });
      }

      const progressArea = abtSecRef.current.offsetHeight - window.innerHeight;
      let currentPosition = -rectAbtSec.top / progressArea;
      if (currentPosition >= 1) {
        currentPosition = 1;
      }

      const progress = Math.round(currentPosition * 100) + "%";
      progressBarRef.current.style.height = progress;

      if (currentPosition >= -0.25 && currentPosition <= 0.3) {
        abtWrapRef.current.classList.remove("hide");
        abtCounterRef.current.classList.add("hide");
        abtProjectsRef.current.classList.add("hide");
      } else if (currentPosition > 0.3 && currentPosition <= 0.6) {
        abtWrapRef.current.classList.remove("hide");
        abtCounterRef.current.classList.remove("hide");
        abtProjectsRef.current.classList.add("hide");
      } else if (currentPosition > 0.6 && currentPosition <= 1) {
        abtWrapRef.current.classList.remove("hide");
        abtCounterRef.current.classList.remove("hide");
        abtProjectsRef.current.classList.remove("hide");
      } else {
        abtWrapRef.current.classList.add("hide");
        abtCounterRef.current.classList.add("hide");
        abtProjectsRef.current.classList.add("hide");
      }
    };

    const showAlert = (condition) => {
      const abt = document.querySelector(".abt");
      if (condition === "entered") {
        abt.classList.remove("abtm", "fx");
        abt.classList.add("abtp");
      }
      if (condition === "top crossed") {
        abt.classList.remove("abtp", "abtm");
        abt.classList.add("fx");
      }
      if (condition === "bottom crossed") {
        abt.classList.remove("fx", "abtp");
        abt.classList.add("abtm");
      }
    };

    window.addEventListener("scroll", handleScrollMain);
    return () => window.removeEventListener("scroll", handleScrollMain);
  }, [newCondition]);

  return (
    <section className="abt-sec" id="about" ref={abtSecRef}>
      <div className="abt">
        <div className="abt-wrap hide" ref={abtWrapRef}>
          <h2>About Me</h2>
          <p>{data.owner.about}</p>
        </div>
        <div className="abt-counter hide" ref={abtCounterRef}>
          <div className="counter">
            <h2>10+</h2>
            <p>Projects</p>
          </div>
          <div className="counter">
            <h2>5+</h2>
            <p>
              Years of <br /> Experience
            </p>
          </div>
          <div className="counter">
            <h2>100+</h2>
            <p>
              Happy <br /> Clients
            </p>
          </div>
        </div>
        <div className="abt-projects hide" ref={abtProjectsRef}>
          <h2>Current Projects</h2>
          <div className="abt-projc">
            {data.owner.recent_projects.slice(0, 3).map((project, index) => (
              <div className="abt-proj" key={index}>
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/ea0p9acu0ll0mgygksz2b/girl-prgm.jpg?rlkey=j1b9xktcd671vnzjd3kxqwf6z&e=1&st=s5gr093g&dl=0"
                  alt=""
                />
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="progress">
          <div className="prgbr" ref={progressBarRef}></div>
          <i className="fas fa-crown"></i>
        </div>
      </div>
    </section>
  );
};

export default About;
