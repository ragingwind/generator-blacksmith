# Generator-blacksmith

Yeoman generator for [blacksmith]( http://goo.gl/kS0z3 ).

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-blacksmith`
- Run: `yo blacksmith`

## Generators

Avaiable generators:

* [blacksmith](#app)
* [blacksmith:post](#post)

### App
Sets up a new blacksmith app, generating all the boilerplate you need to get started.

### Post
Generate and create a new post files at `content/posts'

Example:
```bash
yo blacksmith:post title authorname
```

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
