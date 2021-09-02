import React from 'react';
import { useTable, useExpanded } from 'react-table';

import './App.css';

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useExpanded);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        id: 'expander',
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: { paddingLeft: `${row.depth * 1}rem` },
              })}>
              {row.isExpanded ? '-' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Visits',
        accessor: 'visits',
      },
      {
        Header: 'Progress',
        accessor: 'progress',
      },
    ],
    []
  );

  const data = [
    {
      firstName: 'Joe',
      lastName: 'Barne',
      age: 25,
      visits: 39,
      progress: 98,
      subRows: [
        {
          firstName: 'Faouzi',
          lastName: 'Aitelhara',
          age: 55,
          visits: 20,
          progress: 10,
        },
        {
          firstName: 'Arthur',
          lastName: 'Jon',
          age: 50,
          visits: 98,
          progress: 75,
        },
      ],
    },
    {
      firstName: 'Jim',
      lastName: 'Bean',
      age: 50,
      visits: 98,
      progress: 75,
      subRows: [
        {
          firstName: 'Michelle',
          lastName: 'Yeo',
          age: 55,
          visits: 20,
          progress: 10,
        },
        {
          firstName: 'Jim',
          lastName: 'Bean',
          age: 50,
          visits: 98,
          progress: 75,
          subRows: [
            {
              firstName: 'Ross',
              lastName: 'Geller',
              age: 55,
              visits: 20,
              progress: 103,
            },
            {
              firstName: 'Chandler',
              lastName: 'Bing',
              age: 31,
              visits: 190,
              progress: 75,
            },
          ],
        },
      ],
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 44,
      visits: 22,
      progress: 47,
      subRows: [
        {
          firstName: 'Brad',
          lastName: 'Pitt',
          age: 55,
          visits: 20,
          progress: 103,
        },
      ],
    },
    {
      firstName: 'Jack',
      lastName: 'Daniels',
      age: 55,
      visits: 20,
      progress: 10,
    },
  ];

  return <Table columns={columns} data={data} />;
}

export default App;
