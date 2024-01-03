import React, { useContext } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className={styles.container}>
        <div style={{ textAlign: "left" }}>HEADER</div>
        <div style={{ fontSize: ".6em", paddingTop: 15, textAlign: "right" }}>
          {authContext.UserId === "00000000-0000-0000-0000-000000000000" ? (
            <Link to="/login" style={{ color: "white" }}>
              login
            </Link>
          ) : (
            <a
              style={{ color: "white", textDecoration: "none" }}
              href={
                authContext.Claims.find(
                  (claim) => claim.type === "bff:logout_url"
                )?.value
              }
            >
              logout
            </a>
          )}
        </div>
      </div>
    </>
  );
}
