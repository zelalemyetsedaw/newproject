export interface LogRecord {
    timeUnixNano: string;
    observedTimeUnixNano: string;
    severityNumber: number;
    severityText: string;
    body: {
      stringValue: string;
    };
    attributes: Attribute[];
    droppedAttributesCount: number;
  }
  
  export interface Attribute {
    key: string;
    value: string | number | boolean | Record<string, unknown> | null;
  }
  