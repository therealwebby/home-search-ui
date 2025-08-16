import {useRefinementList, useClearRefinements} from "react-instantsearch";

export function Refinement ({value}: {value: string}) {
    const { items, refine } = useRefinementList({
        attribute: 'reviewStatus'
    });
    
    const currentItem = items.find(item => item.value === value);
    const isRefined = currentItem?.isRefined || false;

    const handleToggle = () => {
        refine(value);
    };

    return (
        <div className={`inline-block rounded-4xl p-1 pr-4 pl-4 mr-3 ${!isRefined ? 'bg-gray-300' : 'bg-cyan-800 text-white'}`}>
            <button 
                onClick={handleToggle}
                className={`toggle-btn ${isRefined ? 'active' : ''}`}
            >
                {value}
            </button>
        </div>
    )
}

export function AllRefinement() {
    const { items } = useRefinementList({
        attribute: 'reviewStatus'
    });
    const { refine } = useClearRefinements({
        includedAttributes: ['reviewStatus']
    });
    
    const hasAnyRefinement = items.some(item => item.isRefined);

    const handleToggle = () => {
        refine();
    };

    return (
        <div className={`inline-block rounded-4xl p-1 pr-4 pl-4 mr-3 ${hasAnyRefinement ? 'bg-gray-300' : 'bg-cyan-800 text-white'}`}>
            <button 
                onClick={handleToggle}
                className={`toggle-btn ${!hasAnyRefinement ? 'active' : ''}`}
            >
                All
            </button>
        </div>
    )
}