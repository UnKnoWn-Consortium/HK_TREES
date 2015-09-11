var app = angular.module('main', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'uiGmapgoogle-maps']);

app.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider){
    $routeProvider.when('/', {
        templateUrl: 'template/list.html',
        activeTab: 'list'
    }).when('/list', {
        templateUrl: 'template/list.html',
        activeTab: 'list'
    }).when('/map', {
        templateUrl: 'template/map.html',
        activeTab: 'map'
    });/*.when('/裝備篇', {
     templateUrl: 'equipment.html',
     controller: 'equipmentCtrl',
     controllerAs: 'ctrl'
     }).when('/其他', {
     templateUrl: 'other.html',
     controller: 'otherCtrl',
     controllerAs: 'ctrl'
     }).when('/總得分', {
     templateUrl: 'total.html',
     controller: 'totalCtrl',
     controllerAs: 'ctrl'
     }).otherwise({
     redirectTo: '/'
     });*/
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCZnV0fQajXdMKOLVH7bpi09G_mlvd45lw',
        v: '3.21'
    });
}]);

app.controller('headerCtrl', ['$modal', '$route', function($modal, $route){
    test = $route;
    this.route = $route;
    this.open = function(){
        modalInstance = $modal.open({
            animation: true,
            templateUrl: 'headerModal.html',
            controller: 'headerModalCtrl as ctrl'
        });
    };
}]).controller('headerModalCtrl', ['$modalInstance', function($modalInstance){
    this.close = function(){
        console.log("testing");
        $modalInstance.dismiss('read');
    };
}]).controller('cardSpaceCtrl', ['FBUserSvc', 'dataSvc', function(FBUserSvc, dataSvc){
    var self = this;
    this.trees = [];
    this.loadTrees = function(){
        dataSvc.getData(0).then(function(res){
            self.trees = self.trees.concat(res.data.payload);
        });
    };
}]).controller('mapSpaceCtrl', ['FBUserSvc', 'dataSvc', 'uiGmapGoogleMapApi', function(FBUserSvc, dataSvc, uiGmapGoogleMapApi){
    var self = this;
    this.map = {
        center: {
            latitude: 22.3576782,
            longitude: 114.1210181
        },
        zoom: 11
    };
    this.trees = [];
    this.loadTrees = function(){
        dataSvc.getData(0).then(function(res){
            self.trees = self.trees.concat(res.data.payload);
        });
    };
    uiGmapGoogleMapApi.then(function(){
        console.log("test");
    });

}]).controller('cardCtrl', ['govtSMRISDataSvc', function(govtSMRISDataSvc){
    this.currentPage = 1;
    this.backFace = false;
    this.toggleBackFace = function(){
        this.backFace = !this.backFace;
    };
}]);

