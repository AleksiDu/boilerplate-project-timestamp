import { AddressInfo } from "net";

// Init Express.js framework
import express from "express";
const app = express();

// Setup a server
const portString = process.env.PORT || "3000";
const port = parseInt(portString, 10);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send(__dirname + "/public/index.html");
});

app.get(
  "/api/hello",
  function (req: any, res: { json: (arg0: { greeting: string }) => void }) {
    res.json({ greeting: "hello API" });
  }
);

//#1 Timestamp Microservice
app.get(
  "/api",
  (req: any, res: { json: (arg0: { unix: number; utc: string }) => void }) => {
    var nowTime = new Date();
    res.json({
      unix: nowTime.getTime(),
      utc: nowTime.toUTCString(),
    });
  }
);

app.get(
  "/api/:dateString",
  (
    req: { params: { dateString: any } },
    res: {
      json: (arg0: { unix?: number; utc?: string; error?: string }) => void;
    }
  ) => {
    const dateString = req.params.dateString;
    const timestamp = parseInt(dateString);
    const date = timestamp ? new Date(timestamp) : new Date(dateString);

    if (parseInt(dateString) > 10000) {
      let unixTime = new Date(parseInt(dateString));
      res.json({
        unix: unixTime.getTime(),
        utc: unixTime.toUTCString(),
      });
    }

    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }

    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  }
);

const listener = app.listen(port, () => {
  const address = listener.address() as AddressInfo;
  console.log("Your app is listening on port " + address.port);
});
