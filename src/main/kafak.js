// const { Kafka, logLevel } = require('kafkajs')

// const kafka = new Kafka({
//     logLevel: logLevel.NOTHING,
//     brokers: ['localhost:9092'],
// })

// const topic = 'notifications'
// const consumer = kafka.consumer({ groupId: 'my-group' })

// export const getMsgFromQueue = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic, fromBeginning: true })
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       return JSON.parse(message.value.toString())
//     },
//   })
// }

