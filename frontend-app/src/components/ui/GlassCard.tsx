import React from 'react';
import styled from 'styled-components';
import { createGlassmorphismStyle, cardGlassmorphism } from '../../lib/glassmorphism';
import theme from '../../lib/colors';
const { colors } = theme;

interface GlassCardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const CardContainer = styled.div`
  ${() => createGlassmorphismStyle(cardGlassmorphism)}
  padding: 1.5rem;
  border-radius: 16px;
  color: ${colors.text.light};
  direction: rtl;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${colors.text.light};
  font-family: 'Tajawal', sans-serif;
`;

const GlassCard: React.FC<GlassCardProps> = ({ title, children, className = '' }) => {
  return (
    <CardContainer className={`glass-card ${className}`}>
      {title && <Title>{title}</Title>}
      {children}
    </CardContainer>
  );
};

export default GlassCard;
