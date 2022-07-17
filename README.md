# React typescript / Firebase Auth

typescript React App sample with Firebase Authentication.

supported Firebase login/register methods:

- Email and Password
- Facebook
- CustomToken

## versions

- react: 18.2.0
- firebase: 9.9.0
- react-router-dom: 6.3.0

## usage

### setup Firebase Authentication, Facebook App and CloudFunctions at first.

ref.(JP):

- [【完全版】React の Firebase Authentication(認証)を基礎からマスターする](https://reffect.co.jp/react/react-firebase-auth)
- [【React/TypeScript】Firebase でメール認証と Google 認証を実装する](https://btj0.com/blog/react/firebase-auth/)
- [[Firebase] Authentication で Facebook 認証 (Web 編)](https://blog.katsubemakito.net/firebase/firebase-authentication-facebook-web1)
  etc.

### install package

```
$ cd app
$ yarn install
$ cd ../cloudfunctions/functions
$ yarn install
```

### edit app/.env

setup Firebase config parameters and CloudFunctions api_secret on app/.env file.
copy .env.sample and fill parameters.

### setup functions app

download account service json from console and save it at cloudfunctions/fuctions/account
edit cloudfinctions/functions/.env, cloudfunctions/.firebaserc

### start app

```
$ cd app
$ yarn start
```

### run emulator of CloudFunctions

```
$ cd cloudfunctions/functions
$ yarn serve
```

### localhost to https with Docker

Facebook login requires secure connection. It fails when redirect URI is not https.

For example, by using [SteveLTN/https-portal](https://github.com/SteveLTN/https-portal) image, container can forward request: https://localhost:3443 to http://localhost:3000.
If not work, add following lines to docker-compose.yml.

```
    extra_hosts:
      - "host.docker.internal:172.17.0.1"
```

```
$ docker-compose up -d
```

Ignore security warning on Chrome Browser.

```
chrome://flags/#allow-insecure-localhost
```

via. [Docker でローカル開発環境の https 化](https://qiita.com/muk-ai/items/413ae83b0a241495dd34)

### access

https://locahost:3443
