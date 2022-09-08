import { Sequelize } from 'sequelize';
import {
	MYSQL_DATABASE,
	MYSQL_HOST,
	MYSQL_PASSWORD,
	MYSQL_USER
} from '$env/static/private';
import { z } from 'zod';

const LocationInfo = z.object({
	location_id: z.number(),
	name: z.string(),
	company_name: z.string(),
	region_name: z.string(),
	applicant_type_name: z.string(),
	image_path: z.string(),
	rgb1: z.number(),
	rgb2: z.number()
});

const InformedConsent = z.object({
	location_id: z.number(),
	name: z.string(),
	company_name: z.string(),
	region_name: z.string(),
	applicant_type_name: z.string(),
	text: z.string()
});

const Questions = z.array(
	z.object({
		question_option_id: z.number(),
		question_id: z.number(),
		question: z.string(),
		option: z.string()
	})
);

class Database {
	private _getConnection = async () => {
		const connection = new Sequelize({
			dialect: 'mysql',
			host: MYSQL_HOST,
			username: MYSQL_USER,
			password: MYSQL_PASSWORD,
			database: MYSQL_DATABASE
		});

		try {
			await connection.authenticate({
				logging: false
			});
		} catch (error) {
			console.error('Unable to connect to database:', error);
		}
		return connection;
	};

	getLocationInfo = async (url: string) => {
		const connection = await this._getConnection();
		const results = await connection.query('CALL get_location_info(?);', {
			replacements: [url]
		});
		await connection.close();
		const parsedResults = LocationInfo.array().parse(results);
		return parsedResults ? parsedResults[0] : undefined;
	};

	getInformedConsent = async (locationId: number, language: string) => {
		const connection = await this._getConnection();
		const results = await connection.query('CALL get_informed_consent(?, ?);', {
			replacements: [locationId, language]
		});
		await connection.close();
		const parsedResults = InformedConsent.array().parse(results);
		return parsedResults ? parsedResults[0] : undefined;
	};

	getApplicantId = async (
		locationId: number,
		phone: number,
		email: string,
		lastname: string,
		firstname: string
	) => {
		const connection = await this._getConnection();
		const results = await connection.query(
			'CALL get_applicant_id(?, ?, ?, ?, ?);',
			{
				replacements: [locationId, phone, email, lastname, firstname]
			}
		);
		await connection.close();
		const parsedResults = z
			.object({ applt_id: z.number() })
			.array()
			.parse(results);
		return parsedResults[0].applt_id;
	};

	getTestQuestions = async () => {
		const connection = await this._getConnection();
		const results = await connection.query('CALL get_test_questions();');
		await connection.close();
		return Questions.parse(results);
	};

	saveApplicantTest = async (
		locationId: number,
		applicantId: number,
		gender: string,
		ethnicity: string,
		age: number,
		question_answers: string,
		delimiter: string
	) => {
		const connection = await this._getConnection();
		const results = await connection.query(
			'CALL save_applicant_test(?, ?, ?, ?, ?, ?, ?);',
			{
				replacements: [
					locationId,
					applicantId,
					gender,
					ethnicity,
					age,
					question_answers,
					delimiter
				]
			}
		);
		await connection.close();
		// TODO: hasn't been tested yet
		const parsedResults = z
			.object({
				applt_test_id: z.number()
			})
			.array()
			.parse(results);
		return parsedResults[0].applt_test_id;
	};
}

export default new Database();
