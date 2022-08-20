import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const form = await request.formData()
    return new Response([form.get('firstname'), form.get('lastname')].join(', '))
}
