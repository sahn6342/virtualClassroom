var app = angular.module('myapp', ['ngMessages','ngRoute']);
app.run(function () {
console.log("hello world!");
});

app.controller('myCtrl',function($scope, $http, $rootScope, $location){
    $rootScope.s = {};    
})

app.controller('home',function($scope,$location){
    console.log("hello");
    $scope.signIn=function(){
        $location.url('/login')
    }
     $scope.signUp=function(){
        $location.url('/signup')
    }
		$scope.forgetPassword=function(){
			$location.url('/forgetpassword')
		}
});

app.controller('login', function($scope, $http, $rootScope, $location){
   console.log("heyyy");    
    var isTeacher = false;
    var isStudent = false;
    var loginSuccess = false;
    var allUserDetail = [];
    $http({
      method: 'GET',
      url: '/alluserdetail'
   }).then(function (success){
       console.log("I got the data I requested");
        console.log('$scope - ', $scope);
      $scope.allUserData = success.data;
       
   },function (error){

   });
   $scope.l = {
      email: null,
      password: null,
      allUserData : this.allUserData
   };
    
    $scope.userLogin=function(){
      var enteredEmail = this.myform.$$controls[0].$viewValue;
      var enteredPass = this.myform.$$controls[1].$viewValue;
      var isEmailValid = false;
      var isPassValid = false;
      var isPersonaValid = false;

		angular.forEach(this.allUserData, function(v, k) {
			if (v.email === enteredEmail && v.password === enteredPass) {
				if (v.isstudent) {
					$location.path('/dashboard/').search({id: v._id});
				} else if (v.isteacher) {
					$location.path('/dashboardTeacher/').search({id: v._id});
				}
			}
		});
	};
});

app.controller('show',function($scope, $location, $http){
   console.log("heyyyeee");
  var id = $location.search().id ? $location.search().id : null;
  $http({
    method: 'GET',
    url: '/userdetail/' + id
  }).then(function (success){
    console.log("I got the data for the ID I requested");
    $scope.userData = success.data;
    $scope.userName = $scope.userData.firstname + ' ' + $scope.userData.lastname;
  },function (error){
    console.log('error - ', error);
  });
  $scope.items = [
      {
        name : 'Neural network',
        topics: ['Perceptron', 'Hopefield Network', 'Backpropogation Network', 'ADT']
      },
      {
        name : 'Intractive computer graphics',
        topics: ['Line And Point Plotting System', 'CRT', 'Screen Coordinates']
      },
      {
        name : 'Data Warehouse and Data Mining',
        topics: ['Data Warehousing', 'Data Mining' ,'Types of Data Warehouse']
      },
      {
        name : 'Software Verification, Validation & Testing',
        topics: ['Software Testing']
      }
    ];
  $scope.initTopic = function(selectedSub) {
    $scope.selectedSub = selectedSub.name;
    $scope.topics = selectedSub.topics;
  };
  $scope.topicPicked = function(selectedTop) {
    $scope.selectedTopic = selectedTop;
  };
  $scope.onShow = function(){
        $location.url('/new')
  };
  $scope.onVisit = function(){
		$scope.onVisit = function(){
			$location.url('/visit');
		}
  };
  $scope.submitRecord = function(){
    console.log($scope.selectedSub);
    console.log($scope.selectedTopic);
    $scope.data = {
      studentfname: $scope.userData.firstname,
      studentlname: $scope.userData.lastname,
      studentemail: $scope.userData.email,
      studentphone: $scope.userData.mobile,
      date: new Date(),
      subject: $scope.selectedSub,
      topic: $scope.selectedTopic
    };
    console.log($scope.data);
    $http({
      method: 'POST',
      url: '/saveArticleRequest',
      data: $scope.data
    }).then(function (success){
      console.log('success - ', success);
			alert('Request for the article made successfully');
    },function (error){
      console.log('error - ', error);
    });
  };

	//TeacherHome
	$scope.itemsTeacher = [
		{ subject : 'Neural network', topic: 'ADT', rating: 7 },
		{ subject : 'Intractive computer graphics', topic: 'Line And Point Plotting System', rating: 7 },
		{ subject : 'Neural network', topic: 'Perceptron', rating: 10 },
		{ subject : 'Intractive computer graphics', topic: 'CRT', rating: 8 },
		{ subject : 'Intractive computer graphics', topic: 'Screen Coordinates', rating: 9 },
		{ subject : 'Software Verification, Validation & Testing', topic: 'Software Testing', rating: 7 },
		{ subject : 'Intractive computer graphics', topic: 'Inheritance in detail', rating: 8 },
		{ subject : 'Data Warehouse and Data Mining', topic: 'Data Mining', rating: 9 },
		{ subject : 'Data Warehouse and Data Mining', topic: 'Types of Data Warehouse', rating: 7 },
		{ subject : 'Neural network', topic: 'Hopefield Network', rating: 6 },
		{ subject : 'Neural network', topic: 'Backpropogation Network', rating: 7}
	];

	$scope.uploadArticle=function(){
		$location.url('/fileUpload')
	};

	$scope.prepareSchedule=function(){
		$location.path('/prepareSchedule/').search({id: this.userData._id});
	};

});

