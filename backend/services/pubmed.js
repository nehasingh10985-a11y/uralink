const axios = require("axios");

const fetchPubMed = async (query) => {
  try {
    // Step 1: Get IDs
    const searchRes = await axios.get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`,
      {
        params: {
          db: "pubmed",
          term: query,
          retmax: 50,
          sort: "pub date",
          retmode: "json",
        },
      },
    );

    const ids = searchRes.data.esearchresult.idlist;
    if (!ids.length) return [];

    // Step 2: Fetch Details
    const fetchRes = await axios.get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi`,
      {
        params: {
          db: "pubmed",
          id: ids.slice(0, 20).join(","),
          retmode: "xml",
        },
      },
    );

    // Parse XML simply
    const xml = fetchRes.data;
    const articles = [];
    const titleMatches =
      xml.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/g) || [];
    const abstractMatches =
      xml.match(/<AbstractText.*?>(.*?)<\/AbstractText>/g) || [];
    const yearMatches =
      xml.match(/<PubDate>[\s\S]*?<Year>(.*?)<\/Year>/g) || [];

    titleMatches.forEach((title, i) => {
      articles.push({
        title: title.replace(/<\/?ArticleTitle>/g, ""),
        abstract: abstractMatches[i]
          ? abstractMatches[i].replace(/<.*?>/g, "")
          : "N/A",
        year: yearMatches[i]
          ? yearMatches[i].match(/<Year>(.*?)<\/Year>/)[1]
          : "N/A",
        source: "PubMed",
        url: `https://pubmed.ncbi.nlm.nih.gov/${ids[i]}/`,
      });
    });

    return articles;
  } catch (err) {
    console.error("PubMed Error:", err.message);
    return [];
  }
};

module.exports = { fetchPubMed };
