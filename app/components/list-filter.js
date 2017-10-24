import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    // seed initial entries by calling filter with an empty value
    this.get('filter')('').then((results) => this.set('results', results));
    this.get('filter')('').then((allResults) => {
      this.set('results', allResults.results);
    });
  },

  actions: {
    // Calls 'filter' on the value set in the 'value' attribute of the input helper
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      // `then' expects `filterAction' to return a promise.  A promise is a JS object
      // that represents the result of an asynchronous function.  Since filterAction
      // may not return a result immediately, `then' will wait until it receives the result
      // to execute its code.
      filterAction(filterInputValue).then((filterResults) => {
        if (filterResults.query === this.get('value')) {
          this.set('results', filterResults.results);
        }
      });
    }
  }

});
