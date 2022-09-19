import gql from 'graphql-tag';

import { assetFragment } from '@ctf-components/ctf-asset/ctf-asset-query';
import { ninetailedAudienceFragment } from '@ctf-components/ctf-ninetailed-audience/ctf-ninetailed-audience-query';
import { componentReferenceFragment } from '@ctf-components/fragments';

export const quoteFragment = gql`
  fragment QuoteFragmentBase on ComponentQuote {
    __typename
    sys {
      id
    }
    internalName
    quote {
      json
      links {
        entries {
          block {
            ...ComponentReferenceFragment
          }
        }
        assets {
          block {
            ...AssetFragment
          }
        }
      }
    }
    quoteAlignment
    image {
      ...AssetFragment
    }
    imagePosition
    colorPalette
  }

  fragment QuoteFragment on ComponentQuote {
    ...QuoteFragmentBase
    ntVariantsCollection(limit: 3) {
      items {
        ...QuoteFragmentBase
        ntAudience {
          ...NinetailedAudienceFragment
        }
      }
    }
  }

  ${ninetailedAudienceFragment}
  ${componentReferenceFragment}
  ${assetFragment}
`;

export const query = gql`
  query CtfQuoteQuery($id: String!, $locale: String, $preview: Boolean) {
    componentQuote(id: $id, locale: $locale, preview: $preview) {
      ...QuoteFragment
    }
  }
  ${quoteFragment}
`;
