import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header, Footer } from './components/pagesetup';
import reportWebVitals from './reportWebVitals';
import App from './App';
import database from "./database/admin.json";

function pagesetup(id, element) {
  const tag = ReactDOM.createRoot(document.getElementById(id));
  tag.render(
    <React.StrictMode>
      {element}
    </React.StrictMode>
  );
}
pagesetup('header', <Header data={database} />);
pagesetup('root', <App data={database} />);
pagesetup('footer', <Footer data={database} />);
reportWebVitals();
