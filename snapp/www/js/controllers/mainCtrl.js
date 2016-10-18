angular
.module("snapp")
.controller("MainCtrl", mainCtrl);

mainCtrl.$inject = ["$scope", "$cordovaCamera"];
function  mainCtrl($scope, $cordovaCamera) {
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
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      vm.srcImage = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
  };

}
