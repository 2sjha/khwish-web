KHWISH_HEADERS = {
  "Content-Type": "application/json",
  "client-id": "gift-web",
  "service-key": "###################",
};

// KHWISH_STG_BASE_URL = "http://localhost:8080";
KHWISH_STG_BASE_URL = "http://64.225.84.49";
KHWISH_PROD_BASE_URL = "http://68.183.245.105";

exports.KHWISH_HEADERS = KHWISH_HEADERS;

if (process.env.ENV === "production") {
  exports.KHWISH_BASE_URL = KHWISH_PROD_BASE_URL;
} else {
  exports.KHWISH_BASE_URL = KHWISH_STG_BASE_URL;
}
