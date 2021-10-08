import { gql } from "@apollo/client";

export const LOAD_PROD = gql`
  query {
    getAllProduct {
      id
      name
      description
      location
      price
    }
  }
`;