'use strict';

const Hapi = require('hapi'),
    Good = require('good'),
    Inert = require('inert'),
    Path = require('path');

let server = new Hapi.Server(),
    registerOptions = [{
            register: Inert,
            options: {}
        }, {
            register: Good,
            options: {
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    }, {
                        module: 'good-console'
                    }, 'stdout']
                }
            }
        }
    ];

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        let uri = Path.join(__dirname, 'src/index.html');

        reply.file(uri);
    }
});

server.route({
    method: 'GET',
    path: '/{pathToFile*}',
    handler: (request, reply) => {
        let pathArray = request.params.pathToFile.split('/'),
            parentDir = __dirname.split('/'),
            index = parentDir.indexOf('lib'),
            uri;

        if (index > -1) {
            parentDir.splice(index, 1);
        }

        uri = Path.join(parentDir.join('/'), request.params.pathToFile);

        reply.file(uri);
    }
});

server.register(registerOptions, (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
