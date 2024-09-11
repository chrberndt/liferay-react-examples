import React, { useState } from 'react';
import { Body, Cell, Head, Icon, Provider, Row, Table } from '@clayui/core';
import { useResource } from '@clayui/data-provider';
import { ClayIconSpriteContext } from '@clayui/icon';
import icons from './icons.svg';
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';

const App = () => {

    function handlePageChange(page) {
        console.log('handlePageChange()');
        setOffset(delta * page - delta);
        console.log('offset: ' + offset);
    }

    function handleSelect(e) {
        console.log('handleSelect()');
        // console.log('e.target.value: ' + e.target.value);
        // console.log(e.target.getAttribute('data-id'));
        console.log(e.target.parentElement.getAttribute('property'));
    }

    function handleSortChange(sort) {
        console.log('handleSortChange()');
        // console.log('e: ' + JSON.stringify(sort));
        console.log('sort.direction: ' + sort.direction);
        var direction = 'asc';
        if (sort.direction == 'descending') {
            direction = 'desc';
        }
        setColumn(sort.column);
        setDirection(direction);
        setOffset(0);
        setPage(1);
    }

    const spritemap = icons;

    const columns = [
        { key: "countryISOCode", label: "Country Code" },
        // { key: "defaultBilling", label:"Default Billing"}, 
        // { key: "defaultShipping", label:"Default Shipping"}, 
        // { key: "description", label:"Description"}, 
        // { key: "externalReferenceCode", label: "External Reference Code" },
        // { key: "id", label: "ID" },
        // { key: "latitude", label:"Latitude"}, 
        // { key: "longitude", label:"Longitude"}, 
        { key: "name", label: "Name" },
        // { key: "phoneNumber", label: "Phone Number" },
        // { key: "regionISOCode", label: "Region Code" },
        { key: "city", label: "City" },
        { key: "street1", label: "Street 1" },
        // { key: "street2", label:"Street 2"}, 
        // { key: "street3", label:"Street 3"}, 
        // { key: "type", label:"Type"}, 
        { key: "zip", label: "ZIP Code" },
    ];

    const [column, setColumn] = useState('');
    const [direction, setDirection] = useState('');
    const [delta, setDelta] = useState(10);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [value, setValue] = useState('');

    // TODO: read addressEndpoint from properties
    const addressEndpoint = "http://localhost:8080/o/headless-commerce-admin-account/v1.0/accounts/46944/accountAddresses";

    // TODO: read clientId from properties
    const clientId = "id-355f4fb2-cdcb-11cf-71e0-41ae7faaed8e";
    // TODO: read clientSecret from properties
    const clientSecret = "secret-5d39bdc7-3424-1577-6155-345acdf5fb36";
    const grantType = "client_credentials";
    // TODO: read tokenEndpoint from properties
    const tokenEndpoint = "http://localhost:8080/o/oauth2/token";


    const {resource, refetch } = useResource({

        fetch: async (link) => {

            const tokenData = await fetch(tokenEndpoint, 
              {
                method: 'POST',
                body: 'grant_type=' + grantType + '&client_id=' + clientId + '&client_secret=' + clientSecret,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(response => response.json());
        
            const token = tokenData.access_token;
        
            // console.log('token: ' + token);

            // const addressData = await fetch( // Request addressData using an apiKey
            //         link,
            //     {
            //       headers: {
            //         'x-api-key': props.apiKey,
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //       }
            //     }
            //   ).then(response => response.json());
        
            const addressData = await fetch( // Request addressData using the access token
                link,
                {
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                }
              ).then(response => response.json());
        
            // console.log('addressData: ' + JSON.stringify(addressData));

            setTotalItems(addressData.totalCount);

            return {
                cursor: addressData.totalCount, 
                items: addressData.items, 
            };

        },
        link: addressEndpoint,
        variables: {search: value, rows: delta, offset: offset, sort: column, order: direction},
    });

    // console.log('resource: ' + JSON.stringify(resource));

    return (
        <>
            <ClayIconSpriteContext.Provider value={spritemap}>
                <div className="sheet">
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="searchCharacterInput"
                            onChange={(event) =>
                                setValue(event.target.value)
                            }
                            onKeyUp={refetch}
                            placeholder="Search character"
                            type="text"
                            value={value}
                        />
                    </div>

                    <ClayPaginationBarWithBasicItems
                        activeDelta={delta}
                        className='mb-2'
                        defaultActive={page}
                        deltas={[5, 10, 20, 50].map((size) => ({
                            label: size,
                        }))}
                        ellipsisBuffer={3}
                        ellipsisProps={{ "aria-label": "More", title: "More" }}
                        onDeltaChange={setDelta}
                        onActiveChange={(value) => handlePageChange(value)}
                        totalItems={totalItems}
                    />

                    <Table onSortChange={handleSortChange}>

                        <Head items={columns}>
                            {(column) => <Cell key={column.key} sortable>{column.label}</Cell>}
                        </Head>
                        {resource && resource.length > 1 && (
                            <Body items={resource}>
                                {(row) => (
                                    <Row id={row['id']} onClick={handleSelect} items={columns} property={JSON.stringify(row)} >
                                        {(column) => <Cell>{row[column.key]}</Cell>}
                                    </Row>
                                )}
                            </Body>
                        )}

                    </Table>
    
                </div>
            </ClayIconSpriteContext.Provider>
        </>
    );
};

export default App;
