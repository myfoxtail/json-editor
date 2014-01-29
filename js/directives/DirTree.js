_jsonEditor.directive('tree', function($compile, $rootScope){
	return {
		restrict: "E",
		scope: { json: '=' },
		require: 'ngModel',
		transclude: true,
		template:
			'<ul class="json" ng-model="json">' +
				'<li ng-repeat="(key, value) in json"><span>{{key}}</span>' +
					'<tree json="json[key]" ng-model="json[key]"></tree>' +
				'</li>' +
			'</ul>'
		, compile: function(tElement, tAttr, ngModel) {
			var contents = tElement.contents().remove();
			var compiledContents, test = {}, key = [];
			return function (scope, iElement, iAttr, ngModel) {
				if(!compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents(scope, function(clone, scope) {
					if( scope.json instanceof Array && checkArrayToTable(scope.json) ) {
						if( checkArrayToTable(scope.json) ) {
							var theadString = '', tbodyString = '';
							for( var i = 0, j = scope.json.length; i < j; i++ ) {
								tbodyString += '<tr>';
								for( var k in scope.json[i] ) {
									if( !i ) {
										theadString +=  '<td>' + k + '</td>';
									}
									tbodyString += '<td><input type="text" ng-model="json[' + i + '].' + k + '"/></td>';
								}
								tbodyString += '</tr>';
							}
							var table = $compile('<table class="inner-table">' +
								'<thead>' +
								'<tr>' + theadString + '</tr>' +
								'</thead>' +
								'<tbody>' + tbodyString + '</tbody>' +
								'</table>')(scope);
							iElement.append(table);
						} else {
							var input = $compile('<input type="text" ng-model="json" >' +
								'<span class="save-field"></span><span class="undo"></span>')(scope);
							input.on('keyup', function(e) {
								if( e.keyCode < 32 ) return;
								this.style.border = '1px solid #60B044';
								this.nextSibling.style.display = 'inline-block';
								this.nextSibling.nextSibling.style.display = 'inline-block';
							});
							iElement.append(input);
						}

					} else if( scope.json && typeof scope.json !== 'object' ) {
						var input = $compile('<input type="text" ng-model="json"' + (( typeof scope.json == 'number' ) ? ' smartFloat ':'') + '>' +
							'<span class="save-field"></span><span class="undo"></span>')(scope);
						input.on('keyup', function(e) {
							if( e.keyCode < 32 ) return;
							this.style.border = '1px solid #60B044';
							this.nextSibling.style.display = 'inline-block';
							this.nextSibling.nextSibling.style.display = 'inline-block';
						});
						iElement.append(input);
					} else {
						iElement.append(clone);
					}
				});
			};
		}
	};
});

function checkArrayToTable(array) {
	var tableObject = {};
	for( var i = 0, l = array.length; i < l; i++ ) {
		if( array[i] instanceof Object ) {
			for( var j in array[i] ) {
				if( !tableObject.hasOwnProperty(j) && !i ) tableObject[j] = [];
				else if ( !tableObject.hasOwnProperty(j) && i ) return false;
				tableObject[j].push(array[i][j]);
			}
		} else return false;
		//if( !tableObject[array[i]] )
	}
	return tableObject;
}