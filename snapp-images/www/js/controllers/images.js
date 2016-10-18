angular
.module('snapp')
.controller("imagesCtrl", imagesCtrl);

imagesCtrl.$inject = ["$scope", "$cordovaCamera", "$cordovaFile", "$window"];
function imagesCtrl($scope, $cordovaCamera, $cordovaFile, $window) {

  const vm = this;
  vm.images = [];
  vm.blah   = {};

  vm.addImage = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    // 3
    $cordovaCamera.getPicture(options).then(function(imageData){

      vm.data = imageData;

      // 4
      onImageSuccess(imageData);

      function onImageSuccess(fileURI) {
        vm.data = fileURI;
        createFileEntry(fileURI);
      }

      function createFileEntry(fileURI) {
        // vm.data = "createFileEntry";
        $window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
      }

      // 5
      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;

        vm.data = "copyFile";
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, middle,
        fail);
      }

      function middle(fileSystem2) {
        vm.data = "middle";
        fileEntry.copyTo(
          fileSystem2,
          newName,
          onCopySuccess,
          fail
        );
      }

      // 6
      function onCopySuccess(entry) {
        vm.data = "onCopySuccess";

        vm.blah = entry.nativeURL;
        $scope.$apply(function () {
          vm.images.push(entry.nativeURL);
        });
      }

      function fail(error) {
        vm.data = "fail: " + error.code;
        console.log("fail: " + error.code);
      }

      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }

    }, function(err) {
      console.log(err);
    });
  };

  vm.urlForImage = function(imageName) {
    console.log("get correct path for image");
    var name = imageName.substr(imageName.lastIndexOf('/') + 1);
    var trueOrigin = cordova.file.dataDirectory + name;
    return trueOrigin;
  };
}
