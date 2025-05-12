# Course Builder Studio

## Overview

Course Builder Studio is a web application designed to help you create, edit, and manage course modules with ease. Built with modern technologies like React, TypeScript, and Tailwind CSS, it provides a user-friendly interface for course creators.

## Features

- **Create Modules**: Add new modules to your course with a single click. Each module comes with a default title and content that you can customize.
- **Edit Modules**: Use the rich text editor to modify the content of your modules. Save your changes seamlessly.
- **Delete Modules**: Remove unwanted modules from your course. The app ensures you always have at least one module.
- **Sidebar Navigation**: Quickly navigate between modules using the sidebar. The active module is highlighted for better visibility.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory:
   ```sh
   cd course-builder-studio
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

Start the development server with hot reloading:
```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- **`src/components`**: Contains the main UI components like `Dashboard`, `Sidebar`, and `ModuleEditor`.
- **`src/contexts`**: Includes the `ModuleContext` for managing the state of modules.
- **`src/ui`**: Reusable UI components like buttons, dialogs, and forms.
- **`src/types`**: Type definitions for modules and other entities.


## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For styling.
- **Vite**: For fast development and build tooling.

