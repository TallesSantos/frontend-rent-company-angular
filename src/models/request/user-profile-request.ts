export interface AddressRequest {
    id:number;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    number: string;
    comment: string;
}

export interface PhoneRequest {
    id:number;
    phoneNumber: string;
}
