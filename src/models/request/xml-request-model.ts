export interface SoapRequestBodySchema {
    properties: RequestProperty[];
}
export interface RequestProperty {
    propertyName: string | null;
    propertyValue: string | number | boolean | null;
}
