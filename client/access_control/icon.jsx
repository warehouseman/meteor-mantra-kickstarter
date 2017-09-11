import React from 'react';
import { AccessControl } from '/lib/access_control.js';

export default ( RC ) => {
  return <span className="rotate270text">
    {AccessControl.getIcon(RC.children)}
  </span>;
};
