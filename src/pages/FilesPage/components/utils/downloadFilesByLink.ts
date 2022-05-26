import { SignedGetUrlsResponse } from 'clients/CoreService';

export const downloadFilesByLink = (response: SignedGetUrlsResponse) => {
	const { urls } = response;
	const link = document.createElement('a');
	document.body.appendChild(link);

	for (const urlInfo of urls) {
		link.setAttribute('href', urlInfo.url);
		link.setAttribute('download', urlInfo.path.slice(urlInfo.path.lastIndexOf('/') + 1));
		link.click();
	}

	document.body.removeChild(link);
};
