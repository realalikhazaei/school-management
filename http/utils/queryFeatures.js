const QueryFeatures = class {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryStr = { ...this.queryStr };
    delete queryStr.fields;
    this.query.find(queryStr);

    return this;
  }

  project() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query.select(fields);
    } else {
      this.query.select('-__v');
    }

    return this;
  }
};

export default QueryFeatures;
