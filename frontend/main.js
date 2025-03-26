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
        const fullStars = Math.floor(rating);
        const halfStars = (rating % 1) >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;
        let starRating = '';

        for (let i = 0; i < fullStars; i++) {
            starRating += '★';
        }
        if (halfStars) {
            starRating += '☆';
        }
        for (let i = 0; i < emptyStars; i++) {
            starRating += '☆';
        }
        return starRating;
    };

    // Function to show alert if search is empty
    const showAlert = () => {
        Swal.fire({
            icon: "warning",
            title: "Empty field!",
            text: "Please enter a keyword before searching.",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true
        });
    };

    // Reusable search function
    const performSearch = async (keyword) => {
        if (!keyword) {
            showAlert();
            return;
        }

        heroSection.style.display = "none";
        showHeader();
        resultsSection.classList.remove("hidden");

        try {
            const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            resultsSection.innerHTML = data.length
                ? data.map(product => `
                    <div>
                        <img src="${product.imageUrl}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p class="star-rating">${getStarRating(parseFloat(product.rating))}</p>
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
