var app=angular.module('myapp',['ngRoute','ngMessages'])

app.controller('actrl',function($scope,$http,$rootScope,$location){
	console.log('actrl wrkng');
    //console.log($scope.contact);
    $http(
		{
		url:'https://zenways-contact.herokuapp.com/api/contacts',
		headers: 
		{
			key:'ZENWAYS01PIET01'
		}
		}
	).then(function(res){
	 $scope.contact=res.data.contacts;
	},
	function(res){
	}
	);
	$scope.onEdit=function(id){	
		$location.url("/new/"+id);
	}
	
	
	$scope.onDel=function(id){
			console.log("del");
			console.log(id);
		
	$http(
	{
		url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
		headers:
		{
			key:'ZENWAYS01PIET01'
		},
		method:'DELETE'
	}		
    ).then(function(res){
		console.log(res);
	},function(res){
		

		});
		
	};
	$scope.onName=function(id){
			//console.log("n");
			$location.url("/old/"+id);
				$http({
			url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
			
			headers:
			{
				key:'ZENWAYS01PIET01'
			},
			method:'GET'
		}).then(function(res){
			console.log(res.data.contact.name);
			console.log(res.data.contact.phno);
			console.log(res.data.contact.email);
		},function(){})
	}
			
		
		$scope.onIndex=function(id){
			//console.log("a");
			$location.url("/old/"+id);
				$http({
			url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
			
			headers:
			{
				key:'ZENWAYS01PIET01'
			},
			method:'GET'
		}).then(function(res){
			console.log(res.data.contact.name);
			console.log(res.data.contact.phno);
			console.log(res.data.contact.email);
		},function(){})
			
			
		}
		$scope.onPhne=function(id){
			//console.log("m");
			$location.url("/old/"+id);
			$http({
			url:'https://zenways-contact.herokuapp.com/api/contact/'+id,
			
			headers:
			{
				key:'ZENWAYS01PIET01'
			},
			method:'GET'
		}).then(function(res){
			console.log(res.data.contact.phno);
			console.log(res.data.contact.name);
	         console.log(res.data.contact.email);
			 
		},function(){})
			
		}


});

app.controller('ctr',function($scope,$http,$location,$routeParams){
	//console.log('ctr wrkng');
	//console.log($routeParams.stat);
	if($routeParams.stat){
		$scope.state=2;
		$http(
		{
		url:'https://zenways-contact.herokuapp.com/api/contact/'+$routeParams.stat,
		headers: 
		{
			key:'ZENWAYS01PIET01'
		}
		}
	).then(function(res){
		//console.log(res);
	 $scope.fm= res.data.contact;
	},
	function(res){
	}
	)
	}
    else{
		$scope.state=1;
		
		};
	$scope.onUpdate=function(){
		$http({
			url:'https://zenways-contact.herokuapp.com/api/contact/'+$routeParams.stat,
			headers:{
				key:'ZENWAYS01PIET01'
			},
			method:'PUT',
			data:$scope.fm
		}).then(function(res){
			console.log(res);
			$location.url("/");
		},function(res){
			console.log("not working"+res);});
	}
	$scope.onSub=function()
	{
		
		console.log('sub');
		$http(
	{
		url:'https://zenways-contact.herokuapp.com/api/contact',
		headers:
		{
			key:'ZENWAYS01PIET01'
		},
		method:'POST',
		data:$scope.fm
		
	}		
    ).then(function(res){
		if($scope.fm)
		{
		$location.url('/');
		}
	 //console.log(res);
	},function(res){
		

		});
	};
	
});


app.controller('ac',function($http,$scope,$location,$routeParams){
	
	console.log("ac wrkng");  
	
	$http({
			url:'https://zenways-contact.herokuapp.com/api/contact/'+$routeParams.ido,
			
			headers:
			{
				key:'ZENWAYS01PIET01'
			},
			method:'GET'
		}).then(function(res){
			console.log(res.data.contact);
			$scope.nk=res.data.contact;
		},function(){})
 
	
});


app.config(function($routeProvider){
	
	console.log("route wrkng");
	$routeProvider.when('/',{
	templateUrl:'table.html'
	});
	
	$routeProvider.when('/new',{
		
		templateUrl:'nam.html'
	});
	
	$routeProvider.when('/old',{
		
		templateUrl:'view3.html'
	});
	
	$routeProvider.when('/new/:stat',{
		
		templateUrl:'nam.html'
	});
	
	$routeProvider.when('/old/:ido',{
		
		templateUrl:'view3.html'
	});
	
	
});


		
	

	
