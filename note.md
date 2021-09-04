sequelize model:generate --name <ModelName> --attributes id:uuid
sequelize db:create
sequelize db:migrate
sequelize db:migrate:undo
sequelize db:seed:all
sequelize seed:generate --name <SeedName>
