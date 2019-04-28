# Creater-cli

A tool to help you reduce duplication of work in your code.

Warning: Be sure to use it in Git (or other) environments, or you will not be able to recover from operational errors

# Installing

    yarn add -D creater-cli
    npm i -D creater-cli

# Usage

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
