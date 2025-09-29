// Style Manager for Amalyn Locs
export interface StyleConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoText: string;
  businessName: string;
}

const defaultStyles: StyleConfig = {
  primaryColor: '#000000',
  secondaryColor: '#FFD700', // Gold
  accentColor: '#FFFFFF',
  fontFamily: 'Inter, system-ui, sans-serif',
  logoText: 'Amalyn Locs',
  businessName: 'Amalyn Locs'
};

export const initializeStyles = () => {
  const savedStyles = localStorage.getItem('amalyn-styles');
  const styles = savedStyles ? JSON.parse(savedStyles) : defaultStyles;
  
  // Apply styles to CSS custom properties
  const root = document.documentElement;
  root.style.setProperty('--primary-color', styles.primaryColor);
  root.style.setProperty('--secondary-color', styles.secondaryColor);
  root.style.setProperty('--accent-color', styles.accentColor);
  root.style.setProperty('--font-family', styles.fontFamily);
};

export const updateStyles = (newStyles: Partial<StyleConfig>) => {
  const currentStyles = getCurrentStyles();
  const updatedStyles = { ...currentStyles, ...newStyles };
  
  localStorage.setItem('amalyn-styles', JSON.stringify(updatedStyles));
  initializeStyles();
  
  return updatedStyles;
};

export const getCurrentStyles = (): StyleConfig => {
  const savedStyles = localStorage.getItem('amalyn-styles');
  return savedStyles ? JSON.parse(savedStyles) : defaultStyles;
};

export const resetStyles = () => {
  localStorage.removeItem('amalyn-styles');
  initializeStyles();
  return defaultStyles;
};