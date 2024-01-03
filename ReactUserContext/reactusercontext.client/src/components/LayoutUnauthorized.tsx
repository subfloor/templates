import React, { ReactNode } from "react";
import styles from "./LayoutUnauthorized.module.css";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

// Importing all created components
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutUnauthorized({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Header />
      <div style={{ width: "100%" }}>{children}</div>
      <Footer />
    </div>
  );
}
