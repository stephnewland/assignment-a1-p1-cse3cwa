"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";
import { useState } from "react";

export default function Header({ studentNumber }: { studentNumber: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      {/* Moved to the top: Navigation menu */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/tabs" className={styles.navLink}>
          Tabs
        </Link>
        <Link href="/escape-room" className={styles.navLink}>
          Escape Room
        </Link>
        <Link href="/coding-races" className={styles.navLink}>
          Coding Races
        </Link>
        <Link href="/court-room" className={styles.navLink}>
          Court Room
        </Link>
      </nav>

      {/* Moved to the bottom: Top row with student number and controls */}
      <div className={`${styles.topRow} px-8`}>
        <span className={styles.studentNumber}>
          Student No: {studentNumber}
        </span>

        <div className={styles.topRightControls}>
          <div onClick={toggleMenu} className={styles.hamburgerIcon}>
            <div className={isMenuOpen ? styles.barOpen : styles.bar}></div>
            <div className={isMenuOpen ? styles.barOpen : styles.bar}></div>
            <div className={isMenuOpen ? styles.barOpen : styles.bar}></div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* This remains in the same position as it's the mobile menu */}
      <nav
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <Link href="/" className={styles.navLink} onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/about" className={styles.navLink} onClick={toggleMenu}>
          About
        </Link>
        <Link href="/tabs" className={styles.navLink} onClick={toggleMenu}>
          Tabs
        </Link>
        <Link
          href="/escape-room"
          className={styles.navLink}
          onClick={toggleMenu}
        >
          Escape Room
        </Link>
        <Link
          href="/coding-races"
          className={styles.navLink}
          onClick={toggleMenu}
        >
          Coding Races
        </Link>
        <Link
          href="/court-room"
          className={styles.navLink}
          onClick={toggleMenu}
        >
          Court Room
        </Link>
      </nav>
    </header>
  );
}
