import React, { useEffect, useRef } from "react";

const projectsData = [
  {
    name: "html-css-js-py project",
    skills: [
      { name: "Python", percent: 10, color: "var(--color-python)" },
      { name: "HTML", percent: 40, color: "var(--color-html)" },
      { name: "CSS", percent: 50, color: "var(--color-css)" },
    ],
  },
  {
    name: "react-node project",
    skills: [
      { name: "React", percent: 20, color: "var(--color-react)" },
      { name: "Node.js", percent: 30, color: "var(--color-nodejs)" },
      { name: "SQL", percent: 50, color: "var(--color-sql)" },
    ],
  },
];

const Skills = ({data}) => {
  const skillsRef = useRef(null);

  const initProgressRing = () => {
    const progressRings = skillsRef.current.querySelectorAll(".progress-ring");

    progressRings.forEach((progressRing) => {
      const circles = progressRing.querySelectorAll("circle");
      const backgroundCircle = circles[0];
      const progressCircles = Array.from(circles).slice(1);

      const radius = parseFloat(window.getComputedStyle(backgroundCircle).r);
      const circumference = 2 * Math.PI * radius;

      backgroundCircle.style.strokeDasharray = `${circumference}`;
      backgroundCircle.style.strokeDashoffset = 0;

      let previousArcLength = 0;
      const percents = progressCircles.map((circle) =>
        parseInt(circle.getAttribute("percent"), 10)
      );

      progressCircles.forEach((circle, index) => {
        const arcLength = (percents[index] / 100) * circumference;
        const rotation = (previousArcLength / circumference) * 360;

        circle.style.strokeDasharray = `${arcLength} ${circumference}`;
        circle.style.strokeDashoffset = arcLength;
        circle.style.transformOrigin = "50% 50%";
        circle.style.transform = `rotate(${rotation}deg)`;

        let progress = 0;
        const interval = setInterval(() => {
          if (progress > 100) {
            clearInterval(interval);
          } else {
            const offset = arcLength - (progress / 100) * arcLength;
            circle.style.strokeDashoffset = offset;
            progress++;
          }
        }, 10);

        previousArcLength += arcLength;
      });
    });
  };

  const checkScroll = () => {
    const rectSkills = skillsRef.current.getBoundingClientRect();
    if (
      rectSkills.top <= window.innerHeight / 4 &&
      rectSkills.top >= window.innerHeight / 5
    ) {
      initProgressRing();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  console.log(data.owner.skills)

  return (
    <section className="skills" ref={skillsRef}>
      <div className="skills-wrap">
        <h2>Skills</h2>
        {Object.keys(data.owner.skills)
          .slice(1, 3)
          .map((skillskey, index) => (
            <div className="skills-list" key={index}>
              <h2>{skillskey}</h2>
              {data.owner.skills[skillskey].map((skill, i) => (
                <div className="skill" key={i}>
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width:
                          skill.level === "Advanced"
                            ? "100%"
                            : skill.level === "Intermediate"
                            ? "60%"
                            : "40%", // Assuming 'Beginner' or others,
                        backgroundColor: `var(--color-${skill.name
                          .replace(".", "")
                          .toLowerCase()})`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      <div className="prjctg-wrap">
        <h2>Projects</h2>
        <div className="prj-list">
          {data.owner.projects.map((project, index) => (
            <div className="prj" key={index}>
              <h3>{project.name}</h3>
              <div className="prjskls">
                <div className="prjskl">
                  <svg className="progress-ring" width="200" height="200">
                    <circle className="progress-ring__background" />
                    {project.techstack.map((skill, i) => (
                      <circle
                        key={i}
                        className={`progress-ring__circle${i}`}
                        stroke={`var(--color-${skill.tech
                          .replace(".", "")
                          .toLowerCase()})`}
                        percent={skill.percent}
                      />
                    ))}
                  </svg>
                  <div className="legend">
                    {project.techstack.map((skill, i) => (
                      <div className="legend-item" key={i}>
                        <span
                          className="legend-color"
                          style={{
                            backgroundColor: ` var(--color-${skill.tech
                              .replace(".", "")
                              .toLowerCase()})`,
                          }}
                        ></span>{" "}
                        {skill.tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
