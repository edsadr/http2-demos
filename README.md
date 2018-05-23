# HTTP/2 Node Demos

These demos require Node.js version 10 or superior, also to use them you should generate self-signed SSL certificates, if you have openssl you can easily do this by running:

```bash
$ openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```

The certificates should be at the root of the project to make the demos work.

you can specify the port to run them using the environment variable PORT or they will run by default in the port 4300.

## Demos

Before running any demo please install the only dependency `mime-types`

* Hello World : Basic HTTP/2 server, just run `node hello-world.js`
* Static: HTTP/2 file server, just run `node static.js`
* Push: HTTP/2 server pusing extra resources in a request, just run `node push.js`

## License

Copyright 2018 Adrian Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
