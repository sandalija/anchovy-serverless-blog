# Blogging powered by AWS serverless services

## Dependencies

### Serverless Framework

This project uses [Serverless Framework](https://www.npmjs.com/package/serverless) to deploy AWS resources.

```bash
npm install -g serverless
```

### AWS CLI

Under the hood, Serveless Framework uses AWS CLI. Install and configure it following [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## Deploy AWS resources

First, install node dependecies

```bash
npm install
```

Use provided npm commnads to deploy

```bash
npm run deploy # deploys on default stage from serverless.yaml (dev)
```

In order to deploy on production:

```bash
npm run deploy:prod
```

### Docs

This project generates documentation using [TypeDoc](http://typedoc.org/). The easiest way is run a server on `aws/docs/`. I recommend VS Code extensions [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Next JS client

### Run locally

Install dependecies and run the server locally

```bash
npm i
npm run dev
```

### Deploy

> WIP
