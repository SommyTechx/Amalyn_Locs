import { projectId, publicAnonKey } from './supabase/info';

export interface StyleConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    fontSize: string;
  };
  customCSS: string;
  isActive: boolean;
  createdAt: string;
}

export const loadActiveStyle = async (): Promise<StyleConfig | null> => {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f2724e29/active-style`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.style || null;
    }
  } catch (error) {
    console.error('Error loading active style:', error);
  }
  return null;
};

export const applyStyle = (style: StyleConfig): void => {
  const root = document.documentElement;
  
  // Apply color variables
  root.style.setProperty('--color-primary', style.colors.primary);
  root.style.setProperty('--color-secondary', style.colors.secondary);
  root.style.setProperty('--color-accent', style.colors.accent);
  root.style.setProperty('--background', style.colors.background);
  root.style.setProperty('--foreground', style.colors.text);
  
  // Apply typography
  root.style.setProperty('--font-size', style.typography.fontSize);
  
  if (style.typography.headingFont) {
    root.style.setProperty('--font-family-heading', style.typography.headingFont);
  }
  
  if (style.typography.bodyFont) {
    root.style.setProperty('--font-family-body', style.typography.bodyFont);
  }
  
  // Apply custom CSS
  let customStyleElement = document.getElementById('dynamic-custom-styles');
  if (customStyleElement) {
    customStyleElement.remove();
  }

  if (style.customCSS) {
    const styleElement = document.createElement('style');
    styleElement.id = 'dynamic-custom-styles';
    styleElement.textContent = style.customCSS;
    document.head.appendChild(styleElement);
  }
};

export const initializeStyles = async (): Promise<void> => {
  const activeStyle = await loadActiveStyle();
  if (activeStyle) {
    applyStyle(activeStyle);
  }
};