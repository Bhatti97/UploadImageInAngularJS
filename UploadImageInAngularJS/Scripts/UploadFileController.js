var App = angular.module("MyApp", []);
App.controller('UploadFileCtrl', function ($scope,$http) {
    //Variables
    $scope.message = "";
    $scope.FileInvalidMessage = "";
    $scope.SelectedFileForUpload = null;
    $scope.FileDescription = "";
    $scope.IsFormSubmitted = false;
    $scope.IsFileValid = false;
    $scope.IsFormValid = false;
    //FormValidation
    $scope.$watch("f1.$valid", function (isValid) {
        $scope.IsFormValid = isValid;
    })
    //fileValidation
    $scope.CheckFileValid = function (file) {
        var isValid = false;
        if ($scope.SelectedFileForUpload != null) {
            if ((file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') && file.size <= (512 * 1024)) {
                $scope.FileInvalidMessage = "";
                isValid = true;
            }
            else {
                $scope.FileInvalidMessage = "Selected File is Invalid (only file type png ,jpg and 512 kb siz allowed)";
            }
        } else {
            $scope.FileInvalidMessage = "Image Required";
        }
        $scope.isValid = isValid;
    }

    //FileSelectEvent
    $scope.selectedFileForUpload = function (file) {
        $scope.SelectedFileForUpload = file[0];
    };
    //Savefile
    $scope.SaveFile = function () {
        $scope.IsFormSubmitted = true;
        $scope.message = "";
        $scope.CheckFileValid($scope.SelectedFileForUpload);
        if ($scope.IsFileValid, $scope.IsFormValid) {
            var formData = new FormData();
            formData.append("file", $scope.SelectedFileForUpload);
            formData.append("description", $scope.FileDescription);

            $http.post("/Home/SaveImage", formData, {
                withCredentials: true,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .then(function (d) {
                console.log('D: ' + d);
            }
            , function (e) {
                console.log('Error ' + e)
            });


        }
    };
   

}); //.
//factory('FileUploadService', function ($http, $q) {
//    var fac = {};
//    fac.Uploadfile = function (file, description) {
//        var formData = new FormData();
//        formData.append("file", file);
//        formData.append("description", description);

//        var defer = $q.defer();
//        $http.post("/Home/SaveImage", formData, {
//            withCredentials: true,
//            headers: { 'Content-Type': undefined },
//            transformRequest: angular.identity
//        })
//        .then(function (d) {
//            defer.resolve(d);
//        }
//        ,function () {
//            defer.reject("FileUploadFailed");
//        });
//        return defer.promise;
//    }
//    return fac;
//});
