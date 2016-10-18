angular
.module("snapp")
.controller("ImageCtrl", imageCtrl);

imageCtrl.$inject = ["$scope", "$cordovaCamera"];
function  imageCtrl($scope, $cordovaCamera) {
  const vm = this;

  vm.takeImage = function() {
    var options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 250,
      targetHeight: 250,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      vm.srcImage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
  };
}
