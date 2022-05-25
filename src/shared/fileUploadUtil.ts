import { PostUrlInfo } from 'clients/CoreService';

/**
 * Upload file to S3 with previously received pre-signed POST data.
 * @param postUrl
 * @param file
 * @returns {Promise<void>}
 */
export const uploadFileToS3 = (postUrl: PostUrlInfo, file: File): Promise<void> => {
	const { fields, url } = postUrl;

	return new Promise((resolve, reject) => {
		const formData = new FormData();
		Object.entries(fields).forEach(([key, value]) => {
			formData.append(key, value);
		});

		formData.append('file', file);
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.send(formData);
		xhr.onload = function () {
			this.status === 204 ? resolve() : reject(this.responseText);
		};
	});
};
