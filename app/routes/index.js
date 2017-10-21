import Route from '@ember/routing/route';

export default Route.extend({
  // Redirects root to the 'rentals' route.
  // Does not add redirect to history
  beforeModel() {
    this.replaceWith('rentals');
  }
});
