'use strict';
define(['angular', 'host'], function(angular, host) {
    return angular.module('app.common', [])
        .config(['$locationProvider', '$httpProvider', function($locationProvider, $httpProvider) {
            // $locationProvider.html5Mode({
            //     enabled: true,
            //     requireBase: false
            // });

            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function(data) {
                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function(obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;
                    for (name in obj) {
                        value = obj[name];
                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                        }
                    }
                    return query.length ? query.substr(0, query.length - 1) : query;
                };
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];
        }])
        .factory('config', [function() {
            var service ={};
            return service;
        }])
        .factory('httpData', ['$rootScope','$http', '$q', 'config', '$location','$state',
            function($rootScope,$http, $q, config, $location,$state) {
            this.DEBUG = false;
            this.domainUrl = this.DEBUG ? './data/' : host.api;
            this.method = this.DEBUG ? 'get' : 'post';
            this.suffix = this.DEBUG ? '.json' : '';

            var that = this,
                service = {},
                localData = {};

            function setPostInfo(infoObj) {
                var dataObj = infoObj.data || {};
                var localToken = config.getToken('crm_info')? JSON.parse(config.getToken('crm_info')):{};
                var postData = {
                    "token": localToken.token,
                    "login_id": localToken.userId,
                    "user_role": localToken.userRole,
                    "user_name": localToken.userName,
                    "platform_id": localToken.platformId,
                    "current_time": localToken.currentTime

                } ;
                postData.biz_data =  JSON.stringify(dataObj);
                //Object.keys(dataObj).forEach(function(key) {
                //    postData[key] = dataObj[key]
                //});
                var deferred = $q.defer();
                 $http({
                    method: that.method,
                    url: that.domainUrl + infoObj.url + that.suffix,
                    data: postData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;',
                        'Accept':undefined
                    }
                    // withCredentials: true
                },{
                    ignoreLoadingBar: true
                }).then(function successCallback(response) {
                    var res = response.data;
                    if (res.ret === 1) {
                        deferred.resolve(res.data);
                    } else {
                        if(res.msg == "用户未登陆"){
                            alert(res.msg);
                            window.location.href="login.html"
                        }else{
                            alert(res.msg);
                        }

                    }
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            }
                
            return service;
        }])
        .factory('math', [function() {
            return {
                numAdd: function(num1, num2) {
                    /**
                     * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1加数1 | num2加数2
                     */
                    var baseNum, baseNum1, baseNum2;
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    return Math.round(num1 * baseNum + num2 * baseNum) / baseNum;
                },
                numSub: function(num1, num2) {
                    /**
                     * 减法，避免数据相减小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被减数  |  num2减数
                     */
                    var baseNum, baseNum1, baseNum2;
                    var precision; // 精度
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
                    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
                    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
                },
                numMulti: function(num1, num2) {
                    /**
                     * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被乘数 | num2乘数
                     */
                    var baseNum = 0;
                    try {
                        baseNum += num1.toString().split(".")[1].length;
                    } catch (e) {}
                    try {
                        baseNum += num2.toString().split(".")[1].length;
                    } catch (e) {}
                    return Number(num1.toString().replace(".", "")) *
                        Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
                },
                numDiv: function(num1, num2) {
                    /**
                     * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
                     * 
                     * @param num1被除数 | num2除数
                     */
                    var baseNum1 = 0,
                        baseNum2 = 0;
                    var baseNum3, baseNum4;
                    try {
                        baseNum1 = num1.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum1 = 0;
                    }
                    try {
                        baseNum2 = num2.toString().split(".")[1].length;
                    } catch (e) {
                        baseNum2 = 0;
                    }
                    baseNum3 = Number(num1.toString().replace(".", ""));
                    baseNum4 = Number(num2.toString().replace(".", ""));
                    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
                }
            }
        }])
        .directive('backImg', function(){
            return function(scope, element, attrs){
                attrs.$observe('backImg', function(value) {
                    element.css({
                        'background-image': 'url(' + value +')',
                        'background-size' : 'cover',
                        'background-repeat':'no-repeat'
                    });
                });
            };
        })
        .controller('common_ModalInstanceCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
            $scope.ok = function() {
                $uibModalInstance.close();
            };
            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])

});
