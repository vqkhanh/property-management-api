<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">🏢 Property Management API</h1>
<p align="center">NestJS + TypeORM + Postgres + Docker</p>

---

## 🚀 Features

- CRUD cho **Spaces** (entity chính).
- Self-relation (cha – con) để biểu diễn cây không gian.
- Endpoint **tree** (`GET /spaces/tree`).
- Search + Pagination (`GET /spaces`).
- Global exception filter + logging.
- Migration & seed database.
- Docker Compose cho Postgres + API.
- Swagger API docs.

---

## ⚙️ Installation

```bash
# install dependencies
npm install

#Local development
# run with default dev mode
npm run start:dev

# run explicitly with NODE_ENV=local
npm run start:local

#Docker (production-ish)
# build & run
docker compose up --build

# logs
docker compose logs -f api
#API chạy tại:
http://localhost:3000/api

#Swagger docs:
http://localhost:3000/api/docs

#Migration & Seed
# generate migration
npm run migration:generate

# run migration
npm run migration:run

# run seed
npm run seed


#API Endpoints + Terminal Demo
#Create Space
curl -X POST http://localhost:3000/api/spaces \
  -H "Content-Type: application/json" \
  -d '{"displayName":"Hà Nội","building":"VN"}'


#List Spaces
curl "http://localhost:3000/api/spaces"

#Search + Pagination
curl "http://localhost:3000/api/spaces?q=Hà&page=1&limit=2"

#Get Tree
curl "http://localhost:3000/api/spaces/tree"

#Get One
curl "http://localhost:3000/api/spaces/1"

#Update
curl -X PATCH http://localhost:3000/api/spaces/1 \
  -H "Content-Type: application/json" \
  -d '{"displayName":"Việt Nam Updated"}'

#Delete
curl -X DELETE http://localhost:3000/api/spaces/1

#Example Response
GET /spaces?q=Hà&page=1&limit=2

{
  "data": [
    { "id": 2, "displayName": "Hà Nội", "building": "VN", "parentId": 1 }
  ],
  "total": 1,
  "page": 1,
  "limit": 2
}


## License

Nest is [MIT licensed](LICENSE).


```
