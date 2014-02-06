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
					'port': '3243',
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

	//$scope.test = {"success":true,"res":[{"id":"116065935","name":"Автовокзал или станция метро","count":"3"},{"id":"1243965738","name":"Аэропорт","count":"20"},{"id":"1712794098","name":"Больница","count":"7"},{"id":"518459756","name":"Гостиница, хостел, кемпинг","count":"52"},{"id":"-666429269","name":"Кафе, бар, ресторан, клуб","count":"694"},{"id":"-1336534990","name":"Конференц-зал, выставка","count":"18"},{"id":"550569626","name":"Морской или речной порт, набережная","count":"2"},{"id":"-1020791281","name":"Общественное место","count":"6"},{"id":"1438979630","name":"Офис или бизнес-центр","count":"223"},{"id":"-1390943894","name":"Парк","count":"16"},{"id":"957648744","name":"Спортивное сооружение","count":"5"},{"id":"2037543470","name":"Стадион","count":"1"},{"id":"1466832286","name":"Театр, кинотеатр","count":"29"},{"id":"-1462348633","name":"Торговый центр, магазин","count":"263"},{"id":"-1403963666","name":"Уличные точки","count":"7698"},{"id":"-140909068","name":"Учебное заведение","count":"27"},{"id":"-434582300","name":"Фитнес-центр, спа-салон","count":"20"}]};

	$scope.getJSON = function(){
		if( !$scope.url ) return;
		$http.get($scope.url).success(function(res){
			$scope.test = res;
		});
	};

	$scope.saveJSON = function() {
		console.log($scope.test);
	}
}