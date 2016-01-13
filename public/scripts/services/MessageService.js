app.factory('MessageService', MessageService);

MessageService.$inject = ['$resource'];

function MessageService($resource) {

      return $resource('/api/users/:userId/messages', { userId: '@id'},
        {getMsgs:{method: 'GET', isArray: true}});
}