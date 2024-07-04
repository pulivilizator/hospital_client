import React from "react";

export type SearchType = `doctor` | `service` | `site`
export type SearchButtonProps = {
    searchType: SearchType,
    newSearchType: SearchType,
    onChange: (e: any) => void,
    children: React.ReactNode
}

export type Directions = [{
    id: number,
    name: string,
    description: string,
    slug: string
}]