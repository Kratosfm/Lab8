const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const postsRouter = require('./blog-post-router')
const jsonParser = bodyParser.json()
const uuidv4 = require('uuid/v4');
app.use(jsonParser)


app.use('/', postsRouter)

app.listen(8080, () => {
    console.log(`Your app is running in port 8080`)
})
