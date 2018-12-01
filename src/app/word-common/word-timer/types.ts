/**
 * Type representing possible timer shapes.
 */
export type WordTimerShape = 'full' | 'round';

/**
 * Type representing possible timer fills.
 */
export type WordTimerFill = 'solid' | 'outline';

/**
 * Interface for timer css.
 */
export interface WordTimerCss {
  'background-color'?: string;
  'border'?: string;
  'border-radius'?: string;
  'color'?: string;
  'display'?: string;
  'padding'?: string;
}
