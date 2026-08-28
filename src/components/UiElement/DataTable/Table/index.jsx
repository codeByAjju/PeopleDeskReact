import React from "react";
import { Table as BsTable } from "react-bootstrap";
export function Table({ options, ...props }) {
    const { columns, rows } = options;
    return (
        <>
            <BsTable responsive {...props}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className={col.extraClass}>
                                {col.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </BsTable>
        </>
    );
}