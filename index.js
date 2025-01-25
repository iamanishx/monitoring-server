const express = require("express");
const http = require("http");
const cors = require("cors");
const { error } = require("console");
const { doSomeHeavyTask, simulateCPULoad } = require('./utils');
const client = require("prom-client");


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });



app.get("/", (req, res) => {
    res.send({message:`hello from manish`});
    });


app.get("/slow", async(req, res) => {
    try {
        simulateCPULoad();
        const delay = await doSomeHeavyTask();
        res.send({ delay });
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
});


app.get("/metrics", async(req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics); 
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
