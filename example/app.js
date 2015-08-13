angular.module('example', ['bpgCanvas'])
    .constant('bpgCanvasWorkerUrl', '../dist/bpg-worker.min.js')// default url: /js/bpg-worker.min.js
    .controller('exampleCtrl', function ($scope) {

        $scope.showCanvas = true;
        $scope.imageSrc = '';
        $scope.infoText = 'Click button to start';

        var imageNumber = 0;

        function getNextImageSrc() {
            imageNumber++;
            if (imageNumber > 3) {
                imageNumber = 1;
            }

            return '../example/images/' + imageNumber + '.bpg';
        }

        $scope.loadNextImage = function () {
            $scope.showCanvas = true;
            $scope.infoText = 'loading...';
            $scope.imageSrc = getNextImageSrc();
        };

        $scope.clearImage = function () {
            $scope.showCanvas = true;
            $scope.imageSrc = '';
            $scope.infoText = 'empty image src';
        };

        $scope.hideShowCanvas = function () {
            $scope.showCanvas = !$scope.showCanvas;
            $scope.infoText = 'no canvas';
        };

        $scope.onLoadingComplete = function (error) {
            if (error) {
                $scope.infoText = error;
                return;
            }

            $scope.infoText = 'completed';
        }
    });