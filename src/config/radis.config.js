const { createClient } = require("redis");
const env = process.env.REDIS;

try {
    const client = createClient({
        url: env
    });

    client.connect()
        .then(_ => console.log("✅ Redis is connected!"))
        .catch(e => console.log("⚠️ Redis Error: ", e.message));

    module.exports = client;
} catch (e) {
    console.log(e);
}

/*
sahil.0202018@gmail.com
    const s = await client.setEx('key', 60, 'value')
    const s = await client.set('key', 'value')
    const s = await client.get('key')
*/