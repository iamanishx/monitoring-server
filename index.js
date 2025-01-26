const express = require("express");
const http = require("http");
const cors = require("cors");
const { error } = require("console");
const { doSomeHeavyTask, simulateCPULoad } = require('./src/utils');
const client = require("prom-client");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
 
};
const logger = createLogger(options);



const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });



app.get("/", (req, res) => {
    logger.info("req came from / route");
    res.send({message:`hello from manish`});
    });


app.get("/slow", async(req, res) => {
    try {
        logger.info("req came from /slow route");
        simulateCPULoad();
        const delay = await doSomeHeavyTask();
        res.send({ delay });
    } catch(err) {
        logger.error(error.message);
        res.status(500).send({ error: err.message });
    }
});


app.get("/metrics", async(req, res) => {
    logger.info("req came from /metrics route");
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics); 
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
