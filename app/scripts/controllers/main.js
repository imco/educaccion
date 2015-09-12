/* globals Firebase */
'use strict';

/**
 * @ngdoc function
 * @name caminoAlExitoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the caminoAlExitoApp
 */
angular.module('caminoAlExitoApp')
  .controller('MainCtrl', function($scope, $firebaseArray, $http, $mdDialog, $location, $anchorScroll) {
    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries'); //
    /*$scope.stories = $firebaseArray(ref);

    $scope.stories.$loaded(function(data){
      console.log(data);
    });
*/
    $scope.story = {};
    $scope.showForm = false;
    $scope.saved = false;
    $scope.saving = false;
    $scope.readMethod = "readAsDataURL";

    $scope.onReaded = function(e, file) {
      $scope.file = file;
      if ($scope.file.size < 10000000) {
        $scope.story.signatures = e.target.result;
      } else {
        $scope.alertFileSize();
        $scope.file = null;
        $scope.story.signatrues = null;
      }
    };

    $scope.alertFileSize = function() {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Imagen demasiado grande')
        .content('El tamaño maximo permitido es de 10mbs')
        .ok('Ok')
      );
    };

    $scope.selectSchool = function(school) {
      if (school) {
        $scope.story.cct = school.cct;
      } else {
        $scope.story.cct = null;
      }
    };
    $scope.getSchools = function(name) {
      return $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/escuelas',
        params: {
          term: name,
          solr: true
        }
      }).then(function(res) {
        if (res.data && res.data.escuelas) {
          return res.data.escuelas;
        }
        return [];
      });
    };

    /*var alertNoFile = function(){
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('No ingresaste firmas')
        .content('Las firmas son necesarias')
        .ok('Ok')
      );
    };*/

    $scope.save = function(selectedSchool) {
     /* if(!$scope.story.signatures){
        alertNoFile();
        return;
      }*/
      $scope.story.school = selectedSchool.nombre;
      $scope.saving = true;
      firebaseEntries.push().set($scope.story, function(e) {
        $scope.saving = false;
        $scope.saved = !e ? true : false;
        $scope.$apply();
      });
    };

    $scope.toDown = function(){
      $location.hash('registro');
      $anchorScroll();
    };

    //update school name
    //no founds name:
    //["09DPR2564G", "12DEF0232L", "ES 354-85", "15EPRO723B", "26DZS0010R", undefined, "14EPR02221", "15EPR46272", "09AACOOO1M", "15DST017ID"]

    /*
    function getInfoByCCTAndUpdate(escuelas){
      var ccts = escuelas.map(function(es){
        return es.cct;
      });
      $http({
        method: 'GET',
        url: 'http://mte.spaceshiplabs.com/api/escuelas',
        params: {
          ccts: ccts.toString(),
        }
      }).then(function(res){
        if(res && res.data && res.data.escuelas){
          var founds = [];
          res.data.escuelas.forEach(function(school, i){
            var index = ccts.indexOf(school.cct),
            esc = escuelas[index];
            if(school.cct == esc.cct){
              founds.push(esc.cct);
              console.log("from server", school.cct, school.nombre);
              console.log("from firebase", esc.cct);
              console.log('index', index);
              console.log(esc.id, 'update', school.nombre);
              //fire.child('-JycCV2QjgzzilX3FvLk').update({name:'algo'})
              firebaseEntries.child(esc.id).update({school: school.nombre});
            }
          });
          console.log('No Found', escuelas.filter(function(es){return founds.indexOf(es.cct) == -1}).map(function(es){ return es.cct}));
        }
      });

    }

    firebaseEntries.limitToLast(100).on('value', function(snapshot){
      var snaps = snapshot.val(),
      escuelas = [];
      Object.keys(snaps).forEach(function(esc, i){
        if(snaps[esc].cct){
          snaps[esc].id = esc;
          escuelas.push(snaps[esc]);
        }
      });
      getInfoByCCTAndUpdate(escuelas);

    }, function(err){
      console.log('err', err.code);
    });
    */

  });
