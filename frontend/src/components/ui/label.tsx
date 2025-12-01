import * as React from 'react';
export default function Label({children, ...props}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={`label ${props.className||''}`}>{children}</label>;
}
