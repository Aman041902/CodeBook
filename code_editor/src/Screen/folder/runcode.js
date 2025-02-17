const langmap = {
  cpp: 105,
  java: 91,
  python: 100,
  javascript: 102,
};

const getsubmission = async (tokenid) => {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenid}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7698cf29a8mshd8ba4c1e68363d4p150b7cjsn475db10351b7",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch submission result");
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in getsubmission:", error);
    return null;
  }
};

export const makesubmission = async ({ code, language, callback, inp }) => {
  const url = `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*`;
  const httpoptions = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "7698cf29a8mshd8ba4c1e68363d4p150b7cjsn475db10351b7",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: langmap[language],
      source_code: btoa(code),
      stdin: btoa(inp),
    }),
  };

  try {
    callback({ apiStatus: "loading" });
    const resp = await fetch(url, httpoptions);
    if (!resp.ok) throw new Error("Failed to submit code");
    const res = await resp.json();

    if (!res.token) throw new Error("Token not received from Judge0");
    const tokenid = res.token;

    let statusCode = 1;
    let apiresult = null;

    // Poll until the submission is processed (status id not 1 or 2)
    while (statusCode === 1 || statusCode === 2) {
      // Delay 1 second between polling requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
      apiresult = await getsubmission(tokenid);

      if (!apiresult) {
        callback({ apiStatus: "error", message: "Submission fetch failed" });
        return;
      }

      statusCode = apiresult.status.id;
      console.log("Status:", apiresult.status);
    }

    callback({ apiStatus: "success", data: apiresult });
  } catch (error) {
    callback({ apiStatus: "error", message: error.message });
  }
};
