app.controller('LoginModalController', ['$scope', function($scope) {

      $scope.animationsEnabled = true;

      $scope.open = function(size) {

        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'login.html',
          controller: '',
          size: size
        });

        modalInstance.result.then(function(modalData) {
          $scope.modalData = modalData;
        }, function() {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
      $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };

}]);
