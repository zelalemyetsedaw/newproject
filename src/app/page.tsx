// src/app/page.tsx

import React from 'react';
import LogTable from '../components/LogTable';
import LogHistogram from '../components/LogHistogram';
import { LogRecord } from '../types/log';

const fetchLogs = async (): Promise<LogRecord[]> => {
  const response = await fetch('https://take-home-assignment-otlp-logs-api.vercel.app/api/logs', {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  const data = await response.json();

  const logs: LogRecord[] = data.resourceLogs.flatMap((resourceLog: any) =>
    resourceLog.scopeLogs.flatMap((scopeLog: any) => scopeLog.logRecords)
  );

  return logs;
};

const HomePage = async () => {
  const logs = await fetchLogs();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">OTLP Log Viewer</h1>
      <LogTable logs={logs} />
      <h2 className="text-xl font-semibold mt-8 mb-4">Log Distribution</h2>
      <LogHistogram logs={logs} />
    </div>
  );
};

export default HomePage;
