import { SoapRequestBodySchema } from '../../../models/request/xml-request-model';



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

export function createSoapBody(listBodyJson: SoapRequestBodySchema[]) {
    let property = '';

    for (let i = 0; i < listBodyJson.length; i++) {
        property += `<arg${i}>`;

        for (let j = 0; j < listBodyJson[i].properties.length; j++) {
            console.log(listBodyJson[i].properties[j].propertyName);
            console.log(listBodyJson[i].properties[j].propertyValue);

            property += `<${listBodyJson[i].properties[j].propertyName}>
                ${listBodyJson[i].properties[j].propertyValue}
            </${listBodyJson[i].properties[j].propertyName}>`;
        }
        property += `</arg${i}>`;
    }
    return property;
}
