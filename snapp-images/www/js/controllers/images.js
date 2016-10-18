angular
.module('snapp')
.controller("imagesCtrl", imagesCtrl);

imagesCtrl.$inject = ["$cordovaCamera", "$cordovaFile"];
function imagesCtrl($cordovaCamera, $cordovaFile) {

  // document.addEventListener("deviceready", function () {
  //
  //   var options = {
  //     quality: 50,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.CAMERA,
  //     allowEdit: true,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 100,
  //     targetHeight: 100,
  //     popoverOptions: CameraPopoverOptions,
  //     saveToPhotoAlbum: false,
  //     correctOrientation:true
  //   };
  //
  //   $cordovaCamera.getPicture(options).then(function(imageData) {
  //     var image = document.getElementById('myImage');
  //     image.src = "data:image/jpeg;base64," + imageData;
  //   }, function(err) {
  //     // error
  //   });
  //
  // }, false);



  const vm = this;
  vm.images = [];

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
    $cordovaCamera.getPicture(options).then(function(imageData) {

      // 4
      onImageSuccess(imageData);

      function onImageSuccess(fileURI) {
        createFileEntry(fileURI);
      }

      function createFileEntry(fileURI) {
        window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
      }

      // 5
      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
          fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail
          );
        },
        fail);
      }

      // 6
      function onCopySuccess(entry) {
        vm.$apply(function () {
          vm.images.push(entry.nativeURL);
        });
      }

      function fail(error) {
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
