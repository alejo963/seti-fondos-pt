export const env = {
    port: process.env.PORT || 3000,
    username: process.env.MONGO_INITDB_ROOT_USERNAME || "root",
    password: process.env.MONGO_INITDB_ROOT_PASSWORD || "root",
    database: process.env.MONGO_DB || "btg-fonds",
    mongoPort: process.env.MONGO_PORT || 27017,
    mongoHost: process.env.MONGO_HOST || "localhost",
    mongoConnection: process.env.MONGO_CONNECTION || "mongodb",
}