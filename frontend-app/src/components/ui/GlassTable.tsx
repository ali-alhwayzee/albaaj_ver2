import React from 'react';
import styled from 'styled-components';
import { tableGlassmorphism, createGlassmorphismStyle } from '../../lib/glassmorphism';
import colors from '../../lib/colors';

interface GlassTableProps {
  columns: {
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
    width?: string;
  }[];
  data: any[];
  className?: string;
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  isLoading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const TableContainer = styled.div`
  ${() => createGlassmorphismStyle(tableGlassmorphism)}
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  direction: rtl;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHeader = styled.thead`
  background: rgba(0, 0, 0, 0.3);
`;

const TableHeaderCell = styled.th<{ width?: string }>`
  padding: 1rem;
  text-align: right;
  font-weight: 600;
  color: ${colors.text.light};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: ${props => props.width || 'auto'};
`;

const TableRow = styled.tr<{ clickable: boolean }>`
  transition: all 0.2s ease;
  
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${props => props.clickable && `
    cursor: pointer;
    &:hover {
      background: rgba(3, 233, 244, 0.1);
    }
  `}
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${colors.text.light};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${colors.text.light};
  font-style: italic;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  z-index: 10;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const PageButton = styled.button<{ active?: boolean }>`
  ${() => createGlassmorphismStyle({
    ...tableGlassmorphism,
    background: 'rgba(0, 0, 0, 0.4)',
  })}
  
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${props => props.active ? colors.primary.DEFAULT : colors.text.light};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.active ? colors.primary.DEFAULT : 'transparent'};
  
  &:hover {
    background: rgba(3, 233, 244, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  }
`;

const GlassTable: React.FC<GlassTableProps> = ({
  columns,
  data,
  className = '',
  onRowClick,
  emptyMessage = 'لا توجد بيانات للعرض',
  isLoading = false,
  pagination,
}) => {
  const renderPagination = () => {
    if (!pagination) return null;
    
    const { currentPage, totalPages, onPageChange } = pagination;
    
    const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
        } else if (currentPage >= totalPages - 2) {
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i);
          }
        }
      }
      
      return pages.map(page => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ));
    };
    
    return (
      <PaginationContainer>
        <PageButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &#171;
        </PageButton>
        <PageButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8249;
        </PageButton>
        
        {renderPageNumbers()}
        
        <PageButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8250;
        </PageButton>
        <PageButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &#187;
        </PageButton>
      </PaginationContainer>
    );
  };
  
  return (
    <TableContainer className={`glass-table-container ${className}`} style={{ position: 'relative' }}>
      {isLoading && (
        <LoadingOverlay>
          <div>جاري التحميل...</div>
        </LoadingOverlay>
      )}
      
      <StyledTable className="glass-table">
        <TableHeader>
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell key={index} width={column.width}>
                {column.header}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                clickable={!!onRowClick}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {column.render
                      ? column.render(row[column.accessor], row)
                      : row[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <EmptyMessage>{emptyMessage}</EmptyMessage>
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
      
      {pagination && renderPagination()}
    </TableContainer>
  );
};

export default GlassTable;
