const envVars = {
  env: process.env.NODE_ENV,
  apiUrl: process.env.REACT_APP_API_URL,
};

let missingEnvVars: string[] = [];
for (const [key, value] of Object.entries(envVars)) {
  if (!value) {
    missingEnvVars.push(key);
  }
}

if (missingEnvVars.length) {
  throw new Error(`
    The following ENV variables are missing: 
    ${missingEnvVars.join(', ')}
    Please, check ".env.${envVars.env}" file.`);
}

export default envVars;
