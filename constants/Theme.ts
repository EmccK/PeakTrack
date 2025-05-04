// Define the theme colors and styles for the app
export const Theme = {
  colors: {
    primary: '#2D6A4F',    // Forest green (primary actions, buttons)
    secondary: '#1A759F',  // Mountain blue (secondary elements, highlights)
    accent: '#B4A76C',     // Earthy gold (accents, badges)
    success: '#10B981',    // Green (success states)
    warning: '#F59E0B',    // Amber (warnings, medium difficulty)
    error: '#EF4444',      // Red (errors, high difficulty)
    background: '#F9FAFB', // Very light gray (app background)
    cardBackground: '#FFFFFF', // White (card backgrounds)
    text: '#1F2937',       // Dark gray (primary text)
    textLight: '#6B7280',  // Medium gray (secondary text)
    white: '#FFFFFF',      // White (text on dark backgrounds)
    black: '#000000',      // Black (for shadows, etc)
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};