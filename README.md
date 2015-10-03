# bpg-canvas
AngularJs directive for decoding BPG images in web workers

Demo: http://bpg-canvas.piercedbone.com

## How to install
Copy files `bpg-canvas.min.js` and `bpg-worker.min.js` from `dist` folder and add script reference to your index.html:
```html
<script src="/js/bpg-canvas.min.js"></script>
```
Then add `bpgCanvas` as a dependency for your app and optional constant `bpgCanvasWorkerUrl` (if your path to `bpg-worker.min.js` is different than default `/js/bpg-worker.min.js`)
```javascript
angular.module('myApp', ['bpgCanvas'])
.constant('bpgCanvasWorkerUrl', '/somePath/bpg-worker.min.js');
```

## How to use
```html
<body ng-app="myApp">
  <bpg-canvas src="file.bpg" />
</body>
```
Optionaly you can use `on-complete` event - see example app.

## Limitations
Not work with animations and 8 bits images.

## Licence
The MIT License (MIT)

File `bpg-worker.min.js` is modified version of `bpgdec.js` from http://bellard.org/bpg/
