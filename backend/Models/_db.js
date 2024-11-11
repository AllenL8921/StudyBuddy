import { readdirSync } from 'fs'; // Changed from 'node:fs' to 'fs'
import { basename, dirname } from 'path'; // Changed from 'node:path' to 'path'
import { fileURLToPath } from 'url'; // Changed from 'node:url' to 'url'
import { Sequelize, DataTypes } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};

// Connect to the database
console.log('Connecting to the database...');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Find all files in the current directory that end in `.model.js`
console.log('Reading model files...');
const files = readdirSync(__dirname).filter((file) => {
  if (file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-9) === '.model.js') {
    console.log(`Found model file: ${file}`); // Log the file name
    return true; // Include the file in the array
  }
  return false; // Exclude the file
});

console.log(`Total model files found: ${files.length}`);

// Dynamically import and initialize all models
console.log('Importing and initializing models...');
await Promise.all(
  files.map(async (file) => {
    try {
      const model = await import(`./${file}`);
      if (!model.default) {
        console.warn(`No default export found in ${file}`);
        return;
      }

      const namedModel = model.default(sequelize, DataTypes);
      db[namedModel.name] = namedModel;
      console.log(`Model initialized: ${namedModel.name}`);
    } catch (error) {
      console.error(`Error importing model from ${file}:`, error);
    }
  })
);

// Set up associations
console.log('Setting up associations...');
Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
    console.log(`Association set up for model: ${key}`);
  }
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Call the connection test
testConnection();

export { sequelize, testConnection };
export default db;
