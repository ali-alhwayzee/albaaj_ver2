import React from 'react';
import styled from 'styled-components';
import { navbarGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import theme from '../../lib/colors';

const { colors } = theme;
interface GlassNavbarProps {
  title: string;
  logo?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  fixed?: boolean;
}

const NavbarContainer = styled.nav<{ fixed: boolean }>`
  ${() => createGlassmorphismStyle(navbarGlassmorphism)}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  color: ${colors.text.light};
  direction: rtl;
  width: 100%;
  z-index: 50;
  
  ${props => props.fixed && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  `}
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.text.light};
  margin: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const GlassNavbar: React.FC<GlassNavbarProps> = ({
  title,
  logo,
  children,
  className = '',
  fixed = false,
}) => {
  return (
    <NavbarContainer className={`glass-navbar ${className}`} fixed={fixed}>
      <LogoContainer>
        {logo && <div className="logo">{logo}</div>}
        <Title>{title}</Title>
      </LogoContainer>
      <ActionsContainer>
        {children}
      </ActionsContainer>
    </NavbarContainer>
  );
};

export default GlassNavbar;
