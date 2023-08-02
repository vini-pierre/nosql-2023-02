# Redis

## Referência

https://redis.io/

## Conceitos

- Banco de dados chave / valor
- Persistência dos dados não é a prioridade e sim a replicação
- Tipos de valores: primitivos (string, números, lógicos), listas, conjuntos, hash e conjuntos ordenados

## Executando

```
/bin/redis-server /etc/redis.conf &

/bin/redis-cli

ping
```

## Dados Prioritariamente em Memória

- `SET msg alo`
- Parar o servidor: `redis-cli shutdown`
- Iniciar o servidor
- `GET msg`


## Comandos

- Criar, recuperar e remover uma chave (encerar o server e observar que a chave pode ser perdida)
```
SET SP;RJ 400Km
GET SP;RJ
DEL SP;RJ
```

## Listas

```
RPUSH SP;RJ 400Km R$700,00
LRANGE SP;RJ 0 -1
LINDEX SP;RJ 0
```

## Hash

```
HSET SP;BH distancia 600 preco 800.0 empresa TAM
HGETALL SP;BH
HGET SP;BH preco
HDEL SP;BH empresa
```

## Replicação com Container

- Criar uma rede Docker: `docker network create local-network`
- Criar 3 instâncias do redis na mesma rede:
  - `docker run -it -d --name redis-node-1 --network local-network redis:5.0.3`
  - `docker run -it -d --name redis-node-2 --network local-network redis:5.0.3`
  - `docker run -it -d --name redis-node-3 --network local-network redis:5.0.3`
- Iniciar as instâncias do redis nos containers:
- `docker attach redis-node-1`
- Obter o IP do container com um `ping redis-node-1`
- Editar o arquivo de configuração: `nano /etc/redis.conf`
- Incluir o IP na propriedade bind
- Desabilitar o modo protegido: `protected-mode no`
- Verificar log: `tail -f /var/log/redis/redis.log &`
- Iniciar o nó master: `redis-server /etc/redis.conf &`
- Iniciar os nós slaves: `redis-server --replicaof redis-node-1 6379 &`

- Configuração do **master**:

```
bind 127.0.0.1 redis-node-1
protected-mode no
```

- Configuração dos **slaves**:

```
bind 127.0.0.1 redis-node-2
slaveof redis-node-1 6379
protected-mode no
```

## Sentinel

- Copiar o arquivo `/etc/redis-sentinel.conf` para `/etc/sentinel.conf`
- Configurar o monitoramento dos nós no arquivo copiado:
```
port 26379
sentinel monitor master redis-node-1 6379 2
sentinel down-after-milliseconds master 5000
sentinel failover-timeout master 5000

```

- Informações sentinel:

```
redis-cli -h redis-node-3 -p 26379
info sentinel
sentinel get-master-addr-by-name node1
sentinel get-master-addr-by-name node2
```

- Nos nós slaves alterar o IP para apontar para o master
- Alterar os nomes dos nós nas demais configurações
- Iniciar o master: `redis-server /etc/redis.conf &`
- Iniciar o slave: `redis-server --replicaof redis-node-1 6379 &`
- Verificar log: `tail -f /var/log/redis/sentinel.log &`
- Iniciar o sentinel no master e slave: `redis-sentinel /etc/sentinel.conf &`
- No master, acessar o sentinel: `redis-cli -p 5000`
- Verificar o master atual: `sentinel master mymaster`
- Parar o master: ``
