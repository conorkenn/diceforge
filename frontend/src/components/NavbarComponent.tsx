import React from "react";

const NavbarComponent: React.FC = () => {
  return (
    <nav
      style={{
        padding: "10px",
        backgroundColor: "#264653",
        color: "#E9C46A",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0 }}>DiceForge</h1>
      <div>
        <a
          href="https://conorkennedy.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#E9C46A", textDecoration: "none" }}
        >
          conorkennedy.com
        </a>
      </div>
    </nav>
  );
};

export default NavbarComponent;
