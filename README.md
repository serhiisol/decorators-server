![Node Decorators](https://github.com/serhiisol/node-decorators/blob/master/decorators.png?raw=true)

Base nodejs server project to show power of [@decorators](https://github.com/serhiisol/node-decorators)

Main dependencies:
- Facebook App
- Mongo

## Endpoints

- `GET /status` - server status check
- `GET /auth/facebook` - main facebook auth endpoint
- `get /auth/facebook/authorize` - facebook auth callback endpoint
- `get /auth/refresh` - refresh token endpoint

## Configuration

Copy `environment.example` to `environment` and add required environment vars

### Environment vars

- `NODE_ENV` - nodejs environment
- `PORT` - server port
- `MONGO_URI` - mongo database uri
- `FACEBOOK_APP_ID` - facebook application id
- `FACEBOOK_APP_SECRET` - facebook application secret
- `FACEBOOK_APP_CALLBACK` - facebook application callback uri
- `JWT_ISSUER` - jwt issuer
- `JWT_ACCESS_EXPIRATION` - jwt access expiration lifespan
- `JWT_REFRESH_EXPIRATION` - jwt access expiration lifespan

## Run

### Local

- Run `yarn`
- Run `yarn start`
- Navigate to `http://localhost:{{port}}`

### Docker

- Run `yarn up`
- Navigate to `http://localhost:{{port}}`

### Postman
Postman collection is available in the root folder of the project.

### Visual Studio Code
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/.bin/index.js",
      "preLaunchTask": "npm: build",
      "cwd": "${workspaceFolder}",
      "outputCapture": "std",
      "env": {
        "NODE_ENV": "development",
        "PORT": "8080",
        "MONGO_URI": "mongodb://localhost:32772/decorators",
        "FACEBOOK_APP_ID": "xxxxxxxxxxxxxxx",
        "FACEBOOK_APP_SECRET": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "FACEBOOK_APP_CALLBACK": "http://localhost:8080/auth/facebook/authorize",
        "JWT_ISSUER": "decorators",
        "JWT_ACCESS_EXPIRATION": "1h",
        "JWT_REFRESH_EXPIRATION": "30d"
      }
    },
    {
      "type": "node",
      "request": "attach",
      "port": 5858,
      "name": "Attach Program",
      "preLaunchTask": "npm: build",
      "address": "localhost",
      "sourceMaps": true,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/usr/src/service"
    }
  ]
}
```
