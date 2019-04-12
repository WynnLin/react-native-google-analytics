import Hit from '../../Hit'

export default class AddProduct extends Hit {
  constructor (id, name, brand, category, position, price, variant) {
    super({
      id: id,
      name: name,
      brand: brand,
      category: category,
      variant: variant,
      position: position,
      price: price
    })
  }

  add(enhancedEcommerce) {
    // AddProduct property 'id' or 'name' is a required field.
    // Reference: https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#enhancedecom
    if (!this.properties || !(this.properties.id || this.properties.name)) {
      throw new Error('add product must with id or name param')
    }

    const hitKey = 'AddProduct';
    const impressions = enhancedEcommerce && enhancedEcommerce[hitKey];

    if (!impressions) {
      enhancedEcommerce[hitKey] = [];
    }

    let impression = {};

    // Checks if impression list already exist to aggregate the data.
    // If not, it would create a new list for it.
    if (!enhancedEcommerce[hitKey]) {
      enhancedEcommerce[hitKey] = []
    }

    let productIndex = enhancedEcommerce[hitKey].length;
    productIndex++;
    // pr1id: JEA000385252N    id
    // pr1nm:                  name
    // pr1ca: 60214164         category
    // pr1br: 385252 & 1.45    brand
    // pr1pr: 1.45             pirce
    // pr1ps: 13               position
    impression[`pr${productIndex}id`] = this.properties.id;
    impression[`pr${productIndex}nm`] = this.properties.name;
    impression[`pr${productIndex}br`] = this.properties.brand;
    impression[`pr${productIndex}ca`] = this.properties.category;
    impression[`pr${productIndex}va`] = this.properties.variant;
    impression[`pr${productIndex}ps`] = this.properties.position;
    impression[`pr${productIndex}pr`] = this.properties.price;

    // Replaces initial impression keys with the final version.
    this.replace(impression);

    enhancedEcommerce[hitKey].push(this);
  }
}