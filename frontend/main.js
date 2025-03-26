document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search");
    const keywordInput = document.getElementById("keyword");
    const heroSection = document.getElementById("hero");
    const resultsSection = document.getElementById("results");
    const header = document.getElementById("header");
    const clearSearchButton = document.getElementById("clear-search");
    const homeLink = document.getElementById("home-link");

    // Create a search button for the header
    const headerSearchButton = document.createElement("button");
    headerSearchButton.textContent = "Search";
    headerSearchButton.id = "header-search-button";
    headerSearchButton.style.marginLeft = "10px";

    // Insert the "Search" button before the "Clear Search" button in the header
    const searchContainer = document.querySelector("header .search");
    searchContainer.insertBefore(headerSearchButton, clearSearchButton);

    // Dynamically adjust the margin of results based on header visibility
    const adjustResultsMargin = () => {
        resultsSection.style.marginTop = header.classList.contains("hidden") ? "0" : `${header.offsetHeight}px`;
    };

    // Observer to monitor changes in the header's class and adjust the results margin
    const observer = new MutationObserver(adjustResultsMargin);
    observer.observe(header, { attributes: true, attributeFilter: ["class"] });
    adjustResultsMargin();

    // Function to show the header
    const showHeader = () => {
        header.classList.remove("hidden");
        header.style.display = "flex";
        adjustResultsMargin();
    };

    // Function to hide the header
    const hideHeader = () => {
        header.classList.add("hidden");
        header.style.display = "none";
        adjustResultsMargin();
    };

    // Function to display stars based on rating value
    const getStarRating = (rating) => {
        const fullStars = Math.floor(rating); // Number of full stars
        const halfStars = (rating % 1) >= 0.5 ? 1 : 0; // 1 if half-star, 0 if not
        const emptyStars = 5 - fullStars - halfStars; // Remaining stars

        // Create a string with star icons
        let starRating = '';

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starRating += '★'; // Full star
        }

        // Add half star if applicable
        if (halfStars) {
            starRating += '☆'; // Half star (using a different character for this example)
        }

        // Add empty stars
        for (let i = 0; i < emptyStars; i++) {
            starRating += '☆'; // Empty star
        }

        return starRating;
    };

    // Reusable search function
    const performSearch = async (keyword) => {
        if (!keyword) return;

        // Hide the hero section and show the header and results
        heroSection.style.display = "none";
        showHeader();
        resultsSection.classList.remove("hidden");

        try {
            // Fetch data from the backend API with the provided keyword
            const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);

            // Parse the data and display the results
            const data = await response.json();
            resultsSection.innerHTML = data.length
                ? data.map(product => `
                    <div>
                        <img src="${product.imageUrl}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p class="star-rating">${getStarRating(parseFloat(product.rating))}</p> <!-- Display stars -->
                        <p>Reviews: ${product.reviews}</p>
                    </div>
                `).join("")
                : "<p>No results found.</p>";
        } catch (error) {
            console.error("Error:", error);
            resultsSection.innerHTML = `<p>An error occurred: ${error.message}</p>`;
        }
    };

    // Search action triggered by the main search button
    searchButton.addEventListener("click", () => {
        performSearch(keywordInput.value.trim());
    });

    // Search action triggered by the search button in the header
    headerSearchButton.addEventListener("click", () => {
        performSearch(document.getElementById("keyword-header").value.trim());
    });

    // Clear search action to reset the page state
    clearSearchButton.addEventListener("click", () => {
        heroSection.style.display = "flex";
        hideHeader();
        resultsSection.classList.add("hidden");
        keywordInput.value = "";
        document.getElementById("keyword-header").value = "";
        resultsSection.innerHTML = "";
    });

    // Action when clicking on the home link in the header
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        heroSection.style.display = "flex";
        hideHeader();
        resultsSection.classList.add("hidden");
        keywordInput.value = "";
        document.getElementById("keyword-header").value = "";
        resultsSection.innerHTML = "";
    });
});
