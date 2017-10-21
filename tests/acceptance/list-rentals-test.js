import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

// Acceptance tests automate various scenarios where the user navigates through
// the website.  They are 'end-to-end' tests, as opposed to integration and unit
// tests.

// Sets up the acceptance test
moduleForAcceptance('Acceptance | list rentals');

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
});

test('should show details for a selected rental', function (assert) {
});
