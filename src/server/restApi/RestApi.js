const axios = require("axios");
const qs = require("querystring");

const GET = async (headers, baseUrl, url, params) => {
  const config = {
    headers
  };

  if (params) config.params = params;

  try {
    const response = await axios.get(baseUrl + url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

const POST = async (headers, baseUrl, url, body) => {
  const config = {
    headers: headers
  };

  try {
    const response = await axios.post(baseUrl + url, body, config);
    return response;
  } catch (error) {
    throw error;
  }
};

const POST_FORM = async (headers, baseUrl, url, bodyParams) => {
  const config = {
    headers
  };

  try {
    const response = await axios.post(
      baseUrl + url,
      qs.stringify(bodyParams),
      config
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const POST_OAUTH_FORM = async (token, baseUrl, url, bodyParams) => {
  const config = {
    headers: { Authorization: "Bearer " + token }
  };

  try {
    const response = await axios.post(
      baseUrl + url,
      qs.stringify(bodyParams),
      config
    );
    return response;
  } catch (error) {
    throw error;
  }
};

exports.POST = POST;
exports.GET = GET;
exports.POST_OAUTH_FORM = POST_OAUTH_FORM;
exports.POST_FORM = POST_FORM;
