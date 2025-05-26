import React from 'react';

export const ReactComponent = {
  __esModule: true
};

export default function importSVG(path) {
  return {
    ReactComponent: React.lazy(() => import(path)),
    default: path
  };
}
