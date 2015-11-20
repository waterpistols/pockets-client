
(function(app) {
    'use strict';

    app.factory("History",
        function($q, _ajax, localStorageService) {
            var _keys = {
                transactions: "transactions"
            };
            return {
                sync: function() {
                    var self = this;
                    return _ajax.getHistory().then(
                        function success(res) {
                            if (res.data) {
                                return self._storeTransactions(res.data);
                            } else {
                                $q.reject(new Error('No data received'));
                            }
                        }
                    );
                },
                getHistory: function() {
                    return localStorageService.get(_keys.transactions) || [];
                },
                /**
                 * Process transactions before saving
                 */
                _storeTransactions: function(data) {
                    var obj;
                    for ( var i = 0 ; i < data.length; i++ ) {
                        obj = data[i];
                        obj.date = moment(obj.date).format("x");
                    }
                    return localStorageService.set(_keys.transactions, data);
                },
                addPocket: function(idTransaction, idPocket) {
                    _ajax.updatePocket(idTransaction, idPocket).then(
                        function success(res) {
                            if (res.data) {

                            }
                        }
                    );
                    var transactions = this.getHistory();

                    for ( var i = 0 ; i < transactions.length; i++ ) {
                        if (  transactions[i]._id === idTransaction ) {
                             transactions[i].pocketId = idPocket;
                            break;
                        }
                    }
                    localStorageService.set(_keys.transactions, transactions);
                }
            };
        }
    );

}(angular.module("pockets")));
