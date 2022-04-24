import redis from 'redis'
(async () => {
    console.log('redis client')
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    const client = redis.createClient({url: redisUrl});

    console.log('redis client', client)
    await client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    console.log('after connect')
    // Sets the key "octocat" to a value of "Mona the octocat"
    await client.set("octocat", "Mona the Octocat", redis.print);
    // Sets a key to "octocat", field to "species", and "value" to "Cat and Octopus"
    await client.hSet("species", "octocat", "Cat and Octopus", redis.print);
    // Sets a key to "octocat", field to "species", and "value" to "Dinosaur and Octopus"
    await client.hSet("species", "dinotocat", "Dinosaur and Octopus", redis.print);
    // Sets a key to "octocat", field to "species", and "value" to "Cat and Robot"
    await client.hSet("species", "robotocat", "Cat and Robot", redis.print);
    // Gets all fields in "species" key

    await client.hKeys("species", function (err, replies) {
        console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            console.log("    " + i + ": " + reply);
        });
        client.quit();
    });
    const value = await client.hKeys('species');

    console.log('value', value)

    const value1 = await client.hGet('species', 'octocat')
    console.log('value', value1)
})();