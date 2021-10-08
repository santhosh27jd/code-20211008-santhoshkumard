import React, { Component } from 'react';
import CatalogRow from './CatalogRow';

class Catalog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container main-content">
        <CatalogRow />
        <CatalogRow />
      </div>
    );
  }
}

export default Catalog;