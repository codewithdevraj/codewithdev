import React, {useEffect, useRef} from "react";

const Hero = ({data}) => {
  const colh22Ref = useRef(null);
  const colh21Ref = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const colh22 = colh22Ref.current;
    const colh21 = colh21Ref.current;
    const hero = heroRef.current;

    function handleScroll() {
      const rect_hero = hero.getBoundingClientRect();

      // Hero-section Animation
      if (rect_hero.top <= window.innerHeight - 50 && rect_hero.bottom >= 300) {
        colh21.classList.remove("hide");
        colh22.classList.remove("hide");
      } else {
        colh21.classList.add("hide");
        colh22.classList.add("hide");
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="container">
        <div className="row">
          <div className="col-2 colh22 hide" ref={colh22Ref}>
            <img
              src={data.owner.imgurl}
              alt=""
              className="picture"
            />
          </div>
          <div className="col-2 colh21 hide" ref={colh21Ref}>
            <h2>
              <span>
                Hello! <i className="fas fa-comments"></i>
              </span>{" "}
              <br />I am{" "}
              <span>
                {data.owner.name} <i className="fas fa-crown"></i>
              </span>
            </h2>
            <h3>
              An aspiring <span>{data.owner.role}</span>
            </h3>
            <p>
              {data.owner.intro}
            </p>
            <div className="hbtn">
              <button className="prm-btn">Projects</button>
              <button className="sec-btn">Connect Me</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
