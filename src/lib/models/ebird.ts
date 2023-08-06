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