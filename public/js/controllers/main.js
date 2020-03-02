angular.module('userController', [])

	
	.controller('mainController', ['$scope','$http','Task', function($scope, $http, Task) {
		$scope.formData = {};
		$scope.loading = true;
		const defaultUserDetalis = {
			"email":"admin@testdomain.com",
			"password":"admin"
		};
		const userToCreate ={
			"firstName":"Arti",
			"userId":102,
			"lastName":"Candane",
			"password":"test",
			"email":"arti@testdomain.com",
			"tasks":[
				{
					"name":"Task1",
					"startDate":"2020-03-02",
					"endDate":"2020-03-07",
					"description":"Should have milk, banana, almonds ect in the breakfast"
				},
					{
					"name":"Task2",
					"startDate":"2020-03-07",
					"endDate":"2020-03-09",
					"description":"Vist sinhagad fort"
				}
				]
		};
		Task.getToken(defaultUserDetalis)
		.success(function(data) {
			$scope.token = data.token;

			Task.create(userToCreate,$scope.token)
			.success(function(response) {
				$scope.createdUser = response.data;
				$scope.loading = false;

				Task.get($scope.createdUser.userId,$scope.token)
				.success(function(response) {
					$scope.userTasks = response.data.tasks;
					$scope.loading = false;
				});
			});
		});
		

		$scope.createTask = function() {

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				
				Task.create($scope.formData)

					
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.task = data;
					});
			}
		};

		$scope.deleteTask = function(id) {
			$scope.loading = true;

			Task.delete(id)
				
				.success(function(data) {
					$scope.loading = false;
					$scope.task = data;
				});
		};
	}]);