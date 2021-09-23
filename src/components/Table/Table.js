import React from 'react';

import { Table as TableSUI } from 'semantic-ui-react';

const Table = ({ columns = [], data = [], rowProps = {} }) => {
  const { onClick, ...directRowProps } = rowProps;

  const initRowClickHandler = React.useCallback(
    (row) => {
      if (!onClick) return;
      return () => onClick(row);
    },
    [onClick]
  );

  return (
    <TableSUI singleLine striped selectable unstackable>
      <TableSUI.Header>
        <TableSUI.Row>
          {columns.map(({ title, accessor }) => (
            <TableSUI.HeaderCell key={`tableHeaderCol${title}-${accessor}`}>
              {title}
            </TableSUI.HeaderCell>
          ))}
        </TableSUI.Row>
      </TableSUI.Header>
      <TableSUI.Body>
        {data.map((row, rowIndex) => (
          <TableSUI.Row
            key={`tableBodyRow${row.id}`}
            onClick={initRowClickHandler(row)}
            {...directRowProps}
          >
            {columns.map((column, colIndex) => (
              <TableSUI.Cell key={`tableBodyCell${row.id}-${column.accessor}`}>
                {row[column.accessor]}
              </TableSUI.Cell>
            ))}
          </TableSUI.Row>
        ))}
      </TableSUI.Body>
    </TableSUI>
  );
};

export default Table;
