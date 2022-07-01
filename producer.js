const { Kafka } = require("kafkajs");

//run().then(() => console.log("Done"), err => console.log(err));

const kafka = new Kafka({ brokers: ["192.168.178.61:29093"] }); //virtual linux ale home
//const kafka = new Kafka({ brokers: ["192.168.144.165:9092"] }); // Kafka server KM




  
const producer = kafka.producer();
producer.connect();
setInterval(function(){ send()},10000)



async function send()
{
  const currentDate = new Date().getTime();
  //console.log("currentDate:"+currentDate)
  const lastVal = Math.floor(Math.random() * 10);
  //const lastDateTime = currentDate.toLocaleTimeString();
  const lastDateTime = currentDate;
  //const message = '{"total_people_detected":"'+lastVal+'","timestamp":"'+lastDateTime+'"}';
  const message =  "{'timestamp':"+lastDateTime+",'total_people_detected':"+ lastVal+"}";
  //console.log("original:"+message);
  //console.log("JSON:"+JSON.stringify(message));
  // {'timestamp': 1656666763.9771647, 'total_people_detected': 1}
  //var json = JSON.stringify(eval("(" + message + ")"));
  //JSON.stringify(message);
  await producer.send({
    topic: "total-people-detected",
    messages: [
      { value: message },
    ]
  });
 
}
