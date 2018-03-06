import Entity from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed, get } from '@ember/object';

import { belongsTo } from 'ember-data/relationships';
export default Entity.extend({
  ID: attr('string'),
  Address: attr('string'),
  Node: attr('string'),
  Meta: attr(),
  Services: attr(),
  Checks: attr(),
  TaggedAddresses: attr(),
  Datacenter: belongsTo('dc'),
  // The number of failing checks within the service.
  // Boolean of whether or not there are failing checks in the service.
  // This is used to set color backgrounds and so on.
  hasFailingChecks: computed.gt('failingChecks', 0),
  // The number of services on the node
  numServices: computed.alias('Services.length'),
  services: computed.alias('Services'),
  filterKey: computed.alias('Node'),
  failingChecks: function() {
    return this.get('Checks').reduce(function(sum, check) {
      var status = get(check, 'Status');
      // We view both warning and critical as failing
      return status === 'critical' || status === 'warning' ? sum + 1 : sum;
    }, 0);
  }.property('Checks'),
  // The number of passing checks within the service.
  passingChecks: function() {
    return this.get('Checks')
      .filterBy('Status', 'passing')
      .get('length');
  }.property('Checks'),
  // The formatted message returned for the user which represents the
  // number of checks failing or passing. Returns `1 passing` or `2 failing`
  checkMessage: function() {
    if (this.get('hasFailingChecks') === false) {
      return this.get('passingChecks') + ' passing';
    } else {
      return this.get('failingChecks') + ' failing';
    }
  }.property('Checks'),
});
