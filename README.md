# Decorators Service

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
Postman collection is available in the postman folder
