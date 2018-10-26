const path = require('path')
const express = require('express')

const app = express()

app.use('/memo-dash/', express.static(path.join(__dirname, '/build')))
app.use(function(req, res, next) {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  } else next()
})

app.listen(3000, function() {
  console.log('MemoDash app listening on port 3000!')
})
