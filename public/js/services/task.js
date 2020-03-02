angular.module('userService', [])
	.factory('Task', ['$http',function($http) {
		return {

			getToken : function(userDetalis) {
				return $http.post('/api/auth/login', userDetalis);
			},
			get : function(userId,token) {
				return $http.get('/api/users/'+userId+'/tasks',{headers: {'x-access-token':  token}});
			},
			create : function(userToCreateWithTask,token) {
				return $http.post('/api/users', userToCreateWithTask,{headers: {'x-access-token':  token}});
			},
			delete : function(id) {
				return $http.delete('/api/task/' + id,{headers: {'x-access-token':  token}});
			}
		}
	}]);