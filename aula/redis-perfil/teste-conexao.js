const redis = require('redis');

async function teste() {
    // redis-16356.c92.us-east-1-3.ec2.cloud.redislabs.com:16356
    // CHquhpuKvEiJVCZcJtjTRCPVJJCtnyXx
    console.log('Teste conexao redis x nodejs')
    console.log('Criar o client')
    const cli = redis.createClient({
        password: 'bZGnP1l8G7ZPm5mLfQCeq49KarHlXztr',
        socket: {
            host: 'redis-14249.c261.us-east-1-4.ec2.cloud.redislabs.com',
            port: 14249
        }
    });
    console.log('Estabelecer conexao')
    await cli.connect()
    //const resultado = await cli.ping()
    //console.log(resultado)
    //await cli.set('app', 'Chave gerada pela aplicação Nodejs')
    const ret = await cli.get('app')
    console.log(ret)
    console.log('fim')
}

teste();