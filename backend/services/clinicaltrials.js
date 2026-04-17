const axios = require("axios");

const fetchClinicalTrials = async (disease) => {
  try {
    const res = await axios.get("https://clinicaltrials.gov/api/v2/studies", {
      params: {
        "query.cond": disease,
        "filter.overallStatus": "RECRUITING",
        pageSize: 20,
        format: "json",
      },
    });

    return (
      res.data.studies?.map((study) => {
        const s = study.protocolSection;
        return {
          title: s?.identificationModule?.briefTitle || "N/A",
          status: s?.statusModule?.overallStatus || "N/A",
          eligibility:
            s?.eligibilityModule?.eligibilityCriteria?.slice(0, 300) + "..." ||
            "N/A",
          location: s?.contactsLocationsModule?.locations?.[0]?.city || "N/A",
          contact:
            s?.contactsLocationsModule?.centralContacts?.[0]?.name || "N/A",
        };
      }) || []
    );
  } catch (err) {
    console.error("ClinicalTrials Error:", err.message);
    return [];
  }
};

module.exports = { fetchClinicalTrials };
