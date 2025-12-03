export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig(event)

    console.log(body, "Send Mail")

    return event.$fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify({
            service_id: config.serviceID,
            template_id: 'template_d6my7pf',
            user_id: config.userId,
            template_params: {
                from_name: body.name,
                reply_to: body.email,
                message: body.message
            }
        }),
        headers: {'Content-Type': 'application/json'}
    })
})