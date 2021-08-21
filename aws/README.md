## Documentation

- https://github.com/serverless/examples/blob/master/aws-node-rest-api-typescript/package.json

## Linting

## Comments & and docs

- https://tsdoc.org/
- typeDoc

### Node js aws params

- https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
  > The third argument, callback, is a function that you can call in non-async handlers to send a response. The callback function takes two arguments: an Error and a response. When you call it, Lambda waits for the event loop to be empty and then returns the response or error to the invoker. The response object must be compatible with JSON.stringify.

## Books

Designing Web APIs - OReilly

## Comments - Post ( One to many)

https://www.alexdebrie.com/posts/dynamodb-one-to-many/

- Sort key is a timestamp + random number. Para evitar colisiones al milisegundo

## rm -rf .build on deploy

https://github.com/FormidableLabs/serverless-jetpack/issues/74#issuecomment-587746693

## Local Dynamo DB

sls dynamodb start --migrate

### Conectar NoSQL WOrkbench con el entorno local

https://blog.phillipninan.com/using-nosql-workbench-for-a-local-dynamodb?guid=none&deviceId=c94371d7-46fe-4772-9f03-c2cff0573db0

## Problemas con el schema

- Quitar de la definición los atributos que no son claves
  https://qastack.mx/programming/30866030/number-of-attributes-in-key-schema-must-match-the-number-of-attributes-defined-i

## HTTP API Serverless Framework

https://github.com/serverless/serverless/issues/7052

## Lmabda roles

- serverless framework crea roles por defecto. Hay que añadirle permisos para acceder y usar DynamoDB

## All serverless.yml config

https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/

## Ref en serverless.yml

https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html

## Fn join en serverless-yml

https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html

## Kid en los token de auth

Se usa como pista pasa saber que secreto de AWS ha firmado: https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-key-41#section-4.5
https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html

## Exposing env variables on Next

add NEXT_PUBLIC: https://nextjs.org/docs/basic-features/environment-variables

## Create Amplify

```bash
sergio@ideapad-s340 ~/repos/serverless-express-blog/client/next-blog 22:42 [main] $ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project nextblog
The following configuration will be applied:

Project information
| Name: nextblog
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Please choose the profile you want to use
  risbar
❯ default
  eb-cli
sergio@ideapad-s340 ~/repos/serverless-express-blog/client/next-blog 22:43 [main] $ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project nextblog
The following configuration will be applied:

Project information
| Name: nextblog
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS access keys
? accessKeyId:  ********************
? secretAccessKey:  [hidden]
sergio@ideapad-s340 ~/repos/serverless-express-blog/client/next-blog 22:45 [main] $ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project nextblog
The following configuration will be applied:

Project information
| Name: nextblog
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS access keys
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
? region:  eu-west-1
Adding backend environment dev to AWS Amplify Console app: dsjti32veelbx
⠴ Initializing project in the cloud...

CREATE_IN_PROGRESS amplify-nextblog-dev-224614 AWS::CloudFormation::Stack Mon Aug 16 2021 22:46:18 GMT+0200 (GMT+02:00) User Initiated
CREATE_IN_PROGRESS DeploymentBucket            AWS::S3::Bucket            Mon Aug 16 2021 22:46:21 GMT+0200 (GMT+02:00)
CREATE_IN_PROGRESS UnauthRole                  AWS::IAM::Role             Mon Aug 16 2021 22:46:21 GMT+0200 (GMT+02:00)
CREATE_IN_PROGRESS AuthRole                    AWS::IAM::Role             Mon Aug 16 2021 22:46:22 GMT+0200 (GMT+02:00)
CREATE_IN_PROGRESS UnauthRole                  AWS::IAM::Role             Mon Aug 16 2021 22:46:22 GMT+0200 (GMT+02:00) Resource creation Initiated
CREATE_IN_PROGRESS DeploymentBucket            AWS::S3::Bucket            Mon Aug 16 2021 22:46:23 GMT+0200 (GMT+02:00) Resource creation Initiated
CREATE_IN_PROGRESS AuthRole                    AWS::IAM::Role             Mon Aug 16 2021 22:46:23 GMT+0200 (GMT+02:00) Resource creation Initiated
⠼ Initializing project in the cloud...

CREATE_COMPLETE UnauthRole AWS::IAM::Role Mon Aug 16 2021 22:46:38 GMT+0200 (GMT+02:00)
⠸ Initializing project in the cloud...

CREATE_COMPLETE AuthRole AWS::IAM::Role Mon Aug 16 2021 22:46:38 GMT+0200 (GMT+02:00)
⠴ Initializing project in the cloud...

CREATE_COMPLETE DeploymentBucket            AWS::S3::Bucket            Mon Aug 16 2021 22:46:44 GMT+0200 (GMT+02:00)
CREATE_COMPLETE amplify-nextblog-dev-224614 AWS::CloudFormation::Stack Mon Aug 16 2021 22:46:46 GMT+0200 (GMT+02:00)
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

## Local Storage

- That is, the data stored in localStorage persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## SEO Checkklist

https://postcron.com/es/blog/seo-para-blogs-la-guia-basica/
Luego de este “checklist”, desarrollamos más en detalle cada una de sus puntos:

Al menos una vez en el título principal (H1).

Al menos en uno o dos headings o subtítulos.

Al menos 3 veces en el cuerpo del artículo.

Al que una vez estén marcadas en “negritas” y en “itálica”

Al menos una vez en el “Alt” de una imagen (más abajo te muestro como hacerlo y por qué)

Una vez en el URL

Al menos una vez en la Meta descripción.

## Unknown attributes

https://pawelgrzybek.com/the-difference-between-any-and-unknown-type-in-typescript/#:~:text=Both%20any%20and%20unknown%20are,heck%20you%20want%20to%20it.&text=The%20unknown%20is%20a%20type,to%20a%20more%20specific%20type.

## REST

https://www.redhat.com/es/topics/api/what-are-application-programming-interfaces
