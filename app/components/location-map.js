import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  // will load the service in the file /app/services/maps.js
  maps: service(),

  didInsertElement() {
    this._super(...arguments);
    let location = this.get('location');
    let mapElement = this.get('maps').getMapElement(location);
    this.$('.map-container').append(mapElement);
  }
});