# hyperfine

<p align="center">
  <a href="https://github.com/pablopunk/miny"><img src="https://img.shields.io/badge/made_with-miny-1eced8.svg" /> </a>
  <a href="https://www.npmjs.com/package/hyperfine"><img src="https://img.shields.io/npm/dt/hyperfine.svg" /></a>
</p>

<p align="center">
  <i>Install hyperfine command easily</i>
</p>

## Install

It will download and install the latest official release [from github](https://github.com/sharkdp/hyperfine/releases).

```sh
npm install -g hyperfine
```

## Usage

```bash
$ hyperfine --help
```

## Docker

You'll need the `--unsafe-perm` option on `npm`. Check this example:

```
FROM mhart/alpine-node:12
RUN npm i -g hyperfine --unsafe-perm
```

## License

MIT

## Original Author

This fork made possible by [pablo.pink](https://pablo.pink)

| ![me](https://gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?size=100) |
| ---------------------------------------------------------------------------- |
| [Pablo Varela](https://pablo.pink)                                           |
