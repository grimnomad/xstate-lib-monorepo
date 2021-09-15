# How to run

```bash
// install root dependencies
npm i

// install package dependencies
npm run bootstrap

// change to library and run it
cd lib
npm start

// change to server and run it
cd server
npm start
```

Now send a HTTP Post to http://localhost:3000 with a JSON body of
```json
{
    "id": "test"
}
```