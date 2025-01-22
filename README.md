# Acid4Sigmas Tools
This project is a simple web application made in react + vite + sdm + WebAssambely
the goal of this project is to have some useful tools in the browser without being able to trace back what you actually did on the website.
this is why i chose WebAssambely for this task, this way, we can process everything locally.

# Build instructions
## Prerequisite
- [Rust](https://www.rust-lang.org/tools/install)
- [Nodejs and Npm](https://nodejs.org/en/download)
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

## Instructions

### Build the WebAssembly
1. if you haven't already, install wasm pack with `cargo install wasm-pack`
2. build the wasm binary with `wasm-pack build`

### Build the Frontend
1. Install all dependencies `npm i`
2. Run/Build the frontend

here is how you can run it
```
npm run dev
```
if you want to directly build it, follow these steps

```
npm run build
cd dist/
npx http-server
```
