import axios from 'axios';
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Get all posts
export const getPosts = async () => {
  const query = gql`
    query allPosts {
      postsConnection {
        edges {
          node {
            createdAt
            slug
            title
            excerpt
            id
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            author {
              bio
              id
              name
              photo {
                url
              }
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

// Recent posts
export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        id
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

// Similar posts
export const getSimilarPosts = async (slug, categories) => {
  const query = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        id
        createdAt
        slug
        featuredImage {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });
  return result.posts;
};

// Get all categories
export const getCategories = async () => {
  const query = gql`
    query getPostCategories {
      categories {
        name
        slug
        id
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

// Single post details
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

// Post a comment

export const submitComment = async (comment) => {
  const result = await axios.post('/api/comments', comment);
  console.log(result);
  return result.data;
};

// Get Comments
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

// Get posts from same category
export const getPostsByCategory = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges;
};
