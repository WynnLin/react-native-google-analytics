import Hit from '../Hit';

export default class PageView extends Hit {
  constructor(location, title, experiment) {
    super({
      t: 'pageview',
      dl: location,
      dt: title
    }, experiment);
  }
}
