_jsonEditor.directive('tree', function($compile){
	return {
		restrict: "E",
		scope: {json: '='},
		template:
			'<ul class="json">' +
				'<li ng-repeat="(key, value) in json"><span>{{key}}</span><input type="text" ng-change="" ng-show="" value="{{value}}">' +
					'<tree json="value"></tree>' +
				'</li>' +
			'</ul>',
		compile: function(tElement, tAttr) {
			var contents = tElement.contents().remove();
			var compiledContents;
			return function(scope, iElement, iAttr) {
				if(!compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents(scope, function(clone, scope) {
					iElement.append(clone);
				});
			};
		}
	};
})