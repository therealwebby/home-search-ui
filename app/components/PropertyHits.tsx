import {useHits} from "react-instantsearch";
import { PropertyData, PropertyHit } from "@/app/components/PropertyHit";

export default function PropertyHits() {
    const {items} = useHits<PropertyData>();

    return (
        items.map((hit) => <PropertyHit hit={hit} key={hit.objectID}></PropertyHit>)
    )
}