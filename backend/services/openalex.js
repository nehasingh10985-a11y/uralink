const axios = require("axios");

const fetchOpenAlex = async (query) => {
  try {
    const res = await axios.get("https://api.openalex.org/works", {
      params: {
        search: query,
        "per-page": 50,
        page: 1,
        sort: "relevance_score:desc",
      },
    });

    return res.data.results.map((work) => ({
      title: work.title || "N/A",
      abstract: work.abstract_inverted_index
        ? Object.keys(work.abstract_inverted_index).slice(0, 40).join(" ") +
          "..."
        : "N/A",
      authors:
        work.authorships?.map((a) => a.author?.display_name).join(", ") ||
        "N/A",
      year: work.publication_year || "N/A",
      source: "OpenAlex",
      url: work.primary_location?.landing_page_url || work.doi || "N/A",
    }));
  } catch (err) {
    console.error("OpenAlex Error:", err.message);
    return [];
  }
};

module.exports = { fetchOpenAlex };
