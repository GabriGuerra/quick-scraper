import axios from "axios";
import { JSDOM } from "jsdom";

// Function to scrape Amazon for product information based on a given keyword
export async function scrapeAmazon(keyword: string) {
    // Construct the URL with the search keyword
    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;

    try {
        // Send a GET request to Amazon with the appropriate headers
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36", // User agent to avoid blocking
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7", // Language preference for Brazilian Portuguese
                "Referer": "https://www.amazon.com.br/", // Referrer to avoid suspicion. The .br domain is used as the scraper is running from Brazil.
            },
        });

        // Initialize JSDOM to parse the HTML content
        const dom = new JSDOM(data);
        const document = dom.window.document;

        // Select all product items from the Amazon search results page
        const items = document.querySelectorAll(".s-main-slot .s-result-item");

        // Map through each item and extract the necessary details
        const results = Array.from(items).map((item) => {
            // Extract the product title
            const titleElement = item.querySelector("h2[class] span");
            const title = titleElement ? titleElement.textContent?.trim() : "";

            // Extract the product rating
            const ratingElement = item.querySelector(".a-icon-star-small");
            const rating = ratingElement ? ratingElement.textContent?.trim() : "No rating";

            // Extract the number of reviews
            const reviewsElement = item.querySelector(".a-size-small .a-size-base");
            const reviews = reviewsElement ? reviewsElement.textContent?.trim() : "No reviews";

            // Extract the product image URL
            const imageElement = item.querySelector(".s-image");
            const imageUrl = imageElement ? imageElement.getAttribute("src") : "";

            // Return the extracted product details
            return { title, rating, reviews, imageUrl };
        })
        // Filter out items that have no title (in case the scraping is incomplete)
        .filter(product => product.title);

        return results; // Return the scraped product data
    } catch (error) {
        // Handle any errors that occur during the scraping process
        console.error("Error during the scraping process:", error.message);
        throw new Error("Scraping failed"); // Throw an error if scraping fails
    }
}
