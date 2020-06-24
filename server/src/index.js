const express = require('express')
const schedule = require('node-schedule')
const axios = require('axios')
const webpush = require('web-push')
const { config } = require('dotenv')
const { env } = require('process')

config()

const app = express()

app.use(express.json())

const getSubscription = async () => {
  const { data } = await axios.get('http://localhost:5000/subscription')
  return data
}

const getOptions = () => {
  const { PUBLIC_KEY, PRIVATE_KEY } = env
  return {
    vapidDetails: {
      subject: 'mailto:example@gmail.com',
      publicKey: PUBLIC_KEY,
      privateKey: PRIVATE_KEY,
    },
    TTL: 60,
  }
}

function sendNotification(subscription) {
  const options = getOptions()
  console.log('Sending notification!')
  return webpush.sendNotification(
    subscription,
    'You have a task to complete!',
    options
  )
}

const getSubscriptionAndSendNotification = async () => {
  const subscription = await getSubscription()
  if (subscription) {
    return sendNotification(subscription)
  }
  console.error('I did not find a subscription')
  throw Error('Subscription not found!')
}

const scheduleReminder = (req, res) => {
  const { time } = req.body
  const date = new Date(time)
  schedule.scheduleJob(date, getSubscriptionAndSendNotification)
  res.json({ message: 'Successfully scheduled reminder.' })
}

const sendTestNotification = async (req, res) => {
  await getSubscriptionAndSendNotification()
  res.json({ message: 'Successfully sent test notification.' })
}

app.post('/reminder', scheduleReminder)

app.get('/test', sendTestNotification)

app.listen(8000)