app.factory('FBUserSvc', ['$http', function($http){
    var user = {
        userID: "",
        pwHash: ""
    };
    return {

    };
}]).factory('dataSvc', ['$http', '$q', '$timeout', function($http, $q, $timeout){
    return {
        getData: function(offset){
            // mock
            var data = [{ // Reference object database schema (removed=false)
                district: "cw",
                location: "Arbuthnot Road",
                simar_no: "11sw-b/r74",
                coordinate: {
                    latitude: 22.279790330,
                    longitude: 114.154877119
                },
                govt: true,
                dept: "hyd",
                removed: false,
                stone_wall_tree: true,
                species: "Ficus Microcarpa",
                register_no: "CW/002",
                dept_no: "hyd_hk_11sw_b_r74_0_wt2",
                photos: [{path: "hyd_hk_11sw_b_r74_0_wt2.jpg"}]
            }, { // Reference object database schema (removed=true)
                district: "cw",
                location: "Arbuthnot Road",
                simar_no: "11sw-b/r74",
                coordinate: {
                    latitude: 22.279690330,
                    longitude: 114.154777119
                },
                govt: true,
                dept: "hyd",
                removed: true,
                removed_date: "2015-06-05T12:00:00.000Z",
                removed_reasons: ["Trunk Failure"],
                stone_wall_tree: true,
                species: "Ficus Virens Var. Sublanceolata",
                register_no: "CW/003",
                dept_no: "hyd_hk_11sw_b_r74_0_wt3",
                photos: [{path: "hyd_hk_11sw_b_r74_0_wt3.jpg"}]
            }, {
                district: "cw",
                location: "Arbuthnot Road",
                simar_no: "11sw-b/r74",
                coordinate: {
                    latitude: 22.279880330,
                    longitude: 114.154977119
                },
                govt: true,
                dept: "hyd",
                removed: false,
                stone_wall_tree: false,
                species: "Ficus Virens Var. Sublanceolata",
                register_no: "CW/004",
                dept_no: "hyd_hk_11sw_b_r74_0_wt4",
                photos: [{path: "hyd_hk_11sw_b_r74_0_wt4.jpg"}]
            }, {
                district: "cw",
                location: "Borrett Road",
                simar_no: "11sw-b/r530",
                coordinate: {
                    latitude: 22.274896745,
                    longitude: 114.164590480
                },
                govt: true,
                dept: "hyd",
                removed: false,
                stone_wall_tree: true,
                species: "Ficus Microcarpa",
                register_no: "CW/007",
                dept_no: "hyd_hk_11sw_b_r530_0_wt1",
                photos: [{path: "hyd_hk_11sw_b_r530_0_wt1.jpg"}]
            }, {
                district: "cw",
                location: "Bowen Road",
                simar_no: "11sw-b/fr124",
                coordinate: {
                    latitude: 22.274598157,
                    longitude: 114.158467993
                },
                govt: true,
                dept: "hyd",
                removed: false,
                stone_wall_tree: false,
                species: "Ficus Virens Var. Sublanceolata",
                register_no: "CW/008",
                dept_no: "hyd_hk_11sw_b_fr124_0_wt1",
                photos: [{path: "hyd_hk_11sw_b_fr124_0_wt1.jpg"}]
            }];
            return $q(function(resolve, reject){
                $timeout(1000).then(function(){
                    resolve({data: {payload: data.slice(offset)}});
                });
            });
            // ----

            /* API Service
             return $http.get('api/trees', {params: {'offset': offset}});
             */
        }
    };
}]).factory('govtSMRISDataSvc', ['$http', function($http){
    return {
        getSlope: function(sn){
            return $http.get('http://www2.slope.landsd.gov.hk/smris/getSlopeBySlopeNo', {params: {'sn': sn}});
        },
        getSlopeTechInfo: function(sn){
            return $http.get('http://www2.slope.landsd.gov.hk/smris/getSlopeTechInfo', {params: {'sn': sn}});
        }
    }
}]);

app.filter('districtFilter', [function(){
    var dist_table = {
        cw: 'Central and Western',
        e: 'Eastern',
        s: 'Southern',
        wc: 'Wan Chai',
        kc: 'Kowloon City',
        ktn: 'Kwun Tong',
        ssp: 'Sham Shui Po',
        wts: 'Wong Tai Sin',
        ytm: 'Yau Tsim Mong',
        is: 'Island',
        kts: 'Kwai Tsing',
        n: 'North',
        sk: 'Sai Kung',
        st: 'Sha Tin',
        tp: 'Tai Po',
        tw: 'Tsuen Wan',
        tm: 'Tuen Mun',
        yl: 'Yuen Long'
    };
    return function(input){
        return dist_table[input];
    };
}]).filter('areaFilter', [function(){
    var area_table = {
        cw: 'Hong Kong',
        e: 'Hong Kong',
        s: 'Hong Kong',
        wc: 'Hong Kong',
        kc: 'Kowloon',
        ktn: 'Kowloon',
        ssp: 'Kowloon',
        wts: 'Kowloon',
        ytm: 'Kowloon',
        is: 'New Territories',
        kts: 'New Territories',
        n: 'New Territories',
        sk: 'New Territories',
        st: 'New Territories',
        tp: 'New Territories',
        tw: 'New Territories',
        tm: 'New Territories',
        yl: 'New Territories'
    };
    return function(input){
        return area_table[input];
    };
}]).filter('distClassFilter', [function(){
    var dist_table = {
        cw: 'central-and-western',
        e: 'eastern',
        s: 'southern',
        wc: 'wan-chai',
        kc: 'kowloon-city',
        ktn: 'Kwun-tong',
        ssp: 'sham-shui-po',
        wts: 'wong-tai-sin',
        ytm: 'yau-tsim-mong',
        is: 'island',
        kts: 'kwai-tsing',
        n: 'north',
        sk: 'sai-kung',
        st: 'sha-tin',
        tp: 'tai-po',
        tw: 'tsuen-wan',
        tm: 'tuen-mun',
        yl: 'yuen-long'
    };
    return function(input){
        var temp = {};
        temp[dist_table[input]] = true;
        return temp;
    }
}]);