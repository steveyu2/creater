# Creater-cli

A tool to help you reduce duplication of work in your code.

Warning: Be sure to use it in Git (or other) environments, or you will not be able to recover from operational errors

# Installing

    yarn add -D creater-cli
    npm i -D creater-cli

# Usage

[See Example](https://github.com/qw110946/creater-example)

> Clone example

    clone https://github.com/qw110946/creater-example.git
    npm install

> package.json

    {
      ...
      "scripts": {
          ...
          "creater": "creater-cli -u"
      },
      ...
    }

### example1

> ./creater/config1.js

    module.exports = {
      config: {
        dir: "src/example1"
      },
      files: [
        {
          path: "newFile.js",
          content: "i am new file"
        },
        {
          path: "newFile.css",
          content: "i am new css file in css folder"
        }
      ]
    };

> Run command

    npm run creater creater/config1.js
    .
    read config file:
      -> file path: /Users/developer5/src/creater-example/creater/config1.js
    handle file:
      -> file path: /Users/developer5/src/creater-example/src/example1/newFile.js
        :success
      -> file path: /Users/developer5/src/creater-example/src/example1/css/newFile.css
        :success
    .

> src/example1

    // src/example1/newFile.js
    i am new file
    // src/example1/css/newFile.css
    i am new css file in css folder

### example2

> src/example2

    // src/example2/actions
    const types = require('./types');

    export const getUser = () => {
      return types.GET_USER;
    };

    export default {
      getUser
    };

    // src/example2/types
    export const GET_USER = 'get_user';

    export default {GET_USER};

# Api

| name            | required | default                               | type                   | description                                                                                                         |
| --------------- | -------- | ------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| config          | false    | undefined                             | object                 | config                                                                                                              |
| config.dir      | false    | ""                                    | string                 | dir                                                                                                                 |
| files           | true     |                                       | array                  | dir                                                                                                                 |
| files[].path    | true     |                                       | string                 | Files you need to create or change                                                                                  |
| files[].format  | false    | (prevContent, content) => prevContent | function \| function[] | format content.<br/>prevContent: 'files[].path' points to the file.<br/>content: 'files[].content' like prevContent |
| files[].content | false    | ""                                    | string                 | You want to write in 'files[].path'.<br/>It can be a file path                                                      |

# Changes

### 2019-04-28

- `NEW` "creater-cli --use" command base

### 2019-04-29

- `NEW` config.format can be function array
