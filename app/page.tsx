'use client'

import {algoliasearch} from "algoliasearch";
import { createNullCache } from '@algolia/client-common';


import {InstantSearch, Hits, Index} from "react-instantsearch";
import PropertyHits from "@/app/components/PropertyHits";


const client = algoliasearch(
    'DMHZ4FU0FA',
    '6cb5d956db8a3e81d7900627bb50a8ad',
    {
        requestsCache: createNullCache(),
    })
export default function Home() {
  return (
      <main className="font-sans grid grid-rows-4 min-h-screen p-8 pb-20 gap-8 sm:p-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <InstantSearch searchClient={client} indexName="listings">
              <PropertyHits />
          </InstantSearch>
      </main>
  );
}
