// Real-time News App with API Fetching (Including World News)

document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "6a35516b3de741218502cad88a5bee1d";  // Replace with your valid key
    const newsContainer = document.getElementById("news-container");

    // Fetch news function
    async function fetchNews(category = "general") {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            newsContainer.innerHTML = `<p class="text-center text-danger">Failed to load news. Please try again later.</p>`;
            console.error(error);
        }
    }

    // Display news function
    function displayNews(articles) {
        newsContainer.innerHTML = articles.map(article => `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read more</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Event listeners for category buttons
    document.querySelectorAll(".category-btn").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            fetchNews(category);
        });
    });

    // Fetch default news
    fetchNews();
});
