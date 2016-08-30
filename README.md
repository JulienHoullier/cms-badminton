# OCC-Badminton

## Tables des matières

1. [Pré-requis machine](#pre-requis-machine)
2. [Installation](#installation)
3. [Aide](#aide)


## Pré-requis machine

* NodeJS & npm
* Git
* MongoDB

## Installation

```sh
$ npm install               # Développement
```

Configurer son environnement en créant un fichier **.env** à la racine du projet (non partagé), avec ces valeurs :

```
COOKIE_SECRET=HbSvqDbnT=<s5bbf7aw@Ux)k(V&`TXg{UPO$~boX~`t!&FPRA}uG)we$vlIQk32u
CLOUDINARY_URL=cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo
MANDRILL_API_KEY=NY8RRKyv1Bure9bdP8-TOQ

MAIL_HOST=<smtp de test>
MAIL_USR=<utilisateur de test>
MAIL_PWD=<password de test>
```



Lancer le projet :

```sh
$ node keystone
```

## Aide

### Problèmes courants

---
Erreur au démarrage :

```sh
Error: Cannot find module 'unicode/category/So'
```

Solution : il faut installer le paquet unicode-data :

```sh
sudo apt-get install unicode-data
```
---
