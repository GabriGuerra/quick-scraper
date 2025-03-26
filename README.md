# Amazon Product Scraper

This project is a simple web scraper for extracting Amazon product listings based on a given search keyword. It includes both the backend (API) and frontend (user interface) components.

## Task Overview

The goal of this project is to scrape the Amazon search results for a given keyword, extract details about product listings, and display the results to the user. The project is split into two main parts:

- **Backend (API)**: Scrapes Amazon product listings using **axios** and **JSDOM**.
- **Frontend**: Provides a user-friendly interface to enter a search keyword, trigger the scraping, and display the results.

## Features

- Scrape Amazon product listings for a given keyword.
- Extract product title, rating (stars), number of reviews, and image URL.
- Display results cleanly on the frontend.
- Simple, user-friendly interface.

## Technologies

- **Backend**:
  - **Bun** (JavaScript runtime for the backend)
  - **Express** (for handling API routes)
  - **Axios** (for making HTTP requests to fetch Amazon's HTML content)
  - **JSDOM** (to parse and extract information from HTML)
  
- **Frontend**:
  - **HTML** (structure of the page)
  - **CSS** (styling the page)
  - **Vanilla JavaScript** (AJAX request to backend, DOM manipulation)
  - **Vite** (for project bundling and development server)

## Installation

### Prerequisites

Ensure that you have the following tools installed:

- [Node.js](https://nodejs.org/) (for the backend setup)
- [Bun](https://bun.sh/) (JavaScript runtime for the backend)
- [Git](https://git-scm.com/) (version control)

### Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/yourusername/quick-scraper.git
cd quick-scraper

Backend Setup
Navigate to the backend directory:

bash
Copiar
Editar
cd backend
Install the necessary dependencies:

bash
Copiar
Editar
bun install
Start the backend server:

bash

bun run start
By default, the backend will be running at http://localhost:3000.



Frontend Setup

Navigate to the frontend directory:

bash
Copiar
Editar
cd ../frontend
Install the frontend dependencies using Vite:

bash

npm install
Start the frontend development server:

bash

npm run dev
The frontend will be accessible at http://localhost:3000.