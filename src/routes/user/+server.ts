import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    const form = await request.formData()
    // TODO: write to db
    console.log(form.has('firstname') ? form.get('firstname') : undefined)
    console.log(form.has('lastname') ? form.get('lastname') : undefined)
    console.log(form.has('phone') ? form.get('phone') : undefined)
    console.log(form.has('email') ? form.get('email') : undefined)
    return new Response([form.get('firstname'), form.get('lastname')].join(', '))
}
