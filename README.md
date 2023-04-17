# Creater-cli

A tool to help you reduce duplication of work in your code.

Warning:

- Be sure to use it in Git (or other) environments, or you will not be able to recover from operational errors
- store change to the staging areas before you use.
- This will clear know what we changed.

# Installing

    yarn add -D creater-cli
    npm i -D creater-cli

# Usage

[See Example](https://github.com/steveyu2/creater-example)

> Clone example

    clone https://github.com/steveyu2/creater-example.git
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

> src/example1

    // myUpdateFile.js
    i am update file

> creater/config1.js

    const {helper} = require('creater-cli');

    module.exports = {
      config: {
        dir: 'src/example1'
      },
      files: [
        {
          path: 'newFile.js',
          content: 'i am new file'
        },
        {
          path: 'css/newFile.css',
          content: 'i am new css file in css folder'
        },
        {
          path: 'myCopyFile1.js',
          content: '@path:../temp.js'
        },
        {
          path: 'myCopyFile2.js',
          content: helper.withPath('../temp.js') // Equate to '@path:temp.js'
        },
        {
          path: 'myCopyFile3.js',
          format: (prevContent, content) => content + '\ni am copy from temp.js',
          content: helper.withPath('../temp.js')
        },
        {
          path: 'myUpdateFile.js',
          format: (prevContent, content) => prevContent + '\n' + content + '\n' + 'update some thing',
          content: helper.withPath('../temp.js')
        }
      ]
    };

> Run command

    npm run creater creater/config1.js
    .
    read config file:
      -> file path: /.../creater-example/creater/config1.js
    handle file:
      -> file path: /.../creater-example/src/example1/newFile.js
        :success
      -> file path: /.../creater-example/src/example1/css/newFile.css
        :success
      -> file path: /.../creater-example/src/example1/myCopyFile1.js
        :success
      -> file path: /.../creater-example/src/example1/myCopyFile2.js
        :success
      -> file path: /.../creater-example/src/example1/myCopyFile3.js
        :success
      -> file path: /.../creater-example/src/example1/myUpdateFile.js
        :success
    .

> src/example1

     // src/example1/newFile.js
     i am new file
     // src/example1/css/newFile.css
     i am new css file in css folder
     // src/example1/myCopyFile1.js
     i am temp file
     // src/example1/myCopyFile2.js
     i am temp file
     // src/example1/myCopyFile3.js
     i am temp file
     i am copy from temp.js
     // src/example1/myUpdateFile.js
     i am update file
    +i am temp file
    +update some thing

### example2

> src/example2

    // src/example2/actions.js
    const types = require('./types');

    export const getUser = () => {
      return types.GET_USER;
    };

    export default {
      getUser
    };

    // src/example2/types.js
    export const GET_USER = 'get_user';

    export default {GET_USER};

> creater/config2.js

    const {helper} = require('creater-cli/helper');

    const newAction = 'getInfo';
    const newActionType = 'GET_INFO';
    const newActionTypeSmall = 'get_info';

    module.exports = {
      config: {
        dir: 'src/example2'
      },
      files: [
        {
          path: 'actions.js',
          format: [
            (prevContent, content) => {
              const match = prevContent.match(/export default \{/);
              // content = files[0].content
              return prevContent.replace(match[0], content + match[0]);
            },
            prevContent => {
              const match = prevContent.match(/export default \{/);
              const content = `\n getExample,`;
              return prevContent.replace(match[0], match[0] + content);
            },
            prevContent => {
              return prevContent.replace('getExample', newAction).replace('GET_EXAMPLE', newActionType);
            }
          ],
          content: `export const getExample = () => {
      return types.GET_EXAMPLE;
    };
    `
          // Use helper to achieve similar functions
        },
        {
          path: 'types.js',
          format: [
            helper.append(/export default \{/, {
              content: `export const GET_EXAMPLE = 'get_Example';\n\n`,
              index: 1 // Add before "export default {"
            }),
            helper.append(/export default \{/, {
              content: `GET_EXAMPLE,`,
              index: 0 // Add after "export default {"
            }),
            /*
            replace
              GET_EXAMPLE => newActionType
              get_Example => newActionTypeSmall
            */
            helper.replace({
              GET_EXAMPLE: newActionType,
              get_Example: newActionTypeSmall
            })
          ]
        }
      ]
    };

> Run command

    npm run creater creater/config2.js
    .
    read config file:
      -> file path: /.../creater-example/creater/config2.js
    handle file:
      -> file path: /.../creater-example/src/example2/actions.js
        :success
      -> file path: /.../creater-example/src/example2/types.js
        :success
    .

> src/example2

     // src/example2/actions.js
     const types = require('./types');

     export const getUser = () => {
       return types.GET_USER;
     };

    +export const getInfo = () => {
    +  return types.GET_INFO;
    +};

     export default {
    +getExample,
      getUser
     };

     // src/example2/types.js
     export const GET_USER = 'get_user';

    +export const GET_INFO = 'get_info';

    -export default {GET_USER};
    +export default {GET_INFO,GET_USER};

# Api

## Config

| name            | required | default                               | type                   | description                                                                                                          |
| --------------- | -------- | ------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| config          | false    | undefined                             | object                 | config                                                                                                               |
| config.dir      | false    | ""                                    | string                 | dir                                                                                                                  |
| files           | true     |                                       | array                  | dir                                                                                                                  |
| files[].path    | true     |                                       | string                 | Files you need to create or change                                                                                   |
| files[].format  | false    | (prevContent, content) => prevContent | function \| function[] | format content.<br/>prevContent: 'files[].path' points to the file.<br/>content: 'files[].content' like prevContent  |
| files[].content | false    | ""                                    | string                 | You want to write in 'files[].path'.<br/>It can be a file path<br/>path(eg. "@path:22.js" distinguish normal string) |

## helper

    /**
    * append
    * @search string|Regexp
    * @opts.content string
    * @opts.index 1|0 number|boolean default: 0, add before or after
    * @opts.lineFeed  Line feed in the middle
    */

    /**
    * replace
    * @object {key: value}
    *  key string: Previous value
    *  value string: After value
    * @opts.global boolean default: true, Global replacement
    */

    /**
    * withPath
    * @path string path
    */

# Changes

### 2019-04-28

- `NEW` "creater-cli --use" command base

### 2019-04-29

- `NEW` config.format can be function array

# License

MIT
