#!/usr/bin/env node
import path from 'path';
import fs from 'fs';

import { generate } from 'openapi-typescript-codegen';
import fetch from 'node-fetch';

require('dotenv').config();

// todo: accept this as parameters to the script
const dependedMicroservices = [
	{
		serviceName: 'CoreService',
		swaggerUrl: process.env.REACT_APP_CORE_URL + '/api/json',
	},
];

Promise.all(
	dependedMicroservices.map(({ swaggerUrl, serviceName }: any) => {
		const swaggerPath = path.join(__dirname, '..', 'temp');
		const swaggerFilepath = path.join(swaggerPath, `swagger_${serviceName}.json`);
		const outputPath = path.join(__dirname, '..', 'src', 'clients', serviceName);

		return fetch(swaggerUrl, { method: 'GET' })
			.then(res => res.json())
			.then((swagger: string) => {
				if (!fs.existsSync(swaggerPath)) fs.mkdirSync(swaggerPath);
				fs.writeFileSync(swaggerFilepath, Buffer.from(JSON.stringify(swagger), 'utf-8'));
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
