import React from 'react';

export default ({collection}) => (
  <div>
    <h3>Widgets list</h3>
    <ul data-cuke="items-list">
      {collection.map(record => (
        <li key={record._id}>
          <a data-cuke={record.title} href={`/widgets/${record._id}`}>{record.title}</a>
        </li>
      ))}
    </ul>
  </div>
);
