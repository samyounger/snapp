angular
.module('snapp')
.factory('FileService', fileService);

fileService.$inject = [];
function fileService() {
  var images;
  var IMAGE_STORAGE_KEY = 'images';

  function getImages() {
    var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
    if (img) {
      images = JSON.parse(img);
    } else {
      images = [];
    }
    return images;
  }

  function addImage(img) {
    images.push(img);
    window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
  }

  return {
    storeImage: addImage,
    images: getImages
  };
}
