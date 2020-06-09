require('dotenv').load()

const Twilio = require('twilio')
//const chance = new require('chance')()
const cors = require('cors')
const express = require('express')
const app = express()

const AccessToken = Twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

app.use(cors());
app.get('/token', function (req, res) {
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    {identity: req.query.identity,
      ttl: 3600
    }
  )

  //token.identity = chance.name()
  token.addGrant(new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
  }))

  console.log("token: ", token)
  res.send({
    identity: token.identity,
    jwt: token.toJwt()
  })
})

app.listen(process.env.PORT, function () {
  console.log(`Programmable Chat token server listening on port ${process.env.PORT}!`)
})
