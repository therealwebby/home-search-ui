'use client'

import {algoliasearch} from "algoliasearch";
import { createNullCache } from '@algolia/client-common';
import {InstantSearch, Pagination} from "react-instantsearch";
import PropertyHits from "@/app/components/PropertyHits";
import {Refinement, AllRefinement} from "@/app/components/Refine";


const client = algoliasearch(
    'DMHZ4FU0FA',
    '6cb5d956db8a3e81d7900627bb50a8ad',
    {
        requestsCache: createNullCache(),
    })

export default function SearchPage() {
    return (
        <main className="font-sans grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <InstantSearch searchClient={client} indexName="listings" >
                <div className="col-span-full">
                    <AllRefinement />
                    <Refinement value="New" />
                    <Refinement value="Reviewed" />
                    <Refinement value="Rejected" />
                </div>
                <PropertyHits />
                <div className="flex justify-center items-center py-4 col-span-full">
                    <Pagination
                        classNames={{
                            root: 'flex items-center space-x-1',
                            list: 'flex items-center space-x-1',
                            item: '',
                            link: 'px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors',
                            selectedItem: 'font-bold text-green-950',
                            disabledItem: 'opacity-15 cursor-not-allowed',
                        }}
                    />
                </div>
            </InstantSearch>
        </main>
    );
}
