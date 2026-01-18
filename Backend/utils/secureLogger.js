/**
 * SECURE LOGGER
 * Prevents logging of sensitive data
 */

const SENSITIVE_FIELDS = [
  'password',
  'token',
  'authorization',
  'secret',
  'apiKey',
  'api_key',
  'creditCard',
  'ssn'
];

/**
 * Redact sensitive fields from object
 */
const redactSensitive = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const redacted = { ...obj };

  for (const key in redacted) {
    const lowerKey = key.toLowerCase();
    
    // Check if field is sensitive
    if (SENSITIVE_FIELDS.some(field => lowerKey.includes(field))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof redacted[key] === 'object') {
      redacted[key] = redactSensitive(redacted[key]);
    }
  }

  return redacted;
};

/**
 * Secure logger class
 */
class SecureLogger {
  info(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data ? redactSensitive(data) : '');
    }
  }

  warn(message, data = null) {
    console.warn(`[WARN] ${message}`, data ? redactSensitive(data) : '');
  }

  error(message, error = null) {
    // Always log errors, but redact sensitive data
    console.error(`[ERROR] ${message}`, error ? {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    } : '');
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development' && process.env.DEBUG === 'true') {
      console.log(`[DEBUG] ${message}`, data ? redactSensitive(data) : '');
    }
  }
}

export default new SecureLogger();
