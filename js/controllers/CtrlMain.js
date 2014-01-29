function CtrlMain($scope, $http) {
	var test = {
		'billing': {
			'free_vendors': ['ert.ru', 'test.ru'],
			'experiment_nosms': {
				'percent': 30,
				'vendors': ['ert.ru', 'test.ru']
			},
			'deploy': {
				'main_revision': '223282',
				'next_revision': '223283',
				'percent': 10
			}
		},
		'content': {
			'deploy': {
				'main_revision': '223282',
				'next_revision': '223283',
				'percent': 10
			},
			'roles2hosts': {
				'BalancerHost': ['h1.karadev.ru', 'h2.karadev.ru']
			}
		},
		'cluster': {
			//"etcd_hosts",
			"h1.karadev.ru": "h2.karadev.ru",
			"h2.karadev.ru": "h1.karadev.ru"
		},
		"ports": {
			"h1.karadev.ru": [
				{
					'port': 3242,
					'for': 'PostgresHost',
					'project': 'prod:billingprod'
				},
				{
					'port': 3243,
					'for': 'PostgresHostSlave',
					'project': 'prod:billingprod'
				},
				{
					'port': 3244,
					'for': 'EventBrokerRedis',
					'project': 'prod:contentprod'
				}
			]
		}
	};
	$scope.test = test;
	$scope.kiss = 3;

	$scope.getJSON = function(){
//		$http.get($scope.url).success(function(res){
//
//		})
		$scope.json = test;

	}

	$scope.saveJSON = function() {
		console.log($scope.test);
	}
}