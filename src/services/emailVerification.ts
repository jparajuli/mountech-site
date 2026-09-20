import { EmailVerificationState } from '../types';
import { computeSHA256 } from './database';

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  domain?: string;
}

export interface DispatchedEmailPreview {
  id: string;
  recipientEmail: string;
  recipientName: string;
  courseTitle: string;
  code: string;
  subject: string;
  sender: string;
  dispatchedAt: string;
  expiresInMinutes: number;
}

// Common domain typos
const DOMAIN_TYPOS: Record<string, string> = {
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'outlok.com': 'outlook.com'
};

export const EmailVerificationService = {
  /**
   * Validate email format and structure
   */
  validate(email: string): EmailValidationResult {
    const trimmed = email.trim();
    if (!trimmed) {
      return { isValid: false, error: 'Email address is required.' };
    }

    // RFC 5322 standard compliant regex check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    if (!emailRegex.test(trimmed)) {
      return { isValid: false, error: 'Invalid email syntax. Please provide a valid address (e.g. name@domain.com).' };
    }

    const parts = trimmed.split('@');
    if (parts.length !== 2) {
      return { isValid: false, error: 'Email must contain exactly one "@" symbol.' };
    }

    const domain = parts[1].toLowerCase();

    // Check for typo in common domains
    if (DOMAIN_TYPOS[domain]) {
      return {
        isValid: false,
        error: `Did you mean ${parts[0]}@${DOMAIN_TYPOS[domain]}?`,
        suggestion: `${parts[0]}@${DOMAIN_TYPOS[domain]}`,
        domain
      };
    }

    // Ensure valid TLD
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      return { isValid: false, error: 'Domain name must have a valid top-level domain (e.g. .com, .edu.np).' };
    }

    return { isValid: true, domain };
  },

  validateEmail(email: string): EmailValidationResult {
    return this.validate(email);
  },

  /**
   * Generate and dispatch confirmation email with 6-digit code
   */
  async dispatchConfirmation(
    email: string, 
    studentName: string, 
    courseTitle: string
  ): Promise<{ state: EmailVerificationState; emailPreview: DispatchedEmailPreview }> {
    // Generate secure 6-digit code
    const randomArray = new Uint32Array(1);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(randomArray);
    } else {
      randomArray[0] = Math.floor(Math.random() * 1000000);
    }
    const code = (100000 + (randomArray[0] % 900000)).toString();

    const expiresInMinutes = 10;
    const expiresAt = Date.now() + (expiresInMinutes * 60 * 1000);
    const dispatchedAt = new Date().toISOString();

    const state: EmailVerificationState = {
      email: email.trim().toLowerCase(),
      code,
      expiresAt,
      attemptsLeft: 5,
      isVerified: false,
      dispatchedAt
    };

    const emailPreview: DispatchedEmailPreview = {
      id: `mail_${Date.now()}`,
      recipientEmail: email.trim().toLowerCase(),
      recipientName: studentName || 'Applicant',
      courseTitle,
      code,
      subject: `[MounTech Academy] Verification Code for 40h Cohort: ${code}`,
      sender: 'academy-admissions@mountech.com.np',
      dispatchedAt,
      expiresInMinutes
    };

    return { state, emailPreview };
  },

  /**
   * Verify entered code against verification state
   */
  async verifyCode(
    enteredCode: string, 
    currentState: EmailVerificationState
  ): Promise<{ success: boolean; state: EmailVerificationState; error?: string }> {
    const now = Date.now();
    
    if (now > currentState.expiresAt) {
      return {
        success: false,
        state: currentState,
        error: 'The verification code has expired (valid for 10 minutes). Please request a new code.'
      };
    }

    if (currentState.attemptsLeft <= 0) {
      return {
        success: false,
        state: currentState,
        error: 'Maximum verification attempts exceeded for security. Please request a new code.'
      };
    }

    const cleanedCode = enteredCode.trim().replace(/\D/g, '');

    if (cleanedCode !== currentState.code) {
      const remaining = currentState.attemptsLeft - 1;
      return {
        success: false,
        state: { ...currentState, attemptsLeft: remaining },
        error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      };
    }

    // Generate cryptographic verification token
    const token = await computeSHA256(`${currentState.email}:${currentState.code}:${currentState.dispatchedAt}:MOUNTECH_VERIFIED`);

    return {
      success: true,
      state: {
        ...currentState,
        isVerified: true,
        token
      }
    };
  }
};
