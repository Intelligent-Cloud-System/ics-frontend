import React from 'react';

const DISPLAY_LIMIT = 10;

export const renderLongName = (name: string | undefined) => {
	if (!name) return '';

	if (name.length <= DISPLAY_LIMIT) {
		return name;
	}

	const slicedName = name.slice(0, DISPLAY_LIMIT);
	return <span title={name}>{`${slicedName}...`}</span>;
};
