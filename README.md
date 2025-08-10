Waste Reports API - Playground

Sandbox project to explore NestJS, GraphQL (code-first), Prisma, PostgreSQL, Docker, and pnpm.
This is not intended for production use.

Tech Stack:
• NestJS (REST + GraphQL, Apollo Server)
• GraphQL (code-first, auto schema generation)
• Prisma (ORM) + PostgreSQL
• pnpm (package manager)
• Docker / Docker Compose

Getting Started:

Prerequisites:
• Node.js 18+ (if running without Docker)
• Docker & Docker Compose
• pnpm (npm i -g pnpm)

Quick Start (Docker):
docker compose down -v
docker compose build –no-cache
docker compose up

API will be available:
• REST: http://localhost:3000/ (Hello World)
• GraphQL: http://localhost:3000/graphql (Apollo Sandbox)

If you see “Cannot GET /”, make sure that AppController is registered and in main.ts there is app.listen(3000, '0.0.0.0').

Environment:
In Docker, DATABASE_URL points to the postgres service.

Example .env for locale:
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb

In docker-compose.yml:
DATABASE_URL: postgresql://myuser:mypassword@postgres:5432/mydb

Prisma:
pnpm prisma generate — client generation
pnpm prisma migrate dev -n init — migration (local)
docker compose exec api pnpm prisma migrate deploy — migration to Docker

GraphQL:
The project uses a code-first approach, the schema is generated in schema.gql

Example query:
query Reports {
reports {
edges {
node {
id
title
status
createdBy { email }
}
cursor
}
pageInfo { endCursor hasNextPage }
}
}

Example mutation (mock auth):
mutation CreateReport($input: CreateReportInput!) {
createReport(input: $input) {
id
title
status
createdBy { email }
}
}

Variables:
{
“input”: { “type”: “BIN_OVERFLOW”, “title”: “Overflow near #42”, “lat”: 50.45, “lng”: 30.52 }
}

Auth header:
Authorization: Bearer dev-token

Project Structure:
src/
app.module.ts
app.controller.ts
app.service.ts
main.ts
prisma/
prisma.service.ts
user/
user.module.ts
user.resolver.ts
user.service.ts
entities/user.entity.ts
report/
report.module.ts
report.resolver.ts
report.service.ts
dto/
create-report.input.ts
update-status.input.ts
entities/report.entity.ts
prisma/schema.prisma
docker-compose.yml
Dockerfile

Docker:
api depends on postgres by healthcheck
api runs: pnpm prisma generate && pnpm prisma migrate deploy && node dist/main.js
the application listens on 0.0.0.0:3000

Useful commands:
docker compose logs -f api
docker compose logs -f postgres
docker compose exec api sh

Scripts:
“build”: “nest build”
“start:dev”: “nest start –watch”
“start:prod”: “node dist/main.js”
“prisma:generate”: “prisma generate”
“prisma:migrate”: “prisma migrate dev”

Notes & Next Steps:
• Replace mock auth with JWT
• Add validation (class-validator, ValidationPipe)
• DataLoader for optimized links
• E2E tests (graphql-request)
• Subscriptions for live updates

Disclaimer:
This is a learning project for experimenting and learning technologies.
