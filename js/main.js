var _jsonEditor = angular.module('jsonEditor', ['ngRoute', 'ngSanitize']);

_jsonEditor.config(function($routeProvider){
	$routeProvider
		.when('/',{
			controller: CtrlMain
			, templateUrl: 'js/views/main.html'
			, reloadOnSearch: false
		})
		.otherwise({redirectTo: "/"});
});