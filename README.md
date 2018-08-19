# express-chrome-debug

`express-chrome-debug` is a middleware which enables the `express-debug-chrome-extension` to connect to the Express.js server.


## Install

The first step is to install using NPM.

`npm i express-chrome-debug`

The next step is to include the middleware inside your Express.js application. The location that you do this will have a impact on the performance data that is visible in the Chrome extension so it should be done as early as possible in your application.

```
app.use(expressChromeDebug({
    secretKey: '12345'
}));
```

Finally you need to add the debug data to your HTML, this will only have a value when debug data is avaliable. It is exposed as `__debug` and the way you put it in your HTML will vary based on the templating you are using with Express.js.

### Handlebars

With Handlebars you simply need to add the following before your closing body tag.

```
{{{__debug}}}
```

## Licence

License: MIT (http://www.opensource.org/licenses/mit-license.php)

The MIT License (MIT)

Copyright (c) 2018 Jonathan Fielding

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.