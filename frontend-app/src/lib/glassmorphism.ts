// src/lib/glassmorphism.ts
import theme, { shadows as importedShadows } from './colors';

const colors = theme.colors;
const shadows = importedShadows;

// تعريف تأثيرات Glassmorphism المحسنة بناءً على التصميم المرجعي

export interface GlassmorphismProps {
  background?: string;
  blur?: string;
  opacity?: number;
  border?: string;
  shadow?: string;
  hoverEffect?: boolean;
}

// الإعدادات الافتراضية لتأثير Glassmorphism
export const defaultGlassmorphism: GlassmorphismProps = {
  background: colors.background.DEFAULT,
  blur: '10px',
  opacity: 0.7,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  shadow: shadows.lg,
  hoverEffect: false,
};

// تأثير Glassmorphism للبطاقات
export const cardGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: 'rgba(0, 0, 0, 0.6)',
  blur: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  shadow: '0 15px 25px rgba(0, 0, 0, 0.6)',
};

// تأثير Glassmorphism للأزرار
export const buttonGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: colors.primary.DEFAULT,
  opacity: 0.9,
  blur: '5px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  hoverEffect: true,
};

// تأثير Glassmorphism للمدخلات
export const inputGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: 'rgba(255, 255, 255, 0.1)',
  blur: '8px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// تأثير Glassmorphism للقوائم المنسدلة
export const selectGlassmorphism: GlassmorphismProps = {
  ...inputGlassmorphism,
};

// تأثير Glassmorphism للجداول
export const tableGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: 'rgba(0, 0, 0, 0.5)',
  blur: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

// تأثير Glassmorphism للشريط الجانبي
export const sidebarGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: 'rgba(0, 0, 0, 0.7)',
  blur: '15px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
};

// تأثير Glassmorphism للشريط العلوي
export const navbarGlassmorphism: GlassmorphismProps = {
  ...defaultGlassmorphism,
  background: 'rgba(0, 0, 0, 0.7)',
  blur: '15px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  shadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
};

// دالة لإنشاء CSS لتأثير Glassmorphism
export const createGlassmorphismStyle = (props: GlassmorphismProps = defaultGlassmorphism): string => {
  return `
    background: ${props.background};
    backdrop-filter: blur(${props.blur});
    -webkit-backdrop-filter: blur(${props.blur});
    border: ${props.border};
    box-shadow: ${props.shadow};
    transition: all 0.3s ease;
  `;
};

// دالة لإنشاء CSS لتأثير Glassmorphism مع تأثير التحويم
export const createGlassmorphismHoverStyle = (props: GlassmorphismProps = defaultGlassmorphism): string => {
  if (!props.hoverEffect) return '';

  return `
    &:hover {
      background: ${props.background === colors.primary.DEFAULT ? colors.primary.dark : 'rgba(0, 0, 0, 0.7)'};
      box-shadow: ${props.background === colors.primary.DEFAULT ? shadows.glow : props.shadow};
      transform: translateY(-2px);
    }
  `;
};

export default {
  defaultGlassmorphism,
  cardGlassmorphism,
  buttonGlassmorphism,
  inputGlassmorphism,
  selectGlassmorphism,
  tableGlassmorphism,
  sidebarGlassmorphism,
  navbarGlassmorphism,
  createGlassmorphismStyle,
  createGlassmorphismHoverStyle,
};
