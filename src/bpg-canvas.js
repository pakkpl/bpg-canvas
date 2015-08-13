(function () {
    "use strict";

    angular.module('bpgCanvas', [])
        .directive('bpgCanvas', ['$injector', function ($injector) {
            function link(scope, element) {

                var workerUrl;
                try {
                    workerUrl = $injector.get('bpgCanvasWorkerUrl');
                }
                catch (e) {
                    // no canvas worker url defined
                }

                function onSrcChanged(){
                    var canvas = element[0].childNodes[0];

                    if (!scope.src) {
                        canvas.width = 0;
                        canvas.height = 0;
                        return;
                    }

                    var ctx = canvas.getContext('2d');
                    var worker = new Worker(workerUrl || '/js/bpg-worker.min.js');

                    worker.onmessage = function (e) {
                        if (!e.data.error) {
                            canvas.width = e.data.width;
                            canvas.height = e.data.height;
                            var m = ctx.createImageData(canvas.width, canvas.height);
                            m.data.set(e.data.image);
                            ctx.putImageData(m, 0, 0);
                        }

                        if (scope.onComplete) {
                            scope.$apply(function(){
                                scope.onComplete({error: e.data.error});
                            });
                        } else {
                            console.log(e.data.error);
                        }
                    };

                    worker.postMessage(scope.src);
                }

                scope.$watch('src', onSrcChanged);
            }

            return {
                restrict: 'E',
                link: link,
                template: '<canvas width="0" height="0"></canvas>',
                scope: {
                    src: '@src',
                    onComplete: '&onComplete'
                }
            }
        }]);
})();
