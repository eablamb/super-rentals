import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';
import Service from '@ember/service';

// Acceptance tests automate various scenarios where the user navigates through
// the website.  They are 'end-to-end' tests, as opposed to integration and unit
// tests.

// Stub the maps service in our acceptance tests so we don't have
// to make costly Google API calls for our tests
let StubMapsService = Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

// Sets up the acceptance test
moduleForAcceptance('Acceptance | list rentals', {
  beforeEach() {
    this.application.register('service:stubMaps', StubMapsService);
    this.application.inject('component:location-map', 'maps', 'service:stubMaps');
  }
});

// the `assert' object tests for various conditions
// QUnit requires at least one check from assert, otherwise the test will
// automatically fail
test('should show rentals as the home page', function (assert) {
  // Loads the '/' URL
  visit('/');

  // Waits for our previous commands to run before executing
  andThen(function() {

    // `assert.equal' checks to see if the first two items equal each other,
    // the third argument is optional and provides a message that will be
    // shown if the test fails.
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});

test('should link to information about the company.', function (assert) {
  visit('/');

  // Pretends to be a user clicking on a specific part of the screen
  click('a:contains("About")');

  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information.', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});

test('should filter the list of rentals by city.', function (assert) {
  visit('/');
  // Fills in the value 'Seattle' in the list-filter bar
  fillIn('.list-filter input', 'Seattle');
  // Simulates typing an 'e' key (69) on the list-filter bar
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(function() {
    // find all elements of class '.listing' (our rental-listing components), and assert there is only 1
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    // Assert the single listing is for Seattle
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  });
});

test('should show details for a selected rental', function (assert) {
});
