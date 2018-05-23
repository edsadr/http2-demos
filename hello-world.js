'use strict'

const http2 = require('http2')
const fs = require('fs')
const port = process.env.PORT || 4300

// Reading certificates
const key = fs.readFileSync('localhost.key').toString()
const cert = fs.readFileSync('localhost.crt').toString()

// Creating the server
const server = http2.createSecureServer({
  key: key,
  cert: cert
})

// This will reply to all routes
server.on('stream', (stream, requestHeaders) => {
  // printing the request headers
  console.log(requestHeaders)
  stream.respond()
  stream.end('HTTP/2 hello world!')
})

server.listen(port, () => console.log(`https://localhost:${port}`))
