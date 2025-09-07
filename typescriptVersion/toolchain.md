# How to build typescript code. Or... I have a .ts file, now what

one flow is 

```bash
# create a package.json
npm init -y

# add types for node
npm install typescript @types/node --save-dev

# create  a tsconfig.json
npx tsc --init

# now ready to startikng writting some typescript files in src folder
touch ./src/server.ts

# transpile
tsc ./src/server.ts

# run
node ./src/server.js
```


Or from Claude

### Dir structure
```bash
./src/
├── server.ts           # Entry point
├── routes/
│   ├── api.ts
│   └── auth.ts
├── utils/
│   ├── database.ts
│   └── helpers.ts
└── models/
    └── user.ts
```

## tool flow
```bash
# Install
npm install -D tsx typescript @types/node

# Run with hot reload
npx tsx watch src/server.ts
```

## package.json contents -add the follwing
```bash
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```