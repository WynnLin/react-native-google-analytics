import {
  Analytics,
  Hits as GAHits,
  Experiment as GAExperiment,
} from '../lib/Analytics'


let ga = (this.ga = null)
class GoogleAnalytics {
  constructor (props) {
    ga = new Analytics('UA-71464937-1', 123123123, 1, 'user_agent', {
        de: 'UTF-8',
        ul: 'zh-cn',
        sr: `375x667`,
        vp: `375x667`,
    })
  }

  async sendPV (location, title) {
      const experiment = await this.getExperiment()
      let pv = new GAHits.PageView(
          location,
          title,
          experiment
      )
      ga.send(pv)
  }

  async sendSV (page) {
      const cookie = await getCookies()
      let sv = new GAHits.ScreenView(
          'Club Factory',
          page,
          cookie.v,
          'club.fromfactory'
      )
      ga.send(sv)
  }

  async sendEvent (category, action, label, value) {
      const experiment = await this.getExperiment()
      let ge = new GAHits.Event(category, action, label, value, experiment)
      ga.send(ge)
  }

  addImpression (id, name, list, brand, category, variant, position, price) {
      var gaImpression = new GAHits.Impression(
          id,
          name,
          list,
          brand,
          category,
          variant,
          position,
          price
      )
      ga.add(gaImpression)
  }

  async getExperiment () {
      // const cookie = await getCookies()
      let experiment = null
      // try {
      //     const expe = JSON.parse(decodeURIComponent(cookie.experiment))
      //     Object.keys(expe).forEach(key => {
      //         if (expe[key] !== -1) {
      //             experiment = new GAExperiment(
      //                 key,
      //                 expe[key]
      //             )
      //         }
      //     })
      // } catch (error) {
      //     if (cookie.experiment_id && cookie.variation_id) {
      //         experiment = new GAExperiment(
      //             cookie.experiment_id,
      //             cookie.variation_id
      //         )
      //     }
      // }
      return experiment
  }
}

export default new GoogleAnalytics()
