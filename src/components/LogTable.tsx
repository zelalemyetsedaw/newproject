// src/components/LogTable.tsx
'use client'
import React, { useState } from 'react';
import { LogRecord } from '@/types/log';


interface LogTableProps {
  logs: LogRecord[] ;
}

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
  const [expandedRows, setExpandedRows] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRows(expandedRows === index ? null : index);
  };

  return (
    <table className="min-w-full bg-white border border-black">
      <thead>
        <tr className="bg-black text-white">
          <th className="px-4 py-2">Severity</th>
          <th className="px-4 py-2">Time</th>
          <th className="px-4 py-2">Body</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <React.Fragment key={index}>
            <tr
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => toggleRow(index)}
            >
              <td className="border px-4 py-2 text-black">{log.severityText}</td>
              <td className="border px-4 py-2 text-black">
                {new Date(Number(log.timeUnixNano) / 1e6).toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-black">{log.body.stringValue}</td>
            </tr>
            {expandedRows === index && (
              <tr className="bg-black text-white">
                <td colSpan={3} className="border px-4 py-2">
                  <strong>Attributes:</strong>
                  {log.attributes.length ? (
                    <ul>
                      {log.attributes.map((attr, idx) => (
                        <li key={idx}>
                          {attr.key}: 
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No additional attributes</p>
                  )}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;
