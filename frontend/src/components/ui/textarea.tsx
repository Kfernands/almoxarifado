import * as React from 'react';
export default function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`input min-h-24 ${props.className||''}`} />;
}
