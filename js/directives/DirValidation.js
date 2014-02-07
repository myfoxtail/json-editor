var INTEGER_REGEXP = /^\-?\d+$/;
_jsonEditor.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if( INTEGER_REGEXP.test(viewValue) ) {    // valid
					ctrl.$setValidity('integer', true);
					return viewValue;
				}
				ctrl.$setValidity('integer', false);
				return undefined;
			});
		}
	};
});

var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
_jsonEditor.directive('smartFloat', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if( FLOAT_REGEXP.test(viewValue) ) {
					ctrl.$setValidity('float', true);
					return parseFloat(viewValue.replace(',', '.'));
				}
				ctrl.$setValidity('float', false);
				return undefined;
			});
		}
	};
});

_jsonEditor.directive('checkBoolean', function(){
	return {
		require: 'ngModel'
		, link: function(scope, elem, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if( /true\b/.test(viewValue) || /false\b/.test(viewValue) ) return viewValue;
				return undefined;
			});
		}
	}
});