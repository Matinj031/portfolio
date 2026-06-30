import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    // Rate limiting - 5 requests per hour per IP
    const identifier = getRateLimitIdentifier(event)
    const rateLimit = checkRateLimit(identifier, 5, 60 * 60 * 1000)
    
    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime)
      throw createError({
        statusCode: 429,
        statusMessage: 'Too Many Requests',
        data: { 
          error: `Rate limit exceeded. Please try again after ${resetDate.toLocaleTimeString()}`,
          resetTime: rateLimit.resetTime
        }
      })
    }
    
    // Read and validate the request body
    const body = await readBody(event)
    
    // Validation
    const errors: Record<string, string> = {}
    
    // Name validation
    if (!body.name || typeof body.name !== 'string') {
      errors.name = 'Name is required'
    } else if (body.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    } else if (body.name.trim().length > 100) {
      errors.name = 'Name must not exceed 100 characters'
    } else if (!/^[\p{L}\s'-]+$/u.test(body.name.trim())) {
      errors.name = 'Name contains invalid characters'
    }
    
    // Email validation
    if (!body.email || typeof body.email !== 'string') {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      errors.email = 'Please enter a valid email address'
    } else if (body.email.trim().length > 254) {
      errors.email = 'Email must not exceed 254 characters'
    }
    
    // Subject validation
    if (!body.subject || typeof body.subject !== 'string') {
      errors.subject = 'Subject is required'
    } else if (body.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters'
    } else if (body.subject.trim().length > 200) {
      errors.subject = 'Subject must not exceed 200 characters'
    }
    
    // Message validation
    if (!body.message || typeof body.message !== 'string') {
      errors.message = 'Message is required'
    } else if (body.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    } else if (body.message.trim().length > 5000) {
      errors.message = 'Message must not exceed 5000 characters'
    }
    
    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: { errors }
      })
    }
    
    // Sanitize inputs
    const sanitizedName = body.name.trim()
    const sanitizedEmail = body.email.trim().toLowerCase()
    const sanitizedSubject = body.subject.trim()
    const sanitizedMessage = body.message.trim()
    
    // Check if Resend API key is configured
    if (!config.resendApiKey) {
      console.error('Resend API key is not configured')
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service is not configured'
      })
    }
    
    // Initialize Resend
    const resend = new Resend(config.resendApiKey)
    
    // Send email
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // You'll need to verify your domain for custom from address
      to: ['matinjahi@gmail.com'],
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #18181b;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 30px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; text-align: center;">
                        📩 New Contact Form Message
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- From Section -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                            <h2 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                              👤 From
                            </h2>
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #18181b;">
                              ${sanitizedName}
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 16px; color: #667eea;">
                              <a href="mailto:${sanitizedEmail}" style="color: #667eea; text-decoration: none;">
                                ${sanitizedEmail}
                              </a>
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Subject Section -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                            <h2 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                              📝 Subject
                            </h2>
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #18181b;">
                              ${sanitizedSubject}
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Section -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; background-color: #f4f4f5; border-radius: 8px;">
                            <h2 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">
                              💬 Message
                            </h2>
                            <div style="font-size: 16px; line-height: 1.6; color: #3f3f46; white-space: pre-wrap; word-wrap: break-word;">
                              ${sanitizedMessage}
                            </div>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Reply Button -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="mailto:${sanitizedEmail}" 
                               style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                              ✉️ Reply to ${sanitizedName}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f4f4f5; border-radius: 0 0 8px 8px; text-align: center;">
                      <p style="margin: 0; font-size: 14px; color: #71717a;">
                        This message was sent from your portfolio contact form
                      </p>
                      <p style="margin: 10px 0 0 0; font-size: 14px; color: #a1a1aa;">
                        Received on ${new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      // Plain text version for email clients that don't support HTML
      text: `
New Contact Form Submission

From: ${sanitizedName}
Email: ${sanitizedEmail}

Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
Received on ${new Date().toLocaleString()}
      `
    })
    
    if (error) {
      console.error('Resend error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
        data: { error: error.message }
      })
    }
    
    return {
      success: true,
      message: 'Email sent successfully',
      id: data?.id
    }
    
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    // If it's already a createError, throw it
    if (error.statusCode) {
      throw error
    }
    
    // Otherwise, throw a generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { error: 'An unexpected error occurred' }
    })
  }
})
