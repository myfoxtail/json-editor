_jsonEditor.directive('tree', function($compile) {
	/**
	 * Function checkArrayToTable
	 * Проверка на массив из объектов, который можно оформить как таблицу
	 *
	 * @param {Array} array
	 * @returns {Boolean}
	 */
	function checkArrayToTable(array) {
        if( array.length == 1 ) return false;
		var tableObject = array[0];
		for( var i = 1, l = array.length; i < l; i++ ) {
			if( array[i] instanceof Object ) {
				for( var j in array[i] ) if ( !tableObject.hasOwnProperty(j) ) return false;
			} else return false;
		}
		return true;
	}

	/**
	 * Function checkTypeOfData
	 * Проверка на тип данных
	 *
	 * @param {String|Boolean|Number} data
	 * @returns {String} атрибут (ng-pattern) для input
	 */
	function checkTypeOfData(data) {
		switch( typeof data ) {
			case 'number':
				return ' ng-pattern="/^\\d+$/"';
			case 'boolean':
				return ' ng-pattern="/^(true|false)\\b/"';
			default:
				return '';
		}
	}

	/**
	 * Function createInputEL
	 * Создание элемента input
	 *
	 * @param {Object} scope
	 * @returns {Node}
	 */
	function createInputEL(scope) {
		return $compile('<input type="text" ng-model="json" '
			+ checkTypeOfData(scope.json) + ' >'
		)(scope);
	}

	/**
	 * Function createNodeEl
	 * Создание ветки дерева
	 *
	 * @param {Object} scope
	 * @returns {Node}
	 */
	function createNodeEl(scope) {
		return $compile('<ul class="json" ng-model="json">' +
				'<li ng-repeat="(key, value) in json track by $index"><span>{{key}}</span>' +
					'<span ng-click="view = !view" ng-class="{active: view}" class="view"></span>' +
					'<tree json="json[key]" ng-model="json[key]" ng-hide="view"></tree>' +
				'</li>' +
			'</ul>'
		)(scope);
	}

	/**
	 * Function createTableEl
	 * Создание элемента table
	 *
	 * @param {Object} scope
	 * @returns {Node}
	 */
	function createTableEl(scope) {
		var theadString = '', tbodyString = '';
		for( var i = 0, j = scope.json.length; i < j; i++ ) {
			tbodyString += '<tr>';
			for( var k in scope.json[i] ) if( scope.json[i].hasOwnProperty(k) ) {
				if( !i ) theadString += '<td>' + k + '</td>';
				tbodyString += '<td><input type="text"' + checkTypeOfData(scope.json[i][k]) +
					' ng-model="json[' + i + '].' + k + '"/></td>';
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

	return {
		restrict: "E"
		, scope: { json: '=' }
		, require: 'ngModel'
		, transclude: true
		, compile: function(tElement) {
			var contents = tElement.contents().remove()
				, compiledContents;

			return function(scope, iElement) {
				if( !compiledContents) compiledContents = $compile(contents);

				compiledContents(scope, function(clone, scope) {
					if( scope.json instanceof Array ) { // правила отображения массивов
                        console.log(scope.json)
                        console.log(checkArrayToTable(scope.json))
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