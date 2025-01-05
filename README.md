## Overview

LocalZero Top Maßnahmen is a project aimed at monitoring and showcasing top measures for climate protection and sustainability in various cities. The project currently uses CSV files for data storage but will integrate with the LocalZero backend in the future.

## Technologies Used

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) - Next.js for server-side rendering and static site generation.
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - React for building the user interface.
- ![PapaParse](https://img.shields.io/badge/PapaParse-FF6F61?style=for-the-badge&logo=papaparse&logoColor=white) - PapaParse for parsing CSV files.
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) - TypeScript for type safety and better developer experience.
- ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white) - SCSS for styling and design.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GermanZero-de/localzero-top.git
   cd localzero-top
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the project for production, use the following command:

```bash
npm run build
```

### Starting the Production Server

To start the production server, use the following command:

```bash
npm start
```

## Data

Currently, the project uses CSV files located in the 

sheets directory for data storage.


In the future, the project will integrate with the LocalZero backend for data management.

Example sheets:
https://docs.google.com/spreadsheets/d/1zluA1FvCrFrGiLkB828kt54BEQed52jpEJMcX8hRRLk
You can download each page and put them into the project sheets folder in order to use them in the project, notice the naming for the files from fetchdata file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
