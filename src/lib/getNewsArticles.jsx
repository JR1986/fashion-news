import { request } from 'graphql-request';

const endpoint = 'https://fashionunited.info/graphql/';
const query = `
    query NewsArticles($keywords: [String]) {
      fashionunitedNlNewsArticlesConnection(first: 16, keywords: $keywords){
        edges {
          node {
            title
            description
            imageUrl
            url
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
`;

export default function getNewsArticles(variables = {}) {
    return request(endpoint, query, variables);
}
