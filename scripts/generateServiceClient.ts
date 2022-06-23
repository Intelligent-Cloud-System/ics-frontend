#!/usr/bin/env node
import path from 'path';
import fs from 'fs';

import { generate } from 'openapi-typescript-codegen';

require('dotenv').config();

// todo: accept this as parameters to the script
const dependedMicroservices = [
	{
		serviceName: 'CoreService',
		swaggerUrl: process.env.REACT_APP_CORE_URL + '/api/json',
	},
];

function exists(path: string): Promise<boolean> {
	return new Promise(resolve => {
		return fs.access(path, fs.constants.F_OK, err => resolve(!err));
	});
}

Promise.all(
	dependedMicroservices.map(({ swaggerUrl, serviceName }: any) => {
		const swaggerPath = path.join(__dirname, '..', 'temp');
		const swaggerFilepath = path.join(swaggerPath, `swagger_${serviceName}.json`);
		const outputPath = path.join(__dirname, '..', 'src', 'clients', serviceName);

		return fetch(swaggerUrl, { method: 'GET' })
			.then(res => res.json())
			.then(async (swagger: string) => {
				const fileExists = await exists(swaggerPath);

				if (!fileExists) {
					await fs.promises.mkdir(swaggerPath);
				}

				await fs.promises.writeFile(swaggerFilepath, Buffer.from(JSON.stringify(swagger), 'utf-8'));
			})
			.then(() =>
				generate({
					input: swaggerFilepath,
					output: outputPath,
					useUnionTypes: true,
				}),
			)
			.catch(err => {
				console.log(`An error happened during ${serviceName} client generation 😡`, err);
				return Promise.reject(err);
			});
	}),
).then(() => console.log('API clients were successfully built'));
