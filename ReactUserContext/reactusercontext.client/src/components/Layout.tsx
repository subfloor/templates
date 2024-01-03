import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

// Importing all created components
import Header from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}
