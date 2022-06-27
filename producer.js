const { Kafka } = require("kafkajs");

//run().then(() => console.log("Done"), err => console.log(err));

const message = "peoplecounter{num:55,time:12:45:22}"
const kafka = new Kafka({ brokers: ["192.168.178.61:29093"] });
const producer = kafka.producer();
producer.connect();
setInterval(function(){ send()},10000)

async function send()
{
  await producer.send({
    topic: "people-counter-events",
    messages: [
      { value: message },
    ]
  });
 
}
