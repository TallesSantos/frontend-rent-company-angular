import { SoapRequestBodyParam } from './../../../models/request/xml-request-model';

export function createSoapEnvelope(method: string, body: string = '') {
    return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoints_soap.application/">
      <soapenv:Header/>
      <soapenv:Body>
        <end:${method}>
          ${body}
        </end:${method}>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
}

export function createSoapBody(listBodyJson: SoapRequestBodyParam[]) {
    let property = '';

    for (let i = 0; i < listBodyJson.length; i++) {
        property += `<arg${i}>`;

        for (let j = 0; j <= listBodyJson[i].properties.length; j++) {
            if (listBodyJson[i].properties[j] !=="" && listBodyJson[i].properties[j] !==undefined ) {
                property += `${listBodyJson[i].properties[j]}`;
            }
        }
        property += `</arg${i}>`;
    }
    return property;
}
