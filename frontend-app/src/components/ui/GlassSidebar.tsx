import React from 'react';
import styled from 'styled-components';
import { sidebarGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import theme from '../../lib/colors';

const { colors } = theme;
interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  children?: SidebarItem[];
}

interface GlassSidebarProps {
  items: SidebarItem[];
  logo?: React.ReactNode;
  title?: string;
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  ${() => createGlassmorphismStyle(sidebarGlassmorphism)}
  display: flex;
  flex-direction: column;
  width: ${props => props.collapsed ? '5rem' : '16rem'};
  height: 100vh;
  padding: 1.5rem 1rem;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 40;
  direction: rtl;
`;

const LogoContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2<{ collapsed: boolean }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${colors.text.light};
  margin: 0;
  display: ${props => props.collapsed ? 'none' : 'block'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  gap: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const MenuItem = styled.div<{ active: boolean; collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${props => props.collapsed ? '0.75rem' : '0.75rem 1rem'};
  border-radius: 8px;
  color: ${props => props.active ? colors.primary.DEFAULT : colors.text.light};
  background: ${props => props.active ? 'rgba(3, 233, 244, 0.1)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${props => props.active ? colors.primary.DEFAULT : colors.text.light};
  }
`;

const MenuItemLabel = styled.span<{ collapsed: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  display: ${props => props.collapsed ? 'none' : 'block'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.span<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${props => props.active ? colors.primary.DEFAULT : colors.text.light};
`;

const CollapseButton = styled.button`
  ${() => createGlassmorphismStyle({
    ...sidebarGlassmorphism,
    background: 'rgba(0, 0, 0, 0.4)',
  })}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  color: ${colors.text.light};
  cursor: pointer;
  margin-top: 1rem;
  align-self: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const GlassSidebar: React.FC<GlassSidebarProps> = ({
  items,
  logo,
  title,
  className = '',
  collapsed = false,
  onToggleCollapse,
}) => {
  const renderItems = (menuItems: SidebarItem[]) => {
    return menuItems.map((item) => (
      <MenuItem
        key={item.id}
        active={!!item.active}
        collapsed={collapsed}
        onClick={item.onClick}
        as={item.href ? 'a' : 'div'}
        href={item.href}
      >
        {item.icon && (
          <IconWrapper active={!!item.active}>
            {item.icon}
          </IconWrapper>
        )}
        <MenuItemLabel collapsed={collapsed}>{item.label}</MenuItemLabel>
      </MenuItem>
    ));
  };

  return (
    <SidebarContainer className={`glass-sidebar ${className}`} collapsed={collapsed}>
      <LogoContainer collapsed={collapsed}>
        {logo && <div className="logo">{logo}</div>}
        {title && <Title collapsed={collapsed}>{title}</Title>}
      </LogoContainer>
      
      <MenuContainer>
        {renderItems(items)}
      </MenuContainer>
      
      {onToggleCollapse && (
        <CollapseButton onClick={onToggleCollapse}>
          {collapsed ? '→' : '←'}
        </CollapseButton>
      )}
    </SidebarContainer>
  );
};

export default GlassSidebar;
