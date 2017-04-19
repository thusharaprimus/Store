
angular.module('Store', ['ionic','ionic-toast'])

.run(function($ionicPlatform,$rootScope, $state, LoginService) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  // $rootScope.$on('$stateChangeSuccess', function(event, toState){
  //   console.log("State change...");
  //   console.log(LoginService.getUserProfile());

  //   if(toState.params){
  //     if(toState.params.authenticate && !LoginService.isLoggedIn()){
  //       $state.go('login');
  //     }
  //   }
  // });
})
.config(function($stateProvider,$urlRouterProvider, $ionicConfigProvider, $httpProvider, configProvider){
    configProvider.locals.baseUrl = "http://localhost:3000/";
    $httpProvider.interceptors.push('InterceptorService');
    $ionicConfigProvider.backButton.previousTitleText(false);
    $stateProvider
    .state('login',{
      url:'/login',
      templateUrl:'templates/login.html',
      controller:'LoginCtrl'
    })

    .state('signup',{
      url:'/signup',
      templateUrl:'templates/signup.html',
      controller:'SignupCtrl'
    })
     .state('app',{
        url:'/app',
        abstract: true,
        templateUrl: 'templates/mainmenu.html',
        controller: 'MainCtrl',
        params: {
          authenticate: true
        }
      })
    .state('app.dash',{
      url:'/dash',
      views:{
        'menuContent':{
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
      },
      params: {
        authenticate: true
      }
    })
    .state('app.product',{
      url:'/product',
      views:{
        'menuContent':{
           templateUrl:'templates/productview.html',
           controller:'ProductCtrl'
        }
      },
      params: {
        authenticate: true
      }
      
    })
    .state('app.profile', {
    url: '/profile',
    views:{
      'menuContent':{
        templateUrl:'templates/profile.html',
        controller:'ProfileCtrl'
      }
    },
    params: {
      authenticate: true
    }
  })
    .state('app.wishlist',{
      url:'/wishlist',
      views:{
        'menuContent':{
           templateUrl:'templates/wishlist.html',
           controller:'WishlistCtrl'
        }
      },
      params: {
        authenticate: true
      }
   })
    .state('app.feedback',{
      url:'/feedback',
      views:{
        'menuContent':{
           templateUrl:'templates/feedback.html',
           controller:'FeedCtrl'
        }
      },
      params: {
        authenticate: true
      }
   })
    .state('app.about',{
      url:'/about',
      views:{
        'menuContent':{
           templateUrl:'templates/about.html',
           controller:'AboutCtrl'
        }
      },
      params: {
        authenticate: true
      }
   })
    $urlRouterProvider.otherwise('/login');

})