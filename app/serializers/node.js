import pojo from 'consul-ui/utils/pojo';

import Serializer from './application';
export default Serializer.extend({
  primaryKey: 'Node',
  normalizeQueryResponse: function(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeFindAllResponse(...arguments);
  },
  normalizeFindAllResponse: function(store, primaryModelClass, payload, id, requestType) {
    return this._super(
      store,
      primaryModelClass,
      pojo(primaryModelClass.modelName)(payload),
      id,
      requestType
    );
  },
  normalizeFindRecordResponse: function(store, primaryModelClass, payload, id, requestType) {
    // this feels strange but prefer non-repetition
    return this.normalizeFindAllResponse(...arguments);
  },
});
