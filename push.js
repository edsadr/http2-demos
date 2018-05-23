'use strict'

const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

// Variables needed
const { HTTP2_HEADER_PATH, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = http2.constants
const key = fs.readFileSync('localhost.key').toString()
const cert = fs.readFileSync('localhost.crt').toString()
const serverRoot = './assets'
const port = process.env.PORT || 4300

// Create the server
const server = http2.createSecureServer({
  key: key,
  cert: cert
})

// Process all requests
server.on('stream', (stream, headers) => {
  const reqPath = headers[HTTP2_HEADER_PATH]
  const fullPath = path.join(serverRoot, reqPath)
  const mimeType = mime.lookup(fullPath)

  if (fullPath.endsWith('index.html')) {
    // handle Index file
    handleFile(fullPath, 'text/html', stream)

    stream.pushStream({ ':path': '/styles.min.css' }, { parent: stream.id }, (err, pushStream, headers) => {
      if (err) return handleError(err, pushStream)
      handleFile(path.join(serverRoot, 'styles.min.css'), 'text/css', pushStream)
    })
  } else {
    // handle static file
    handleFile(fullPath, mimeType, stream)
  }
})

// This will reply with a file
function handleFile (fullPath, mimeType, stream) {
  stream.respondWithFile(fullPath, { 'content-type': mimeType }, { onError: (err) => handleError(err, stream) })
}

// This will handle all errors specially the 404
function handleError (err, stream) {
  console.log(err)
  if (err.code === 'ENOENT') {
    stream.respond({ ':status': HTTP_STATUS_NOT_FOUND })
  } else {
    stream.respond({ ':status': HTTP_STATUS_INTERNAL_SERVER_ERROR })
  }
  stream.end()
}

server.listen(port, () => console.log(`https://localhost:${port}`))
