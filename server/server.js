const fastify = require('fastify')({ logger: true })
const { Validator } = require('node-input-validator');

// Declare a route
fastify.get('/:nums', async(request, reply) => {
    var numeros = request.params.nums.split('-');
    var num1 = numeros[0];
    var num2 = numeros[1];

    const v1 = new Validator(num1, {
        numeros1: ['required', 'integer']
    });
    var result1 = await v1.check();

    const v2 = new Validator(num2, {
        numeros2: ['required', 'integer']
    });

    var result2 = await v2.check();

    if (result1 && result2) {
        reply.send({ suma: (+num1) + (+num2) });
    } else if (!result1) {
        reply.send('Alguno de los datos no es correcto' + v1.errors);
    } else if (!result2) {
        reply.send('Alguno de los datos no es correcto' + v2.errors);
    } else {
        reply.send('Los datos no son correcto');
    }
});

// Run the server!
const start = async() => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()