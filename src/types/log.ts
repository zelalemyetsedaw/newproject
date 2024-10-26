// src/types/log.ts
export interface LogRecord {
    timeUnixNano: string;
    observedTimeUnixNano: string;
    severityNumber: number;
    severityText: string;
    body: {
      stringValue: string;
    };
    attributes: Attribute[]; // Allow multiple types here
    droppedAttributesCount: number;
  }
  
  export interface Log {
    timeUnixNano: string;
    observedTimeUnixNano: string;
    severityNumber: number;
    severityText: string;
    body: {
      stringValue: string;
    };
    attributes: Attribute[]; // Match the type to LogRecord
    droppedAttributesCount: number;
  }
  
  export interface Attribute {
    key: string;
    value: string | number | boolean | Record<string, unknown> | null; // Accept multiple types
  }
  
