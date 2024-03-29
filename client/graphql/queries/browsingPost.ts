import { gql } from "@apollo/client"
import { RealEstateCategory } from "../../types/enums/realEstate"
import { ApartmentFilter, ApartmentInterface } from "../../types/interfaces/apartment"
import { BusinessPremisesFilter, BusinessPremisesInterface } from "../../types/interfaces/businessPremises"
import { HouseFilter, HouseInterface } from "../../types/interfaces/house"
import { LandFilter, LandInterface } from "../../types/interfaces/land"
import { MotalFilter, MotalInterface } from "../../types/interfaces/motal"
import { AcreageFilter, AddressFilter, PaginationFilter, PriceFilter } from "../../types/interfaces/realEstate"

export const GET_PROJECTS_LIST = gql`
    query projects {
        projects: getProjects {
            _id
            projectName
        }
    }
`

export interface GetProjectsListData {
    projects: {
        _id: string
        projectName: string
    }[]
}

export const GET_ALL_POSTS = gql`
    query Posts($filter: RealEstateFilter!, $paging: PaginationArgs, $search: String) {
        posts: getRealEstatePosts(filter: $filter, paging: $paging, search: $search) {
            apartments {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink

            }

            houses {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }
                
                overview {
                    numberOfBedrooms
                }

                timeStamp
                category
                directLink

            }

            
            lands {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }

                timeStamp
                category
                directLink

            }

            businessPremises {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                    
                }

                timeStamp
                category
                directLink

            }

            motals {
                __typename
                title
                media {
                    images
                }
                detail {
                    acreage {
                        totalAcreage
                    }
                    pricing {
                        total
                    }
                    address {
                        province
                    }
                }

                timeStamp
                category
                directLink

            }
        }
    }
`
export interface AllPostsVars {
    filter: {
        category: RealEstateCategory | string
        address?: AddressFilter
        price?: PriceFilter
        acreage?: AcreageFilter
        project?: string
    }
    paging?: PaginationFilter
    search?: string
}

export interface AllPostsResult {
    posts: {
        apartments: (ApartmentInterface & { __typename: string })[]
        houses: (HouseInterface & { __typename: string })[]
        lands: (LandInterface & { __typename: string })[]
        businessPremises: (BusinessPremisesInterface & { __typename: string })[]
        motals: (MotalInterface & { __typename: string })[]
    }
}

export const GET_APARTMENT_POSTS = gql`
    query Apartments($filter: ApartmentFilter!, $paging: PaginationArgs) {
        apartments: getApartments(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }
    }
`
export interface ApartmentPostResult {
    apartments: (ApartmentInterface & { __typename: string })[]
}

export interface ApartmentPostVars {
    filter: ApartmentFilter
    paging?: PaginationFilter
}

export const GET_HOUSE_POSTS = gql`
    query Houses($filter: HouseFilter!, $paging: PaginationArgs) {
        houses: getHouses(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }
    }
`
export interface HousePostResult {
    houses: (HouseInterface & { __typename: string })[]
}

export interface HousePostVars {
    filter: HouseFilter
    paging?: PaginationFilter
}

export const GET_LAND_POSTS = gql`
    query Lands($filter: LandFilter!, $paging: PaginationArgs) {
        lands: getLands(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }

            timeStamp
            category
            directLink
        }
    }
`

export interface LandPostVars {
    filter: LandFilter,
    paging?: PaginationFilter
}

export interface LandPostResult {
    lands: (LandInterface & { __typename: string })[]
}

export const GET_BUSINESS_PREMISES_POSTS = gql`
    query BusinessPremises($filter: BusinessPremisesFilter!, $paging: PaginationArgs) {
        businessPremises: getBusinessPremises(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }

            timeStamp
            category
            directLink
        }
    }
`

export interface BusinessPremisesPostResult {
    businessPremises: (BusinessPremisesInterface & { __typename: string })[]
}

export interface BusinessPremisesPostVars {
    filter: BusinessPremisesFilter
    paging?: PaginationFilter
}

export const GET_MOTAL_POSTS = gql`
    query Motals($filter: MotalFilter!, $paging: PaginationArgs) {
        motals: getMotals(filter: $filter, paging: $paging) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }

            timeStamp
            category
            directLink
        }
    }
`

export interface MotalPostsResult {
    motals: (MotalInterface & { __typename: string })[],
}

export interface MotalPostsVars {
    filter: MotalFilter
    paging?: PaginationFilter
}