'use strict';

angular.module("nsnTable", [])
    .directive('nsnTable', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/table.html',
            scope: {
                filejson: "@"
//                title: "accessor" // recebe o do seu pai, com o msm nome title...
            },
            controller: ['$scope', '$http', function ($scope, $http) {
                $http({method: 'GET', url: $scope.filejson}).
                    success(function (data) {
                        $scope.columnsNames = data.columns;
                        $scope.auxColumnsNames = [];
                        for (var i = 0; i < data.columns.length - 1; i++) {
                            $scope.auxColumnsNames[i] = data.columns[i + 1];
                        }
                        $scope.rowsValues = data.data;
                    }).
                    error(function () {
                        console.log("not getting anything...");
                    });

                //caso selected e volta a fazer click deslecionar... TODO
                $scope.idSelectedRow = null;

                $scope.selectedRows = [];
                $scope.setSelectedRow = function (idSelectedRow, $index) {
                    $scope.idSelectedRow = idSelectedRow;

                    console.log('$index' + $index)
                    console.log($scope.rowsValues[$index])
                    if ($scope.selectedRows[$index] == true) {
                        $scope.selectedRows[$index] = false;
                    }
                    else {
                        $scope.selectedRows[$index] = true;
                    }
                    console.log($scope.selectedRows)
                };

                $scope.idSelectedCol = null;
                $scope.setSelectedCol = function (idSelectedCol) {
                    $scope.idSelectedCol = idSelectedCol;

                    console.log(idSelectedCol)
                    var obj = [];

                    for (var i = 0; i < $scope.rowsValues.length; i++) {
                        obj[i] = $scope.rowsValues[i][idSelectedCol];
                    }
                    console.log('col' + obj)
                };

                //construir um grafico com base nos dados escolhidos na tabela... TODO

            }
            ],
//            require: 'ngModel' -- Para o caso de existir interatividade com o utilizador, os dados sao introduzidos por ele, etc...
            link: function linkFn(scope, element, attrs) {
            }
        };
    });
