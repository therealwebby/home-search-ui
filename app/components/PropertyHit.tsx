import { useState} from "react";
import { UseHitsProps } from "react-instantsearch";

export type PropertyData = {
    street: string,
    id: string,
    areaName: string,
    availableAt: string,
    bedroomCount: number,
    bathrooms: number,
    price: number,
    unit: string,
    url: string,
    leadMedia: string,
    photo: Array<string>,
    _geoloc: {
        lat: string,
        lng: string
    },
    reviewStatus: "New" | "Reviewed" | "Rejected",
    indexUpdatedAt: number,
    objectID: string
}

export function PropertyHit({ hit }: { hit: PropertyData }) {
    const [reviewStatus, setReviewStatus] = useState(hit.reviewStatus);

    const handleReviewClick = () => {
        fetch("https://r01696qxa5.execute-api.us-east-1.amazonaws.com/default/mark-reviewed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                objectID: hit.objectID,
                type: "reviewed"
            })
        }).then(() => {
            setReviewStatus( "Reviewed")
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }).catch(error => console.log(error))
    }

    const handleRejectClick = () => {
        fetch("https://r01696qxa5.execute-api.us-east-1.amazonaws.com/default/mark-reviewed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                objectID: hit.objectID,
                type: "rejected"
            })
        }).then(() => {
            setReviewStatus( "Rejected")
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }).catch(error => console.log(error))
    }

    return (
        <div className="col-span-1">
            <a href={`https://${hit.url}`} target="_blank" rel="noreferrer" className="block">
                <div className="w-full h-62 overflow-hidden content-center relative">
                    <img src={`https://photos.zillowstatic.com/fp/${hit.leadMedia}`} alt={hit.street}/>
                    {
                        hit.reviewStatus === "New" && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1">
                                NEW!
                            </div>
                        )
                    }
                </div>
                <div className="w-full">
                    <h2 className="text-xl m-0.5">{hit.street} </h2>
                    <h3 className="text-l font-bold mb-1">{hit.areaName}</h3>
                    <p className="text-m mb-2"><b>Beds</b> {hit.bedroomCount}, <b>Baths </b>{hit.bathrooms}</p>
                    <p className="text-m font-bold border-cyan-800 border rounded-s"><span
                        className="inline-block bg-cyan-800 text-white pl-2 pr-2 pt-1 pb-1 mr-2">${hit.price}</span>Available: {hit.availableAt}
                    </p>
                </div>
            </a>
            {
                reviewStatus === "New" && (
                    <div className="flex flex-row mt-3">
                        <button
                            onClick={handleReviewClick}
                            className="border-2 border-green-950 text-green-950 text-s p-1 mr-2 w-full max-w-3/6">Accept
                        </button>
                        <button onClick={handleRejectClick} className="border-2 border-red-700 text-red-700 text-s p-1 w-full max-w-3/6">Reject</button>
                    </div>
                )
            }
            {
                reviewStatus === "Reviewed" && (
                    <div className="flex flex-row mt-3 max-w-3/6">
                        <button onClick={handleRejectClick} className="border-2 border-red-700 text-red-700 text-s p-1 w-full max-w-3/6">Reject</button>
                    </div>
                )
            }
        </div>
    )
}


