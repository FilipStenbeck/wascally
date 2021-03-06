module.exports = function( rabbit, subscribeTo ) {
	return rabbit.configure( {
		// arguments used to establish a connection to a broker
		connection: {
			user: 'bunneh',
			pass: 'rabbit',
			server: [ '127.0.0.1' ],
			port: 5672,
			vhost: '%2f',
		},

		// define the exchanges
		exchanges: [ 
			{
				name: 'wascally-pubsub-requests-x',
				type: 'direct',
				autoDelete: true
			},
			{
				name: 'wascally-pubsub-messages-x',
				type: 'fanout',
				autoDelete: true
			}
		],

		// setup the queues, only subscribing to the one this service
		// will consume messages from
		queues: [ 
			{
				name: 'wascally-pubsub-requests-q',
				autoDelete: true,
				subscribe: subscribeTo === 'requests'
			},
			{
				name: 'wascally-pubsub-messages-q',
				autoDelete: true,
				subscribe: subscribeTo === 'messages'
			}
		],

		// binds exchanges and queues to one another
		bindings: [ 
			{
				exchange: 'wascally-pubsub-requests-x',
				target: 'wascally-pubsub-requests-q',
				keys: [ '' ]
			},
			{
				exchange: 'wascally-pubsub-messages-x',
				target: 'wascally-pubsub-messages-q',
				keys: []
			}
		]
	} );
};