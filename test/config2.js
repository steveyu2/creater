const { helper } = require('../');

const newAction = 'getInfo';
const newActionType = 'GET_INFO';
const newActionTypeSmall = 'get_info';

module.exports = {
  config: {
    dir: 'test/example2'
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
          return prevContent
            .replace('getExample', newAction)
            .replace('GET_EXAMPLE', newActionType);
        }
      ],
      content: `export const getExample = () => {
  return types.GET_EXAMPLE;
};
`
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
