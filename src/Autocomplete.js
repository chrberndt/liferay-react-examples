import React, { useState } from 'react';
import ClayAutocomplete from '@clayui/autocomplete';
import { FetchPolicy, NetworkStatus, useResource } from '@clayui/data-provider';
import DropDown from '@clayui/drop-down';
import {useDebounce} from '@clayui/shared';


const Autocomplete = () => {

    const LoadingWithDebounce = ({
        loading,
        networkStatus,
        render,
    }) => {
        const debouncedLoadingChange = useDebounce(loading, 500);

        if (networkStatus === 1 || debouncedLoadingChange) {
            return <DropDown.Item className="disabled">Loading...</DropDown.Item>;
        }

        return render;
    };

    const [value, setValue] = useState('');
    const [networkStatus, setNetworkStatus] = useState(
        // const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(
        NetworkStatus.Unused
    );
    const { resource } = useResource({
        fetchPolicy: FetchPolicy.CacheFirst,
        link: 'https://rickandmortyapi.com/api/character/',
        onNetworkStatusChange: setNetworkStatus,
        variables: { name: value },
    });

    const initialLoading = networkStatus === 1;
    const loading = networkStatus < 4;
    const error = networkStatus === 5;

    return (
        <div className="row">
            <div className="col-md-5">
                <div className="sheet">
                    <div className="form-group">
                        <label>Name</label>
                        <ClayAutocomplete>
                            <ClayAutocomplete.Input
                                aria-label="Enter a name:"
                                onChange={(event) =>
                                    setValue(event.target.value)
                                }
                                value={value}
                            />

                            <ClayAutocomplete.DropDown
                                active={
                                    (!!resource && !!value) || initialLoading
                                }
                            >
                                <DropDown.ItemList>
                                    <LoadingWithDebounce
                                        loading={loading}
                                        networkStatus={networkStatus}
                                        render={
                                            <>
                                                {(error ||
                                                    (resource &&
                                                        resource.error)) && (
                                                        <DropDown.Item className="disabled">
                                                            No Results Found
                                                        </DropDown.Item>
                                                    )}
                                                {!error &&
                                                    resource &&
                                                    resource.results &&
                                                    resource.results.map(
                                                        (item) => (
                                                            <ClayAutocomplete.Item
                                                                key={item.id}
                                                                match={value}
                                                                onClick={() =>
                                                                    setValue(
                                                                        item.name
                                                                    )
                                                                }
                                                                value={
                                                                    item.name
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </>
                                        }
                                    />
                                </DropDown.ItemList>
                            </ClayAutocomplete.DropDown>
                            {loading && <ClayAutocomplete.LoadingIndicator />}
                        </ClayAutocomplete>
                    </div>
                </div>
            </div>
        </div>

        // <div className="sheet">
        //     <div className="form-group">
        //         <label
        //             htmlFor="clay-autocomplete-1"
        //             id="clay-autocomplete-label-1"
        //         >
        //             States
        //         </label>
        //         <ClayAutocomplete
        //             aria-labelledby="clay-autocomplete-label-1"
        //             defaultItems={[
        //                 'Alabama',
        //                 'Alaska',
        //                 'Arizona',
        //                 'Arkansas',
        //                 'California',
        //                 'Colorado',
        //                 'Connecticut',
        //                 'Delaware',
        //                 'Florida',
        //                 'Georgia',
        //                 'Hawaii',
        //                 'Idaho',
        //                 'Illinois',
        //                 'Indiana',
        //                 'Iowa',
        //                 'Kansas',
        //                 'Kentucky',
        //                 'Louisiana',
        //                 'Maine',
        //                 'Maryland',
        //                 'Massachusetts',
        //                 'Michigan',
        //                 'Minnesota',
        //                 'Mississippi',
        //                 'Missouri',
        //                 'Montana',
        //                 'Nebraska',
        //                 'Nevada',
        //                 'New Hampshire',
        //                 'New Jersey',
        //                 'New Mexico',
        //                 'New York',
        //                 'North Carolina',
        //                 'North Dakota',
        //                 'Ohio',
        //                 'Oklahoma',
        //                 'Oregon',
        //                 'Pennsylvania',
        //                 'Rhode Island',
        //                 'South Carolina',
        //                 'South Dakota',
        //                 'Tennessee',
        //                 'Texas',
        //                 'Utah',
        //                 'Vermont',
        //                 'Virginia',
        //                 'Washington',
        //                 'West Virginia',
        //                 'Wisconsin',
        //                 'Wyoming',
        //             ]}
        //             id="clay-autocomplete-1"
        //             messages={{
        //                 listCount: '{0} option available.',
        //                 listCountPlural: '{0} options available.',
        //                 loading: 'Loading...',
        //                 notFound: 'No results found',
        //             }}
        //             placeholder="Enter a US state name"
        //         >
        //             {(item) => (
        //                 <ClayAutocomplete.Item key={item}>
        //                     {item}
        //                 </ClayAutocomplete.Item>
        //             )}
        //         </ClayAutocomplete>
        //     </div>
        // </div>

    )

}

export default Autocomplete;
