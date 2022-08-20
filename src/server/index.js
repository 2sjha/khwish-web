const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { setupAxios } = require("./restApi/setupAxios");
const RestApi = require("./restApi/RestApi");
const ApiConstants = require("./restApi/ApiConstants");

const app = express();
const port = process.env.PORT || 5000;
setupAxios();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

app.get("/", (_request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "..", "public", "index.html")
  );
});

app.get("/gift", (_request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "..", "public", "index.html")
  );
});

app.get("/thanks", (_request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "..", "public", "index.html")
  );
});

app.get("/thanks-details", async (request, response) => {
  const goal_id = request.query["goal-id"];
  const params = { "goal-id": goal_id };
  try {
    var res = await RestApi.GET(
      ApiConstants.KHWISH_HEADERS,
      ApiConstants.KHWISH_BASE_URL,
      "/web/thanks",
      params
    );
    if (res == undefined || res.data["success"] == 0) {
      response.send(["Error"]);
    }
    response.send(res.data);
  } catch (error) {
    response.send(["Error"]);
    throw error;
  }
});

app.get("/event-details", async (req, res) => {
  const params = { "event-id": req.query["event-id"] };
  try {
    const response = await RestApi.GET(
      ApiConstants.KHWISH_HEADERS,
      ApiConstants.KHWISH_BASE_URL,
      "/web/event-details",
      params
    );
    res.send(response.data);
  } catch (error) {
    if (error.response) {
      res.send(error.response.data);
    } else {
      throw error;
    }
  }
});

app.post("/payment-request", async (request, response) => {
  const body = request.body;
  var goalId = body.goal_id;
  const params = { amount: body.amount, goal_id: goalId };

  try {
    const res = await RestApi.POST(
      ApiConstants.KHWISH_HEADERS,
      ApiConstants.KHWISH_BASE_URL,
      "/web/payment-request",
      params
    );
    var payment_url = res.data["payment_url"];
    if (
      res == undefined ||
      payment_url == null ||
      payment_url == undefined ||
      res.data["success"] == 0
    ) {
      response.send(["Error"]);
    }
    response.send(res.data);
  } catch (error) {
    response.send(["Error"]);
    throw error;
  }
});

app.get("/error", (_request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "..", "public", "index.html")
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
