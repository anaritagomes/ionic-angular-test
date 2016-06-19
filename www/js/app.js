  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })


  var app = angular.module('todo-list', ['ionic', 'LocalStorageModule']);

  app.config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('todo-list');
    });



  app.controller('main', function ($scope, $ionicModal, localStorageService) { //store the entities name in a variable var taskData = 'task';

  taskData = 'task';

  //initialize the tasks scope with empty array
  $scope.tasks = [];

  //initialize the task scope with empty object
  $scope.task = {};

  //configure the ionic modal before use
  $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.newTaskModal = modal;
  });

  $scope.getTasks = function () {
    console.log("getTasks");
      //fetches task from local storage
            if (localStorageService.get(taskData)) {
                console.log("Existem tarefas");
                $scope.tasks = localStorageService.get(taskData);
            } else {
              console.log("Ainda não há tarefas");
                $scope.tasks = [];
            }
  }
  $scope.createTask = function () {
    console.log("createTask");
      //creates a new task
       $scope.tasks.push($scope.task);
       localStorageService.set(taskData, $scope.tasks);
       $scope.task = {};
       //close new task modal
       $scope.newTaskModal.hide();
  }
  $scope.removeTask = function (index) {
    console.log("removeTask");
      //removes a task
      $scope.tasks.splice(index, 1);
      localStorageService.set(taskData, $scope.tasks);
  }
  $scope.completeTask = function (index){
    console.log("completeTasks");
      //updates a task as completed
      if (index !== -1) {
    $scope.tasks[index].completed = true; 
   } 

    localStorageService.set(taskData, $scope.tasks); 
  }
  })