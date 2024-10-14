import React, { useState } from 'react';
import ClayAutocomplete from '@clayui/autocomplete';
import { FetchPolicy, NetworkStatus, useResource } from '@clayui/data-provider';

export const Autocomplete = () => {
	const [value, setValue] = useState('');

    const [networkStatus, setNetworkStatus] = useState(
        NetworkStatus.Unused
    );
	const {resource} = useResource({
        fetch: async (link) => {

            let data = undefined;

            data = await fetch(link,
                {
                headers: {}
                }
            ).then(response => response.json());

            return {
                results: data.results,
            };


        },
		fetchPolicy: FetchPolicy.CacheFirst,
		link: 'https://rickandmortyapi.com/api/character',
		onNetworkStatusChange: setNetworkStatus,
		variables: {name: value},
	});

	return (
		<div className="row">
			<div className="col-md-5">
				<div className="sheet">
					<div className="form-group">
						<label
							htmlFor="autocomplete-name"
							id="autocomplete-name-label"
						>
							Name
						</label>
						<ClayAutocomplete
							aria-labelledby="autocomplete-name-label"
							id="autocomplete-name"
							items={
								(resource?.results) ?? []
							}
							loadingState={networkStatus}
							messages={{
								listCount: '{0} option available.',
								listCountPlural: '{0} options available.',
								loading: 'Loading...',
								notFound: 'No results found',
							}}
							onChange={setValue}
							onItemsChange={() => {}}
							placeholder="Enter a name"
							value={value}
						>
							{(item) => (
								<ClayAutocomplete.Item key={item.id}>
									{item.name}
								</ClayAutocomplete.Item>
							)}
						</ClayAutocomplete>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Autocomplete;
