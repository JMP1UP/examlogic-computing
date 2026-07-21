// tests/xss.test.js
// Set environment variables for the database mock before requiring any api files
process.env.ENABLE_MOCK_DB = 'true';
process.env.VERCEL_ENV = 'development';

const fs = require('fs');
const path = require('path');

// Extract backend escapeHtml from api/send-invite.js dynamically
const sendInvitePath = path.join(__dirname, '../api/send-invite.js');
const sendInviteContent = fs.readFileSync(sendInvitePath, 'utf8');

// Extract frontend escapeHTML and escapeAttributeURL from app.js dynamically
const appJsPath = path.join(__dirname, '../app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Simple regex or string search to extract the function body and execute it
function extractMethod(content, methodName) {
  const startRegex = new RegExp(`function\\s+${methodName}\\(([^)]*)\\)\\s*\\{`);
  const matchResult = content.match(startRegex);
  if (!matchResult) {
    throw new Error(`Could not find function ${methodName}`);
  }
  const startIndex = matchResult.index;
  const startOfBody = content.indexOf('{', startIndex);
  
  // Parse matched braces to find the end of the method body
  let braceCount = 1;
  let currentIndex = startOfBody + 1;
  while (braceCount > 0 && currentIndex < content.length) {
    if (content[currentIndex] === '{') {
      braceCount++;
    } else if (content[currentIndex] === '}') {
      braceCount--;
    }
    currentIndex++;
  }
  const methodBody = content.substring(startOfBody + 1, currentIndex - 1);
  const args = matchResult[1].split(',').map(s => s.trim());
  
  // Return an executable function
  return new Function(...args, methodBody);
}

// Frontend method extraction helper since they are class methods: escapeHTML(str) { ... }
function extractClassMethod(content, methodName) {
  const startRegex = new RegExp(`\\b${methodName}\\(([^)]*)\\)\\s*\\{`);
  const matchResult = content.match(startRegex);
  if (!matchResult) {
    throw new Error(`Could not find class method ${methodName}`);
  }
  const startIndex = matchResult.index;
  const startOfBody = content.indexOf('{', startIndex);
  
  let braceCount = 1;
  let currentIndex = startOfBody + 1;
  while (braceCount > 0 && currentIndex < content.length) {
    if (content[currentIndex] === '{') {
      braceCount++;
    } else if (content[currentIndex] === '}') {
      braceCount--;
    }
    currentIndex++;
  }
  const methodBody = content.substring(startOfBody + 1, currentIndex - 1);
  const args = matchResult[1].split(',').map(s => s.trim());
  
  return new Function(...args, methodBody);
}

describe('🛡️ XSS Protection & Sanitization Suite', () => {
  let backendEscapeHtml;
  let frontendEscapeHTML;
  let frontendEscapeAttributeURL;

  beforeAll(() => {
    backendEscapeHtml = extractMethod(sendInviteContent, 'escapeHtml');
    frontendEscapeHTML = extractClassMethod(appJsContent, 'escapeHTML');
    
    // For escapeAttributeURL, since it refers to `this.escapeHTML`, we bind it to a mock context
    const rawEscapeAttr = extractClassMethod(appJsContent, 'escapeAttributeURL');
    frontendEscapeAttributeURL = function(url) {
      const mockContext = {
        escapeHTML: frontendEscapeHTML
      };
      return rawEscapeAttr.call(mockContext, url);
    };
  });

  describe('Backend escapeHtml (api/send-invite.js)', () => {
    it('should escape HTML special characters correctly', () => {
      const payload = '<script>alert("XSS & cookies")</script>';
      const expected = '&lt;script&gt;alert(&quot;XSS &amp; cookies&quot;)&lt;/script&gt;';
      expect(backendEscapeHtml(payload)).toBe(expected);
    });

    it('should handle empty or null values gracefully', () => {
      expect(backendEscapeHtml('')).toBe('');
      expect(backendEscapeHtml(null)).toBe('');
      expect(backendEscapeHtml(undefined)).toBe('');
    });
  });

  describe('Frontend escapeHTML (app.js)', () => {
    it('should escape HTML tags and quotes', () => {
      const payload = '<img src=x onerror="alert(1)">';
      const expected = '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;';
      expect(frontendEscapeHTML(payload)).toBe(expected);
    });

    it('should escape single quotes', () => {
      const payload = "student's name";
      const expected = 'student&#039;s name';
      expect(frontendEscapeHTML(payload)).toBe(expected);
    });

    it('should handle empty/falsy values', () => {
      expect(frontendEscapeHTML('')).toBe('');
      expect(frontendEscapeHTML(null)).toBe('');
      expect(frontendEscapeHTML(undefined)).toBe('');
    });
  });

  describe('Frontend escapeAttributeURL (app.js)', () => {
    it('should permit valid http/https URLs and escape them', () => {
      const validUrl = 'https://example.com/photo.jpg?w=100&h=200';
      const expected = 'https://example.com/photo.jpg?w=100&amp;h=200';
      expect(frontendEscapeAttributeURL(validUrl)).toBe(expected);
    });

    it('should permit relative URLs', () => {
      const relativeUrl = '/assets/student.png';
      expect(frontendEscapeAttributeURL(relativeUrl)).toBe(relativeUrl);
    });

    it('should permit data URLs for images', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAA';
      expect(frontendEscapeAttributeURL(dataUrl)).toBe(dataUrl);
    });

    it('should reject javascript: URLs to prevent XSS via href/src attributes', () => {
      const riskyUrl = 'javascript:alert(document.cookie)';
      expect(frontendEscapeAttributeURL(riskyUrl)).toBe('');
    });

    it('should reject vbscript: or other unsupported protocols', () => {
      const riskyUrl = 'vbscript:msgbox("hello")';
      expect(frontendEscapeAttributeURL(riskyUrl)).toBe('');
    });

    it('should handle invalid input types gracefully', () => {
      expect(frontendEscapeAttributeURL('')).toBe('');
      expect(frontendEscapeAttributeURL(null)).toBe('');
      expect(frontendEscapeAttributeURL(undefined)).toBe('');
    });
  });
});
