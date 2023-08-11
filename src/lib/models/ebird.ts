export interface Observation_DTO {
    speciesCode: string;
    comName: string;
    sciName: string;
    locId: string;
    locName: string;
    obsDt: string;
    howMany: number;
    lat: number;
    lng: number;
    obsValid: boolean;
    obsReviewed: boolean;
    locationPrivate: boolean;
    subId: string;
    id?: number;
}

export interface SpeciesTaxonomy {
    sciName: string;
    comName: string;
    speciesCode: string;
    category: string;
    taxonOrder: number;
    bandingCodes: string[];
    comNameCodes: string[];
    sciNameCodes: string[];
    order: string;
    familyCode: string;
    familyComName: string;
    familySciName: string;
}

export interface SpeciesRecord extends SpeciesTaxonomy {
    objectID: string;
    hybrid: boolean;
    regions: string[];
}