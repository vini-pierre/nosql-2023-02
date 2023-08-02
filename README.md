# nosql-2023-02
Bancos de dados noSQL

## Utilizando Docker

[Docker Playground](https://labs.play-with-docker.com/)

## Preparando o Ambiente

- Criar uma imagem baseada no centOS

`docker pull centos`

- Iniciar um `container`

`docker run -it centos`

- Atualizar o repositório do `yum`

```
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
dnf update -y
```