app.controller('signup',function($scope,$location, $http){
	console.log("signup");
	$scope.generateOtp=function(){
		/*$http.get('/sendSMSUsingNexmo').success(function(){
			console.log('SMS sent');
			console.log();
		});*/
		$http({
			method: 'GET',
			url: '/sendSMSUsingNexmo'
		}).then(function (success){
			console.log("I got the data I requested");
			$scope.OTP = success.data;
            console.log('otp msg--?'+success.data);
		},function (error){
			console.log('error - ', error);
		});

	};

	$scope.signup=function(){

		$http({
			method: 'GET',
			url: '/emailN'/*,
			params: {emailId: $scope.data.email}*/
		}).then(function (success){
			console.log(success);
		},function (error){
			console.log('error - ', error);
		});

		console.log(this);
		$scope.data = {
			firstname : this.s.FNAME,
			lastname : this.s.LNAME,
			email : this.s.EMAIL,
			mobile : this.s.PHNO,
			password : this.s.PASSWORD,
			isteacher : this.s.RADIO === 'teacher' ? true : false,
			isstudent : (this.s.RADIO == undefined || this.s.RADIO === 'student') ? true : false
		};
		$http({
			method: 'POST',
			url: '/saveuserdetail',
			data: $scope.data
		}).then(function (success){
			console.log('success - ', success);
			alert('Signup successfull. Go to login page.');
		},function (error){
			console.log('error - ', error);
		});

	}
});

app.controller('showSchedule',function($scope,$location){
	console.log("On teachers Home page");
	/*$scope.items = [
		{ name : 'OOPS', topics: ['OOPS-Basic understanding', 'Encapsulation in Detail', 'Understanding polymorphism', 'Inheritance in detail'] },
		{ name : 'Data Structures and Algorithms', topics: ['Arrays-the concept', 'Linked List', 'Sorting Algorithms'] },
		{ name : 'Theory of Automata', topics: ['The turing Machine', 'Ardens theorem' ,'Lemma for regular expressions'] },
		{ name : 'Digital Communications', topics: ['IEEE standards'}
	];*/

	$scope.items = [
		{ name : 'OOPS', schedule: [
			{topic: 'OOPS-Basic understanding', date: 'September 01, 2017'},
			{topic: 'Encapsulation in Detail', date: 'September 01, 2017'},
			{topic: 'Understanding polymorphism', date: 'September 02, 2017'},
			{topic: 'Inheritance in detail', date: 'September 02, 2017'}
		]
		},
		{ name : 'Data Structures and Algorithms', schedule: [
			{topic: 'Arrays-the concept', date: 'September 04, 2017'},
			{topic: 'Linked List', date: 'September 05, 2017'},
			{topic: 'Sorting Algorithms', date: 'September 05, 2017'}
		]
		},
		{ name : 'Theory of Automata', schedule: [
			{topic: 'The turing Machine', date: 'September 06, 2017'},
			{topic: 'Ardens theorem', date: 'September 07, 2017'},
			{topic: 'Lemma for regular expressions', date: 'September 07, 2017'}
		]
		},
		{ name : 'Digital Communications', schedule: [
			{topic: 'IEEE standards', date: 'September 08, 2017'}
		]
		}
	];


	$scope.initSchedule = function(selectedSub) {
		$scope.scheduleObj = selectedSub.schedule;
	};

});

