'use strict';

var app = angular.module('myapp');


app.controller('mainCtrl', function($scope, Balance){

    Balance.getAll()
      .then(res => {
          $scope.amount = res.data;
          console.log($scope.amount);
          $scope.debitTotal();
          $scope.creditTotal();
      })
      .catch(err => {
          console.log('err:', err);
      });

      $scope.addBalance = () => {
          console.log('new value:',$scope.newAmount.debit);
          if($scope.newAmount.debit == undefined){
              $scope.newAmount.debit = 0;
            //   console.log('if clause is executed')
          }
          if($scope.newAmount.credit == undefined){
              $scope.newAmount.credit = 0;
          }
          Balance.create($scope.newAmount)

          .then(res =>{
              $scope.amount.push($scope.newAmount);
              $scope.newAmount = {};
              $scope.debitTotal();
              $scope.creditTotal();
          })
          .catch(err => {
              console.error(err);
          })
      };
      $scope.removeRow = balance => {
          Balance.remove(balance);
          console.log(balance);
          var index = $scope.amount.indexOf(balance);
          $scope.amount.splice(index, 1);
          $scope.debitTotal();
          $scope.creditTotal();
      };
      var editingIndex;
      $scope.editBalance = balance => {
          editingIndex =$scope.amount.indexOf(balance)
          $scope.editAmount = angular.copy(balance);

      };
      $scope.saveEdit = () => {
          $scope.amount[editingIndex] = $scope.editAmount;
          var temp = $scope.amount[editingIndex];
          console.log('temp:', temp);
          Balance.edit(temp);
          $scope.editAmount = {};
          $scope.debitTotal();
          $scope.creditTotal();
      };

      $scope.debitTotal = () => {
          Balance.getAll()
            .then(res => {
                $scope.debTo = 0
                $scope.amount = res.data;
                for(var i =0; i< $scope.amount.length; i++){
                    $scope.debTo += Number($scope.amount[i].debit);
                    // console.log($scope.amount[i].debit);
                    // return $scope.debTo;
                }
            })
            .catch(err => {
                console.error(err);
            })
      }
      $scope.creditTotal = () => {
          Balance.getAll()
            .then(res => {
                $scope.creTo = 0
                $scope.amount = res.data;
                for(var i =0; i< $scope.amount.length; i++){
                    $scope.creTo += Number($scope.amount[i].credit);
                    // return $scope.creTo;
                }
            })
            .catch(err => {
                console.error(err);
            })
      }

});
