# liferay-react-examples
Explore and demonstrate how to use react with Liferay

## Prerequisites

1. Setup a Liferay Commerce Account
1. Add some addresses
1. Set up an OAuth application in Liferay
1. Grant CORS access to the account's address endpoint

### Setup a Liferay Commerce Account

TODO

### Add some address

Go to http://localhost:8080/o/api?endpoint=http://localhost:8080/o/headless-commerce-admin-account/v1.0/openapi.json

Enter the following addresses

```js
{
  "city": "Diamond Bar",
  "countryISOCode": "US",
  "defaultBilling": false,
  "defaultShipping": false,
  "description": "",
  "externalReferenceCode": "",
  "latitude": 0,
  "longitude": 0,
  "name": "Liferay, Inc.",
  "phoneNumber": "1-877-543-3729",
  "regionISOCode": "CA",
  "street1": "1400 Montefino Ave",
  "street2": "",
  "street3": "",
  "type": 2,
  "zip": "91765"
}

{
  "city": "Raleigh",
  "countryISOCode": "US",
  "defaultBilling": false,
  "defaultShipping": false,
  "description": "",
  "externalReferenceCode": "",
  "latitude": 0,
  "longitude": 0,
  "name": "Liferay, Inc.",
  "phoneNumber": "1-877-543-3729",
  "regionISOCode": "NC",
  "street1": "4101 Lake Boone Trail",
  "street2": "Suite 122",
  "street3": "",
  "type": 2,
  "zip": "27607"
}

{
  "city": "Eschborn (Taunus)",
  "countryISOCode": "DE",
  "defaultBilling": false,
  "defaultShipping": false,
  "description": "",
  "externalReferenceCode": "",
  "latitude": 0,
  "longitude": 0,
  "name": "Liferay GmbH",
  "phoneNumber": "+49 (0) 6196-9219300",
  "regionISOCode": "",
  "street1": "Kölner Straße 3",
  "street2": "",
  "street3": "",
  "type": 2,
  "zip": "65760"
}

{
  "city": "Madrid",
  "countryISOCode": "ES",
  "defaultBilling": false,
  "defaultShipping": false,
  "description": "",
  "externalReferenceCode": "",
  "latitude": 0,
  "longitude": 0,
  "name": "Liferay S.L.",
  "phoneNumber": "+34 91 733 63 43",
  "regionISOCode": "",
  "street1": "Paseo de la Castellana, 280",
  "street2": "Planta 1ª. Módulo B",
  "street3": "",
  "type": 2,
  "zip": "28046"
}

{
  "city": "London",
  "countryISOCode": "GB",
  "defaultBilling": false,
  "defaultShipping": false,
  "description": "",
  "externalReferenceCode": "",
  "latitude": 0,
  "longitude": 0,
  "name": "Liferay UK",
  "phoneNumber": "+44(0)203 884 19403",
  "regionISOCode": "",
  "street1": "10 Fitzroy Square",
  "street2": "",
  "street3": "",
  "type": 2,
  "zip": "W1T 5HP"
}
```

Adjust clientId, clientSecret in `App.tsx` to your settings

## How To Use

```bash
git clone git@github.com:chrberndt/liferay-react-examples.git
cd liferay-react-examples
npm install
npm run start
````




