const { Kafka } = require("kafkajs");

run().then(() => console.log("Done"), err => console.log(err));

async function run() {
  //const kafka = new Kafka({ brokers: ["192.168.178.61:29093"] });
  const kafka = new Kafka({ brokers: ["192.168.144.165:9092"] }); //Kafka Server KM
  // If you specify the same group id and run this process multiple times, KafkaJS
  // won't get the events. That's because Kafka assumes that, if you specify a
  // group id, a consumer in that group id should only read each message at most once.
  const consumer = kafka.consumer({ groupId: "" + Date.now() });

  await consumer.connect();

  await consumer.subscribe({ topic: "conad-people-counter", fromBeginning: true });
  await consumer.run({ 
    eachMessage: async (data) => {
      console.log(data.message.value.toString('utf8'));
      console.log(data.message.offset);
    }
  });
}