// Simple in-memory rate limiter for contact form
// In production, consider using Redis or a similar solution

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Store rate limit data in memory
const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes without keeping the Node process alive.
const cleanupInterval = setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

cleanupInterval.unref?.()

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 60 * 60 * 1000 // 1 hour default
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // If no entry or the window has expired, create a new one
  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs
    }
    rateLimitMap.set(identifier, newEntry)
    
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newEntry.resetTime
    }
  }

  // Increment the count
  entry.count++
  rateLimitMap.set(identifier, entry)

  // Check if the limit is exceeded
  if (entry.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getRateLimitIdentifier(event: any): string {
  // Try to get the real IP address
  const forwarded = getHeader(event, 'x-forwarded-for')
  const realIp = getHeader(event, 'x-real-ip')
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  
  if (realIp) {
    return realIp
  }
  
  // Fallback to request IP
  return event.node.req.socket.remoteAddress || 'unknown'
}