app.controller('prepareScheduleAppCtrl',function($scope, $location, $http, $filter){
	console.log("prepareSchedule");
	$scope.currentDate = new Date();
	$scope.contact = {};
	var id = $location.search().id ? $location.search().id : null;
	$http({
		method: 'GET',
		url: '/userdetail/' + id
	}).then(function (success){
		console.log("I got the data for the ID I requested");
		$scope.userData = success.data;
	},function (error){
		console.log('error - ', error);
	});

	var refresh = function() {
		/*$http.get('/contactlist').success(function(response) {
			console.log("I got the data I requested");
			$scope.contactlist = response;
			$scope.contact = "";
		});*/
		$http({
			method: 'GET',
			url: '/contactlist'
		}).then(function(success) {
			console.log(success);
			$scope.contactlist = success.data;
		}, function(error) {
			console.log(error)
		});
	};

	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		var data = {
			tfirstname: this.userData.firstname,
			tlastname: this.userData.lastname,
			temail: this.userData.email,
			subject: this.contact.subject,
			topic: this.contact.topic,
			date: this.contact.date

		};
		$http({
			method: 'POST',
			url: '/contactlist',
			data: data
		}).then(function(success) {
			console.log(success);
			$scope.contactlist = success.data;
			$scope.contact = {};
			refresh();
		}, function(error) {
			console.log(error)
		});
	};

	$scope.remove = function(id) {
		console.log(id);
		$http({
			method: 'DELETE',
			url: '/contactlist/' + id
		})
			.then(function(response) {
				console.log(response.data);
				refresh();
				$scope.contact = {};
				alert('Schedule Remove - Successful !');
			}, function(rejection) {
				console.log(rejection.data);
				alert('Schedule Remove - Error !');
			});

	};

	$scope.edit = function(id) {
		console.log(id);
		$http({
			method: 'GET',
			url: '/contactlist/' + id
		}).then(function (success){
			console.log(success);
			$scope.contact = success.data;
			$scope.contact.date = new Date(new Date(success.data.date).toDateString());
		},function (error){
			console.log('error - ', error);
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		var data = {
			tfirstname: this.userData.firstname,
			tlastname: this.userData.lastname,
			temail: this.userData.email,
			subject: this.contact.subject,
			topic: this.contact.topic,
			date: this.contact.date
		};
		/*$http.put('/contactlist/' + $scope.contact._id, data).success(function(response) {
			refresh();
		});*/
		$http({
			method: 'PUT',
			url: '/contactlist/' + $scope.contact._id,
			data: data
		}).then(function (success){
			console.log(success);
			refresh();
			alert('Schedule Update - Successful !');
		},function (error){
			console.log('error - ', error);
			alert('Schedule Update - Error !');
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
	}

});

app.config(function($routeProvider){
    console.log("heyy");
    $routeProvider.when('/',{
        templateUrl:'home.html'
    })
    $routeProvider.when('/login',{
        templateUrl:'login.html'
    })
    $routeProvider.when('/signup',{
        templateUrl:'signup.html'
    })
    $routeProvider.when('/dashboard/',{ //Student homepage
        templateUrl:'studenthomepage.html'
    })
		$routeProvider.when('/dashboardTeacher/',{ //Teacher homepage
			templateUrl:'teacherhomepage.html'
		})
    
    $routeProvider.when('/new',{ //show schedule
        templateUrl:'showschedule.html'
    })
	$routeProvider.when('/prepareSchedule/',{
		templateUrl:'prepareschedule.html'
	})
	$routeProvider.when('/forgetpassword',{
		templateUrl:'forgetpassword.html'
	})
    $routeProvider.when('/fileUpload',{
		templateUrl:'uploadArticle.html'
	})
    $routeProvider.when('/visit',{
		templateUrl:'articleLibrary.html'
	})
    
});
    
/*});*/