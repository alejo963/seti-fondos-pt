export const env = {
  port: process.env.PORT || 3000,
  username: process.env.MONGO_INITDB_ROOT_USERNAME || 'root',
  password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'root',
  database: process.env.MONGO_DB || 'btg-fonds',
  mongoPort: process.env.MONGO_PORT || 27017,
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoConnection: process.env.MONGO_CONNECTION || 'mongodb',

  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAT7JJU4P3TWJ72WCE',
  awsSecretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ||
    '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',
  awsRegion: process.env.AWS_REGION || 'us-east-2',
  awsS3Bucket: process.env.AWS_S3_BUCKET || '',

  emailHost: process.env.EMAIL_HOST || 'email-smtp.us-east-2.amazonaws.com',
  emailPort: parseInt(process.env.EMAIL_PORT, 10) || 465,
//   emailUser: process.env.EMAIL_USER || '6f8c186926b2d1',
//   emailPassword: process.env.EMAIL_PASSWORD || '28e65ec5f31735',
};
