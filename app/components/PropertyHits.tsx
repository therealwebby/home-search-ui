import {useHits} from "react-instantsearch";
import PropertyHit from "@/app/components/PropertyHit";

export default function PropertyHits() {
    const {items} = useHits();

    return (
        items.map(hit => <PropertyHit hit={hit} key={hit.objectID}></PropertyHit>)
    )
}