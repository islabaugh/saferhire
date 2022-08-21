import type { RequestHandler } from './$types';
import { z } from 'zod';
import Database from '$lib/db';

export const GET: RequestHandler = async () => {
	const questions = await Database.getTestQuestions();
	return new Response(JSON.stringify(questions));
};

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();

	const email = z.string().email().parse(form.get('email'));
	const phone = z
		.preprocess((val) => Number(val), z.number())
		.parse(form.get('phone'));
	const lastname = z.string().parse(form.get('lastname'));
	const firstname = z.string().parse(form.get('firstname'));

	const applicantId = await Database.getApplicantId(
		// TODO: get location ID and pass it in here.
		1,
		phone,
		email,
		lastname,
		firstname
	);

	return new Response(String(applicantId));
};
