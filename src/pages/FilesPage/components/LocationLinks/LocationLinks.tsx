import React from 'react';
import { FakeLink, UHeader, NotActiveLink } from './LocationLinks.styles';

export interface LocationLinksProps {
	location: string;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export function LocationLinks({ location, setLocation }: LocationLinksProps) {
	const folders = location.split('/').filter(folder => !!folder);
	const last = folders.length - 1;

	const updateLocationForIndex = (index: number) =>
		setLocation(folders.slice(0, index + 1).join('/'));

	return (
		<UHeader>
			<span> / </span>
			{location.length ? (
				<FakeLink onClick={() => setLocation('')}>home</FakeLink>
			) : (
				<NotActiveLink>home</NotActiveLink>
			)}
			<span> / </span>
			{folders.map((folder, index) => (
				<span key={index}>
					{index === last ? (
						<NotActiveLink>{folder}</NotActiveLink>
					) : (
						<FakeLink onClick={() => updateLocationForIndex(index)}>{folder}</FakeLink>
					)}
					<span> / </span>
				</span>
			))}
		</UHeader>
	);
}
