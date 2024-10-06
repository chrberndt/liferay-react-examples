import React, { useState } from 'react';
import { Body, Cell, Head, Icon, Provider, Row, Table } from '@clayui/core';
import { useResource } from '@clayui/data-provider';
import { ClayIconSpriteContext } from '@clayui/icon';
import icons from './icons.svg';
import { ClayPaginationBarWithBasicItems } from '@clayui/pagination-bar';
import PropTypes from 'prop-types';

const AddressTable = ({...props}) => {

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
        { key: "zip", label: "ZIP Code" }
    ];

    const [column, setColumn] = useState('');
    const [direction, setDirection] = useState('');
    const [delta, setDelta] = useState(10);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [value, setValue] = useState('');

    const isOauth = (props.clientId != undefined
        && props.clientSecret != undefined
        && props.grantType != undefined
        && props.tokenEndpoint != undefined);

    const {resource, refetch } = useResource({

        fetch: async (link) => {

            let token = undefined;
            let addressData = undefined;

            // Obtain Oauth2 access taken
            if (isOauth) {
                const tokenData = await fetch(props.tokenEndpoint,
                    {
                        method: 'POST',
                        body: 'grant_type=' + props.grantType + '&client_id=' + props.clientId + '&client_secret=' + props.clientSecret,
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => response.json());

                    token = tokenData.access_token;

                // Request addressData using the access token
                addressData = await fetch(link,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(response => response.json());
            }

            if (!isOauth && props.apiKey != undefined) {

                // Request addressData using an apiKey
                addressData = await fetch(link,
                    {
                    headers: {
                        'x-api-key': props.apiKey,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                    }
                ).then(response => response.json());

            }

            setTotalItems(addressData.totalCount);

            return {
                cursor: addressData.totalCount,
                items: addressData.items,
            };

        },
        link: props.addressEndpoint,
        variables: {search: value, rows: delta, offset: offset, sort: column, order: direction},
    });

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
                        {resource && resource.length > 0 && (
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

AddressTable.propTypes = {
    addressEndpoint: PropTypes.string,
    apiKey: PropTypes.string,
    clientId: PropTypes.string,
    clientSecret: PropTypes.string,
    grantType: PropTypes.string,
    tokenEndpoint: PropTypes.string,
};

export default AddressTable;
