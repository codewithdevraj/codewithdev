import "../css/App.css";
import "../css/Responsive.css"
import React, { useState, useEffect, useRef } from "react";

 

const Header = ({data})=> {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [navHidden, setNavHidden] = useState(false);
  const [navLinksHidden, setNavLinksHidden] = useState(false);
  const [barsRotated, setBarsRotated] = useState(false);

  const navRef = useRef(null);
  const navLinksRef = useRef(null);
  const barsRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setNavHidden(true);
      } else if (currentScrollTop < lastScrollTop) {
        // Scrolling up
        setNavHidden(false);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        const newTimeout = setTimeout(() => {
          if (currentScrollTop === 0) {
            setNavHidden(false);
          } else if (currentScrollTop !== 0 && !navLinksHidden) {
            setNavHidden(true);
          }
        }, 2000);
        setScrollTimeout(newTimeout);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollTop, scrollTimeout, navLinksHidden]);

  const handleHamburgerClick = () => {
    setNavLinksHidden(!navLinksHidden);
    setBarsRotated(!barsRotated);
    window.scrollBy(0, -2);
  };
  return (
    <header>
      <nav id="nav" className={`nav ${navHidden ? "hide" : ""}`} ref={navRef}>
        <div className="navbar" id="navbar">
          <div className="left-nav">
            <a href="index.html" className="logo">
              <img
                src={data.website.imgurl}
                alt=""
              />
              <h2>{data.website.name}</h2>
            </a>
          </div>
          <div className="right-nav">
            <div
              className={`navlinks ${navLinksHidden ? "hide" : ""}`}
              ref={navLinksRef}
            >
              <ul>
                {Object.entries(data.links.navlinks).map(([name, url]) => (
                  <li key={name}>
                    <a href={url}>{name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-user"></div>
            <button id="hamburger" onClick={handleHamburgerClick}>
              <div
                className={`bars ${barsRotated ? "rotate" : ""}`}
                id="bars"
                ref={barsRef}
              >
                <div className="bar" id="bar1"></div>
                <div className="bar" id="bar2"></div>
                <div className="bar" id="bar3"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
const Footer = ({data}) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <footer>
      <div className="f1" id="f1">
        <div className="flg">
          <img src={data.website.imgurl} alt="" />
          <h2>{data.website.name}</h2>
        </div>
        <div className="fabt">
          <h2>About us</h2>
          <p>{data.website.description}</p>
        </div>
      </div>
      <hr />
      <div className="f2">
        {Object.keys(data.links.footerlinks).map((listKey, index) => (
          <div className="f2l" key={index}>
            <h3>{listKey.replace("_", " ")}</h3>
            <ul>
              {Object.entries(data.links.footerlinks[listKey]).map(
                ([linkKey, linkValue], linkIndex) => (
                  <li key={linkIndex}>
                    <a href={linkValue}>{linkKey}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="f3">
        <h3>Follow us</h3>
        <div className="social">
          <a
            href={data.links.sociallinks.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href={data.links.sociallinks.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href={data.links.sociallinks.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href={data.links.sociallinks.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href={data.links.sociallinks.github}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div className="f4">
        <h3>Contact us</h3>
        <div className="f4c">
          <div className="f4l">
            <div className="f4fim">
              <img
                src="https://dl.dropboxusercontent.com/scl/fi/ea0p9acu0ll0mgygksz2b/girl-prgm.jpg?rlkey=j1b9xktcd671vnzjd3kxqwf6z&e=1&st=s5gr093g&dl=0"
                alt=""
              />
            </div>
            <form action="" method="POST" netlify="true">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              <label htmlFor="tel">Mobile no.</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Mobile no."
                required
              />
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                required
              ></textarea>
              <div className="f4fbtn">
                <button type="submit" className="f4btn">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="f4r">
            <p>
              <i className="fas fa-map-marker-alt"></i>{" "}
              <span>
                {data.address1}, {data.district}, {data.state}, {data.country},{" "}
                {data.pincode}{" "}
              </span>
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> {data.phone}
            </p>
            <p>
              <i className="fas fa-envelope"></i>{" "}
              <a href={`mailto:${data ? data.email : "info@iamdevraj.me"}`}>
                {data.email}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="copy">
        <p>&copy; 2021 Code With Dev. All rights reserved.</p>
        <p>
          Made with love by{" "}
          <a href="https://www.linkedin.com/in/devraj-freelancer/">Devraj</a>{" "}
          &hearts;
        </p>
      </div>
    </footer>
  );
}
export {
  Header,
  Footer
};
