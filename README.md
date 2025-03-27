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
  - **Bun** JavaScript runtime for the backend.
  - **Express** Handles API routes.
  - **Axios** Makes HTTP requests to fetch Amazon's HTML content.
  - **JSDOM** Parses and extracts information from HTML.
  - **Helmet** Secures HTTP headers and enforces content security policies.
  
- **Frontend**:
  - **HTML** Structure of the page.
  - **CSS** Styling the page.
  - **Vanilla JavaScript** AJAX request to backend, DOM manipulation.
  - **SweetAlert2** User alert (empty field).
  - **Vite** Project bundling and development server.

## Installation

### Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/yourusername/quick-scraper.git
cd quick-scraper
```

#### Backend Setup

Navigate to the backend directory install dependencies and start server:

```bash

cd backend
bun install
bun run src/server.ts
```
The backend will be running at http://localhost:3000.



### Frontend Setup

Navigate to the frontend directory, install dependencies and start frontend development server:

```bash
cd ../frontend
npm install
npm run dev
```
The frontend will be accessible at http://localhost:5173.

###Running the Application

1. Make sure both the backend and frontend servers are running.

2. Open your browser and go to http://localhost:5173.

3. Enter a product search keyword (e.g., "laptop") and click the Search button to initiate the scraping process.

4. The scraped results will appear on the page, displaying the product title, rating, number of reviews, and product image.



