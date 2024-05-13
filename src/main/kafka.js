import { Notification } from 'electron'

const { Kafka, logLevel } = require('kafkajs')

class KafkaConsumer{
  static consumer = null;
  static topic = 'notifications';

  static initializeConsumer(serverIp){
    // extract the ip address from the serverIp
    serverIp = serverIp.split(':')[1].substring(2);
    const kafka = new Kafka({
      logLevel: logLevel.NOTHING,
      brokers: [`${serverIp}:9092`],
    });

    this.consumer = kafka.consumer({ groupId: 'my-group' });
  }

  static async consume(mainWindow){
    try{
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const data = JSON.parse(message.value.toString());
          mainWindow.webContents.send('add-album', data.status);
          console.log(data);
        },
      });
    } catch (err) {
      console.error("Error starting the kafka consumer");
    }
  }

  static disconnect(){
    this.consumer.disconnect();
  }
}

export const startKafkaConsume = async (mainWindow, serverIp) => {
  console.log("Starting Kafka Consumer with serverIp: ", serverIp);
  KafkaConsumer.initializeConsumer(serverIp);
  await KafkaConsumer.consume(mainWindow);
}

export const stopKafkaConsume = async () => {
  KafkaConsumer.disconnect();
}

