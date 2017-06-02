export T=continuousIntegration;
# knex migrate:rollback --env ${T} && knex migrate:latest --env ${T};
knex migrate:latest --env ${T} && knex seed:run --env ${T};
