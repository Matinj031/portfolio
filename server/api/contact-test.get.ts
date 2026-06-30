// This is a test endpoint to preview the email template
// Only available in development mode
// Access it at: http://localhost:3000/api/contact-test

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  const sanitizedName = "John Doe"
  const sanitizedEmail = "john@example.com"
  const sanitizedSubject = "Portfolio Inquiry - Web Development Project"
  const sanitizedMessage = "Hello Matin,\n\nI came across your portfolio and I'm really impressed with your work! I have a project in mind that I'd love to discuss with you.\n\nWe're looking to build a modern web application with Vue.js and I think your expertise would be a great fit.\n\nLooking forward to hearing from you!\n\nBest regards,\nJohn"

  const htmlTemplate = `
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
  `

  // Set content type to HTML
  setHeader(event, 'Content-Type', 'text/html')
  
  return htmlTemplate
})
