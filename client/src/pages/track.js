import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Layout, QueryResult} from "../components";
import {useParams} from "react-router-dom";

export const GET_TRACK = gql`
    query getTrack($trackId: ID!) {
        track(id: $trackId) {
            id
            title
            author {
                id
                name
                photo
            }
            thumbnail
            length
            modulesCount
            numberOfViews
            modules {
                id
                title
                length
            }
            description
        }
    }
`

const Track = () => {
    const {trackId} = useParams()
    return <Layout></Layout>
}

export default Track