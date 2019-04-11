import Hit from '../../Hit'

export default class SetAction extends Hit {
  constructor (action, params) {
    const { id, affiliation, revenue, tax, shipping, coupon, list, step, option } = params
    super({
      id,
      affiliation,
      revenue,
      tax,
      shipping,
      coupon,
      list,
      step,
      option,
    })
    this.action = action
    this.actions = ['purchase', 'remove', 'click', 'add', 'promo_click', 'detail', 'checkout', 'checkout_option', 'refund']
  }

  add(enhancedEcommerce) {
    // Reference: https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#enhancedecom
    if (!this.properties) {
      return;
    }

    // setAction need an action width one of purchase, remove, click, add, promo_click, detail, checkout, checkout_option, refund
    if (this.actions.indexOf(this.action) === -1) {
      throw new Error('Action sets unknown, setAction need an action width one of purchase, remove, click, add, promo_click, detail, checkout, checkout_option, refund')
    }

    if ((this.action === 'purchase' || this.action === 'refund') && !this.properties.id) {
      throw new Error(`action ->> ${action}, need properties id`)
    }

    const hitKey = SetAction.name.toLowerCase();
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
    // pa action inlcude below action
    // [purchase, remove, click, add, promo_click, detail, checkout, checkout_option, refund]
    // ti: id
    // ta: affiliation
    // tr: revenue
    // tt: tax
    // ts: shipping
    // tcc: coupon
    // pal: list
    // cos: step
    // col: option
    impression['pa'] = this.action
    impression['ti'] = this.properties.id
    impression['ta'] = this.properties.affiliation
    impression['tr'] = this.properties.revenue
    impression['tt'] = this.properties.tax
    impression['ts'] = this.properties.shipping
    impression['tcc'] = this.properties.coupon
    impression['pal'] = this.properties.list
    impression['cos'] = this.properties.step
    impression['col'] = this.properties.option

    // Replaces initial impression keys with the final version.
    this.replace(impression);

    enhancedEcommerce[hitKey].push(this);
  }
}