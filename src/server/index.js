const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { setupAxios } = require("./restApi/setupAxios");
const RestApi = require("./restApi/RestApi");
const ApiConstants = require("./restApi/ApiConstants");
const DummyData = require("./restApi/DummyData")

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
  if(req.query["goal-id"] === 'dummy-goal-id') {
    res.send(DummyData.DUMMY_GOAL_DATA);
    return Promise.resolve(1);
  }

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
  if(req.query["event-id"] === "dummy-event-id") {
    console.log(DummyData.DUMMY_EVENT_DATA);
    res.send(DummyData.DUMMY_EVENT_DATA);
    return Promise.resolve(1);
  }

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
  const params = { amount: request.body.amount, goal_id: request.body.goal_id };

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
