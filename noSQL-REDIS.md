# Redis

## Referência

https://redis.io/

## Conceitos

- Banco de dados chave / valor
- Persistência dos dados não é a prioridade e sim a replicação
- Tipos de valores: primitivos (string, números, lógicos), listas, conjuntos, hash e conjuntos ordenados

## Utilizando Docker

[Docker Playground](https://labs.play-with-docker.com/)

## Preparando o Ambiente

- Criar uma imagem baseada no centOS

`docker pull centos`

- Iniciar um `container`

`docker run -it -p 6379:6379 --name redis centos`

- Atualizar o repositório do `yum`

```
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
dnf update -y
```

## Instalando Redis no Container

yum install -y redis

## Executando

```
redis-server --protected-mode no &

redis-cli

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
KEYS *
DEL SP;RJ
```
- Outras operações
    - `INCR`: incrementa em uma unidade
    - `DECR`: decrementa em uma unidade
    - `INCRBY`: incrementa em X unidades
    - `DECRBY`: decrementa em X unidades
    - `APPEND`: concatena uma `String` ao valor (também `String`) de uma chave
    - `GETRANGE`: obtem uma substring do valor associado a uma chave

- **Exercício**: Quatro equipes de futebol de enfrentam em dois jogos simultâneos. Como controlar o placar dos jogos utilizando *Redis*? Considere também a possibilidade do cancelamento de gols.

## Listas

- Uma única chave pode ter mais de um valor associado
- Novos valores são adicionados à direita da lista (item 1 -> item 2 -> item n) com `RPUSH` ou à esquerda com `LPUSH`
- Valores são removidos da esquerda com o `LPOP`
- Para listar todos os valores utilizar o `LRANGE`
- O índice de um valor pode ser obtido por meio do `LINDEX`
- `LTRIM` remove elementos de uma lista fora de um intervalo definido
- `RPOPLPUSH` remove um elemento da direita de uma lista e adiciona à esquerda em outra

```
RPUSH SP;RJ 400Km R$700,00
LRANGE SP;RJ 0 -1
LINDEX SP;RJ 0
```
- **Exercício**: verificar se a expressão `(10 * 2 + (3 -1)` está correta quanto à quantidade de parêntesis abertos e fechados
- **Exercício**: construir um sistema de senhas de atendimento em uma agência bancária considerando uma fila normal e também uma prioritária
- **Exercício**: controlar uma lista de compras com itens que devem ser comprados no mercado e os que já foram colocados no carrinho

## Conjuntos (Sets)

- Diferem das listas por não permitirem valores duplicados para uma mesma chave
- Principais comandos
  - `SADD`:  adiciona / cria um Set incluindo itens
  - `SMEMBERS`: retorna todos os itens de um Set
  - `SISMEMBER`: verifica se um item pertence ao Set
  - `SREM`: remove um item do Set (se existir)
  - `SCARD`: retorna o número total de itens do Set
  - `SRANDMEMBER`: retorna um item aleatório
  - `SPOP`: remove itens da esquerda
  - `SMOVE`: move itens de um set para outro
  - `SDIFF`: retorna os elementos distintos entre conjuntos
  - `SDIFFSTORE`: mesmo que anterior só que inclui itens no conjunto destino
  - `SINTER`: retorna elementos em comum entre conjuntos
  - `SINTERSTORE`: mesmo que anterior só que inclui itens no conjunto destino
  - `SUNION`: une os dois conjuntos sem repetir itens
  - `SUNIONSTORE`: mesmo que anterior só que inclui itens no conjunto destino

- **Exercício**: criar um controle de ocupação de assentos em um vôo (RDIS888) onde devem fazer parte do conjunto as identificações dos assentos já ocupados:
  - Antes de reservar um assento verificar se ele já está alocado no vôo
  - Oferecer a opção de cancelamento da reserva do assento no vôo
  - Criar um segundo vôo (RDIS999) e reservar alguns assentos
  - Verificar quais assentos são comuns e distintos entre os dois vôos
  - Transferir todos os assentos que não são comuns para um terceiro vôo (RDI000)

## Hash

- Hashes podem ser vistos como sub-chaves e comparados a registros em um banco de dados relacional ou ainda adocumentos em bancos de dados noSQL
- Principais operações:
  - `HMSET`: cria / atualiza chaves (mais de uma)
  - `HGET`: retorna o valor de uma chave
  - `HMGET`: retorna valores de chaves
  - `HDEL`: remove uma chave
  - `HLEN`: retorna a quantidade de chaves
  - `HEXISTS`: verifica se uma sub-chave existe
  - `HKEYS`: retorna todas as sub-chaves
  - `HVALS`: retorna todos os valores armazenados nas sub-chaves
  - `HINCRBY` à incrementa uma sub-chave baseado em um valor inteiro
  - `HINCRBYFLOAT` à incrementa uma sub-chave baseado em um valor decimal

```
HSET SP;BH distancia 600 preco 800.0 empresa TAM
HGETALL SP;BH
HGET SP;BH preco
HDEL SP;BH empresa
```
- **Exercício**: criar uma estrutura para armazenar o nome de um aluno, sua turma e semestre (escolher a chave apropriadamente). Atualizar o semestre atual.

## ZSet

- ZSets se assemelham aos Hashes mas as chaves (membros) são únicas e os valores (scores) devem ser apenas números
- Itens podem ser acessados de maneira ordenada
- Principais operações:
  - `ZREM`: remove membros
  - `ZCARD`: retorna o número de membros
  - `ZCOUNT`: retorna a quantidade de membros com o score entre os parâmetros informados
  - `ZRANK`: retorna a posição do membro
  - `ZSCORE`: retorna o score de um membro
  - `ZRANGEBYSCORE`: retorna os membros cujo score estejam entre determinado intervalo

- **Exercício**: armazenar a quantidade de gols marcados por um jogador em determinado campeonato.

## Coordenadas Geográficas

- É possível armazenar coordenadas geográficas (latitude / longitude)
- O comando `GEOADD` adiciona uma coordenada

```
> GEOADD bikes:rentable -122.27652 37.805186 station:1
> GEOADD bikes:rentable -122.2674626 37.8062344 station:2
> GEOADD bikes:rentable -122.2469854 37.8104049 station:3

```
- Pode-se consultar coordenadas com base em um raio de distância:
```
GEOSEARCH bikes:rentable FROMLONLAT -122.2612767 37.7936847 BYRADIUS 5 km WITHDIST
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
