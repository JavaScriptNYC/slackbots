require('dotenv').config()
const Promise = require('bluebird')
const express = require('express')
const bodyParser = require('body-parser')
const meetup = Promise.promisifyAll(require('meetup-api')({key: process.env.MEETUP_API_KEY}))
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
})

meetup.getEventsAsync()
.then((response) => {
  console.log(response);
})


app.post('/', (req, res) => {
  switch (req.body.command) {
    case '/meetup':
      meetup.getEventsAsync({urlname: 'JavaScript-New-York-City'})
      .then((response) => {
        console.log(response);
      })
      res.send('Next meetup is')
      break;
    case '/shamoon':
      res.send('I am Shamoon')
    default:
      res.json({stuff: 'ok'})

  }

})
