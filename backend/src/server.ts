import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { scrapeAmazon } from "./scraper";

const app = express();
const PORT = 3000;

// Configure Helmet for security
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"], // Allow content from the same origin
                imgSrc: ["'self'", "data:", "https://m.media-amazon.com"], // Allow images from same origin and Amazon media
                scriptSrc: ["'self'", "'unsafe-inline'"], // Allow scripts from same origin and inline scripts
                styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from same origin and inline styles
                objectSrc: ["'none'"], // Disallow object sources
            },
        },
    })
);

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Enable JSON parsing for incoming requests
app.use(express.json());

// Basic route for testing the server
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Scraping endpoint
app.get("/api/scrape", async (req: Request, res: Response) => {
    let { keyword } = req.query;

    // Default to popular products if no keyword is provided
    if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
        keyword = "popular products"; // Default keyword
    }

    try {
        // Fetching the scraping results
        const results = await scrapeAmazon(keyword);

        // Validate if the scraper returned an array
        if (!Array.isArray(results)) {
            throw new Error("Invalid results returned by the scraper.");
        }

        // Send the scraped data as JSON
        res.json(results);
    } catch (error) {
        console.error("Error fetching data from the scraper:", error.message);
        // Send a 503 service unavailable error if scraping fails
        res.status(503).json({ error: "Service temporarily unavailable. Please try again later." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
