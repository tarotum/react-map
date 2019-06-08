import React from "react";

const Autor = () => {
  return (
    <>
      <h2 className="content__title">About autor</h2>
      <div className="content__text">
        <p>Onskiv Maxim</p>
        <p>Junior front-end developer</p>
        <p>Contacts</p>
        <ul>
          <li>
            Email:{" "}
            <a
              href="mailto:onyskiv.maxim@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              onyskiv.maxim@gmail.com
            </a>
          </li>
          <li>
            Telegram:{" "}
            <a
              href="https://t.me/tarotum"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://t.me/tarotum
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/tarotum"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://github.com/tarotum
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Autor;
