import { SignedGetUrlsResponse } from 'clients/CoreService';
import { getBasename } from 'shared/util';

export const downloadFilesByLink = (response: SignedGetUrlsResponse) => {
	const { urls } = response;
	const link = document.createElement('a');
	document.body.appendChild(link);

	for (const urlInfo of urls) {
		link.setAttribute('href', urlInfo.url);
		link.setAttribute('download', getBasename(urlInfo.path));
		link.click();
	}

	document.body.removeChild(link);
};
