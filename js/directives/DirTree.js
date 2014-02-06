_jsonEditor.directive('tree', function($compile){
	return {
		restrict: "E"
		, scope: { json: '=' }
		, require: 'ngModel'
		, transclude: true
		, compile: function(tElement) {
			var contents = tElement.contents().remove()
				, compiledContents;

			/**
			 * Function createNodeEl
			 *
			 * @param {Object} scope
			 * @returns {Node}
			 */
			function createNodeEl(scope){
				var ul = '<ul class="json" ng-model="json">' +
							'<li ng-repeat="(key, value) in json track by $index"><span>{{key}}</span>' +
					'<span ng-click="view = !view" ng-class="{active: view}" class="view"></span>' +
								'<tree json="json[key]" ng-model="json[key]" ng-hide="view"></tree>' +
							'</li>' +
						'</ul>';
				return $compile(ul)(scope);
			}

			/**
			 * Function createTableEl
			 *
			 * @param {Object} scope
			 * @returns {Node}
			 */
			function createTableEl(scope) {
				var theadString = '', tbodyString = '';
				for( var i = 0, j = scope.json.length; i < j; i++ ) {
					tbodyString += '<tr>';
					for( var k in scope.json[i] ) {
						if( !i ) theadString += '<td>' + k + '</td>';
						tbodyString += '<td><input type="text" ng-change="function(this){console.log(this)}" ng-model="json[' + i + '].' + k + '"/></td>';
					}
					tbodyString += '</tr>';
				}
				return $compile(
					'<table class="inner-table">' +
						'<thead>' +
							'<tr>' + theadString + '</tr>' +
						'</thead>' +
						'<tbody>' + tbodyString + '</tbody>' +
					'</table>'
				)(scope);
			}

			/**
			 * Function createInputEL
			 *
			 * @param {Object} scope
			 * @returns {Node}
			 */
			function createInputEL(scope) {
				var input = $compile('<input type="text" ng-model="json"' + (( typeof scope.json == 'number' ) ? ' smartFloat ':'') + '>'
					//+ '<span ng-click="saveJSON()" class="save-field"></span><span class="undo"></span>'
				)(scope);
				input.on('keyup', function(e) {
					if( e.keyCode < 32 ) return;
					this.style.border = '1px solid #60B044';
					//this.nextSibling.style.display = 'inline-block';
					//this.nextSibling.nextSibling.style.display = 'inline-block';
				});

				return input;
			}

			return function (scope, iElement) {
				if( !compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents(scope, function(clone, scope) {
					if( scope.json instanceof Array ) { // правила отображения массивов
						if( checkArrayToTable(scope.json) ) {
							iElement.append(createTableEl(scope));
						} else {
							iElement.append(createNodeEl(scope));
							//iElement.append(createInputEL(scope));
						}
					} else if( scope.json instanceof Object ) { // правила отображения объектов
						iElement.append(createNodeEl(scope));
					} else if( scope.json && typeof scope.json !== 'object' ) { // правила отображения строк, булевых переменных, численных переменных
						iElement.append(createInputEL(scope));
					}
				});
			};
		}
	};
});

function checkArrayToTable(array) {
	var tableObject = array[0];
	for( var i = 1, l = array.length; i < l; i++ ) {
		if( array[i] instanceof Object ) {
			for( var j in array[i] ) if ( !tableObject.hasOwnProperty(j) ) return false;
		} else return false;
	}
	return true;
}