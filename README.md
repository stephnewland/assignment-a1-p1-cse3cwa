# Assignment 1 – CSE3CWA

## Student Details

- Name: Steph Newland
- Student Number: 21993608

## Overview

This project is a Next.js web application that generates standalone HTML5 + JavaScript code for tabbed interfaces and demonstrates accessible web development practices. The application is designed to run inside the Moodle LMS environment, allowing users to copy generated code into a blank HTML file.

## Features Implemented

- **Navigation**
- **Accessible Header** with menu links for Home, About, Tabs, Escape Room, Coding Races, Court Room.
- **Responsive Hamburger menu** for mobile devices.
- **Dynamic Breadcrumbs** show navigation hierarchy.
- **Dark/Light Theme Toggle** persists user preference.

### Homepage

- Displays last visited page via **cookies**.
- Embeds a **HTML + JS code generator** (`CodeGenerator`) for demo purposes.

### About Page

- Contains student name and number.
- Embedded tutorial video (`demo.mp4`) showing website usage.

### Tabs Page

- Interactive tab editor to create/edit/delete tabs.
- Generates **standalone HTML + inline CSS + JS** copy-pasteable code.
- Fully **accessible** with `role="tab"`, `aria-selected`, `role="tabpanel"`.
- Copy-to-clipboard functionality included.

### Placeholder Pages

- Escape Room, Coding Races, Court Room pages are placeholders with cookie tracking.

## Accessibility

- All interactive elements include **ARIA labels** and semantic roles.
- Keyboard navigation is fully supported.
- Focus outlines visible for buttons, links, and form elements.

## Cookies

- Tracks **last visited tab/page**.
- Homepage reads cookie securely and displays last visited tab name.

| Feature              | Implemented in File(s)                                                 |
| -------------------- | ---------------------------------------------------------------------- |
| Sticky Header        | `Header.tsx` + `RootLayout` padding for main content                   |
| Sticky Breadcrumbs   | `Breadcrumbs.tsx`                                                      |
| Theme Toggle         | `Header.tsx`                                                           |
| Code Generator       | `CodeGenerator.tsx` + `CodeGeneratorWrapper.tsx`                       |
| Tab Generator        | `tabs/page.tsx`                                                        |
| Placeholder Pages    | `coding-races/page.tsx`, `court-room/page.tsx`, `escape-room/page.tsx` |
| Footer               | `Footer.tsx`                                                           |
| ARIA / Accessibility | `Header.tsx`, `Breadcrumbs.tsx`, `Tab generator` components            |
| Cookie Tracking      | `Header.tsx` (last tab), `Tracker.tsx`                                 |
| Mobile Menu          | `Header.tsx` mobile toggle ( `HamburgerMenu.tsx`)                      |

## References Used:

IEEE References
P. Ballard, Sams Teach Yourself JavaScript in 24 Hours. Indianapolis, IN, USA: Sams Publishing, 2020.

C. Gackenheimer, Introduction to React. Berkeley, CA, USA: Apress, 2015.

S. Hoque, Full-Stack React Projects: Learn MERN stack development by building modern web apps using MongoDB, Express, React, and Node.js. 2nd ed. Birmingham, UK: Packt Publishing, 2020.

D. Matuszek, Quick JavaScript. Boca Raton, FL, USA: Chapman and Hall/CRC, 2023.

M. Simon, JavaScript for Web Developers: Understanding the Basics. Berkeley, CA, USA: Apress, 2023.

S. Hoque, Full-Stack React Projects: Learn MERN stack development by building modern web apps using MongoDB, Express, React, and Node.js. 2nd ed. Birmingham, UK: Packt Publishing, 2020.

## AI Generated content

- Microsoft CoPilot helped suggest what content was required to go in this README file.
