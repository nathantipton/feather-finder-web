export interface SpeciesRecord {
    objectID: string;
    speciesCode: string;
    comName: string;
    sciName: string;
    category: string;
    order: string;
    familyComName: string;
    familySciName: string;
    familyCode: string;
    taxonOrder: number;
    comNameCodes: string[];
    sciNameCodes: string[];
    bandingCodes: string[];
    hybrid: boolean;
    regions: string[];
}

export interface NearbyNotableSpecies_DTO {
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
}

export interface SpeciesObservation_DTO {
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
}

export interface SpeciesTaxonomy_DTO {
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
