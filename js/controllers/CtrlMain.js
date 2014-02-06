function CtrlMain($scope, $http, $compile) {
	var treeDirectiveEl = document.getElementById('json-tree');

	$scope.getJSON = function() {
		if( !$scope.url ) return;
		$http.get($scope.url).success(function(res) {
			$compile(treeDirectiveEl)($scope);
			$scope.test = res;
		});
	};

	$scope.saveJSON = function() {
		console.log($scope.test);
	}
}