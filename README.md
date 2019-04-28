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

> ./creater/config1.js

    module.exports = {
      config: {
        dir: "src"
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
      -> file path: E:\mygit\creater-example\creater/config1.js
    handle file:
      -> file path: E:\mygit\creater-example\src\newFile.js
        :success
      -> file path: E:\mygit\creater-example\src\css/newFile.css
        :success
    .

> src

    // src/newFile.js
    i am new file
    // src/css/newFile.css
    i am new css file in css folder

# Api

| name            | required | default                               | type     | description                                                                                                         |
| --------------- | -------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| config          | false    | undefined                             | object   | config                                                                                                              |
| config.dir      | false    | ""                                    | string   | dir                                                                                                                 |
| files           | true     |                                       | array    | dir                                                                                                                 |
| files[].path    | true     |                                       | string   | Files you need to create or change                                                                                  |
| files[].format  | false    | (prevContent, content) => prevContent | function | format content.<br/>prevContent: 'files[].path' points to the file.<br/>content: 'files[].content' like prevContent |
| files[].content | false    | ""                                    | string   | You want to write in 'files[].path'.<br/>It can be a file path                                                      |

# Changes

### 2019-04-28

- `NEW` "creater-cli --use" command base
