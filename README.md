# ts-sandbox

## setup
### start from template

### tune .npmrc / private package を使う場合
* `cp .npmrc.template .npmrc`
* replace `[NODE_AUTH_TOKEN]`

### install packages
```shell script
yarn install
```

### 動作確認
```shell script
yarn test
```

### git commit

### Jenkins を使う場合は
#### tune .env
* `cp .env.template .env`
* tune for project

#### create pipeline at jenkins

#### push

## Firebaseエミュレータを使う場合は
以下をエミュレータと合わせる
* `firebase use [エミュレータのプロジェクトID]`
* `firebase.json`や`docker-compose.yml`のポート指定をエミュレータのポートと合わせる
