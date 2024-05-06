import { Notification } from 'electron'

const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
    logLevel: logLevel.NOTHING,
    brokers: ['localhost:9092'],
})

const topic = 'notifications'
const consumer = kafka.consumer({ groupId: 'my-group' })

export const kafkaConsume = async (mainWindow) => {
  try{
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // const notification = new Notification({
        //   title: "New album added!",
        //   body: "Go to Albums page to see new photos."
        // });
        // notification.show();
        const data = JSON.parse(message.value.toString())
        mainWindow.webContents.send('add-album', data.status)
        console.log(data)
        // listner notify
      },
    })
  } catch (err) {
    console.error("Error starting the kafka consumer")
  }
}

