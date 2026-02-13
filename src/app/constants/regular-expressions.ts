/**
 * Regular Expression Collection
 * @see https://any-rule.vercel.app/
 *
 * Most of the rules you need can be generated through the website above, then copy and paste into your code.
 */

/* ================ Divider ================== */

// Username validation, 4 to 16 characters (letters, numbers, underscores, hyphens)
export const USERNAME_REGEXP = /^[\w-]{4,16}$/;

// Contains only uppercase letters, lowercase letters and numbers
export const ALPHA_NUMERIC_ONLY_REGEXP = /^[A-Z0-9]+$/i;

/**
 * @description Mobile phone number, as long as it starts with 1
 *
 * @example 008618311006933, +8617888829981, 19119255642
 */
export const MOBILE_PHONE_REGEXP = /^(?:(?:\+|00)86)?1\d{10}$/;

export const TELEPHONE_REGEXP = /^(?:(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
