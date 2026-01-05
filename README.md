Things to do to enforce again mongodb


1. in the mongodb.js file uncomment the following code on line (6-11)
if (!MONGODB_URI) {
      throw new Error(
     'Please define the MONGODB_URI environment variable inside .env.local'
   );
}

2. dlt the following lines(27-29)
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

3. Uncomment mongodb-uri in the .env.local