sequelize db:create
sequelize model:generate --name <ModelName> --attributes id:uuid
sequelize db:migrate
sequelize db:migrate:undo
sequelize db:seed:all
sequelize seed:generate --name <SeedName>
