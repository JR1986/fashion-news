import { request } from 'graphql-request';

const endpoint = 'https://fashionunited.info/graphql/';
const query = `
    query NewsArticles($keywords: [String], $offset: Int) {
      fashionunitedNlNewsArticles(keywords: $keywords, offset: $offset ) {
        title
        url
        imageUrl
        description
      }
    }
`;


export default function getNewsArticles(variables = {}) {
    return request(endpoint, query, variables);
}
