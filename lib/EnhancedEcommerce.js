import AddImpression from './hits/Ecommerce/AddImpression';
import AddProduct from './hits/Ecommerce/AddProduct'
import AddItem from './hits/Ecommerce/AddItem'
import SetAction from './hits/Ecommerce/SetAction'
import Serializable from './Serializable';

export default class EnhancedEcommerce extends Serializable {
  isEmpty() {
    return Object.keys(this.properties).length ? false : true;
  }

  add(hit) {
    if (
      !(hit instanceof AddImpression) &&
      !(hit instanceof AddProduct) &&
      !(hit instanceof AddItem) &&
      !(hit instanceof SetAction)
    ) {
      throw new Error("Only enhanced ecommerce hits can be added using 'add' command.");
    }
    hit.add(this.properties);
  }

  toQueryString() {
    const hitKeys = Object.keys(this.properties);

    if (!hitKeys.length) {
      return '';
    }
    let query = [];
    hitKeys.forEach(hitKey => {
      if (hitKey === 'AddImpression') {
        const listKeys = Object.keys(this.properties[hitKey]);
        listKeys.forEach(listKey => {
          const hits = this.properties[hitKey][listKey].list;

          if (hits) {
            hits.forEach(hit => {
              query.push(hit.toQueryString());
            });
          }
        });
        return
      }
      this.properties[hitKey].forEach(hit => {
        query.push(hit.toQueryString());
      })
    });
    // Clears all enhanced ecommerce hits from memory.
    this.properties = {};

    return query.join('&');
  }
}
