var myApp = angular.module('myApp');

myApp.controller('booksController', 
	['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams){
		
		$scope.getBooks = function(){
			$http.get('/api/books').then(function(response){
				$scope.books = response.data;
			});
		}

		$scope.getBook = function(){
			var id = $routeParams.id;
			$http.get('api/books/' + id).then(function(response){
				$scope.book = response.data;
				
				var book = "";
				bookAuthorLength = JSON.stringify($scope.book.author).length;
				for(var i = 0; i < bookAuthorLength; i++){
					if($scope.book.author[i] == ':'){
						i += 2;
						while($scope.book.author[i] != '"'){
							book += $scope.book.author[i++];
						}
						book += ", ";
					}
				}
				$scope.book.author = book;
			});
		}

		$scope.addBook = function(){
			$http.post('api/books/', $scope.book).then(function(response){
				window.location.href = '#!/books';
			});
		}

		$scope.editBook = function(){
			var id = $routeParams.id;
			$http.put('api/books/' + id, $scope.book).then(function(response){
				window.location.href = '#!/books';
			});
		}

		$scope.removeBook = function(id){
			$http.delete('api/books/' + id).then(function(response){
				window.location.href = '#!/books';
			});
		}

		$scope.addBookLayout = function(){
			var MAX = 5;
			var MIN = 1;
			var counter = 1;
			//Adding New Check# and Check amount Text Boxes
			$scope.texs = [{'id1': 1}];
			
            $scope.add = function(event) {
            	event.target.setAttribute("id", counter);
            	var newItemNo = $scope.texs.length + 1;
            	if(newItemNo <= MAX){
               		$scope.texs.push({['id' + newItemNo]: 1});
					angular.element(document.getElementById(counter)).hide();
              		counter++;
            	}
            	else{
            		counter = MAX;
            	}
                //$('#surveyForm').find("id").hide();   
             };

            //Removing Last Check# and Check amount Text Boxes
            $scope.remove = function() {
            	var lastItem = $scope.texs.length - 1;
               	if(lastItem >= MIN){
               		$scope.texs.splice(lastItem);
               		angular.element(document.getElementById(--counter)).show();
               	}
               	else{
               		counter = MIN;
               	}
			}
		}
}]);