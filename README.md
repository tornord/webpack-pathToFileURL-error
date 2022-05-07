# webpack-pathToFileURL-error

Repo used to reproduce Webpack pathToFileURL error.

When I run a webpack generated react component library in a create-react-app it's missing pathToFileURL function in "url".

## Background

I have created a simple react component that contains a font asset. A web page is created in the component library using webpack serve (and webpack target="web"). It works fine. Then I export the library to another react-app project (webpack target="node"). The same component code then crashes. In the react app it tries to invoke pathToFileURL from url. I guess it's a polyfill problem but it doesn't help adding `fallback: { url: require.resolve("node:url") }` or `fallback: { url: require.resolve("url") }`.

## Steps to reproduce

```shell
git clone https://github.com/tornord/webpack-pathToFileURL-error.git
cd webpack-pathToFileURL-error

cd react-library
npm install
npm run build
```

Now run from the react-app folder, a create-react-app that imports the react-library component.

```shell
cd ../react-app
npm install
npm start
```

In a web browser visit http://localhost:3000/
In the console window there should be a stack trace:

```shell
Uncaught TypeError: __webpack_require__(...).pathToFileURL is not a function
    at make namespace object:6:1
    at Object../node_modules/react-library/dist/index-library.js (Badge.css?e42e:27:1)
    at Object.options.factory (react refresh:6:1)
    at __webpack_require__ (bootstrap:24:1)
    at fn (hot module replacement:62:1)
    at Module../src/App.tsx (bundle.js:17:71)
    at Module.options.factory (react refresh:6:1)
    at __webpack_require__ (bootstrap:24:1)
    at fn (hot module replacement:62:1)
    at Module../src/index.tsx (App.tsx:13:1)
```

or (depending on using fallback url or not):

```
Uncaught Error: Cannot find module 'url'
```

Webpack is working locally. To verify (in the react-library folder):
```shell
cd ../react-library
npm run start
```
In the web browser visit http://localhost:8080/
It should work "My react component ABC".
