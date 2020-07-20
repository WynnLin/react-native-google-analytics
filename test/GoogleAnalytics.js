import {
    Analytics,
    Hits as GAHits,
    Experiment as GAExperiment,
    EcommerceHits as GAEcommerceHits,
} from 'club-react-native-google-analytics'

class GoogleAnalytics {
    constructor (location, pageId) {
        this.location = location
        this.pendingTasks = []
        this.pageId = pageId
        this.analytics = {
            addEcommerce: () => {},
            addDimension: () => {},
            send: () => {},
        }
        this.impressionCount = 0
        this.init(this.flushPendingTasks)
    }

    /**
     * 执行等待的任务
     */
    flushPendingTasks () {
        if (this.pendingTasks?.length > 0) {
            for (const task of this.pendingTasks) {
                task()
            }
        }
    }

    async init (cb) {
        this.analytics = new Analytics('', 'cid', 1, 'userAgent', {
            de: 'UTF-8',
            ul: 'zh-cn',
            sr: `375x667`,
            vp: `375x667`,
            dl: this.location,
            dh: 'host'
        })
        cb?.()
    }

    send (hit) {
        this.analytics.send(hit)
    }

    checkGa (cb) {
        if (!this.analytics) {
            let times = 0
            this.interval = setInterval(() => {
                if (times >= 10) {
                    clearInterval(this.interval)
                }
                this.init(() => {
                    clearInterval(this.interval)
                    cb?.()
                })
                times++
            }, 2000)
            return
        }
        cb?.()
    }

    /**
     * 上报PV
     *
     * @param title 名称
     * @returns {Promise<void>}
     */
    async sendPV (title = 'wholee | Lower Price, Better Service') {
        const experiment = await this.getExperiment()
        const pv = new GAHits.PageView(this.location, title, experiment)
        this.checkGa(() => {
            this.send(pv)
        })
    }

    /**
     * 上报事件
     *
     * @param category
     * @param action
     * @param label
     * @param value
     * @returns {Promise<void>}
     */
    async sendEvent (category, action, label, value) {
        const experiment = await this.getExperiment()
        const ge = new GAHits.Event(category, action, label, value, experiment)
        this.send(ge)
    }

    addProduct (params) {
        const { id, name, brand, category, position, price, quantity, variant } = params
        const gaProduct = new GAEcommerceHits.AddProduct(
            id,
            name,
            brand,
            category,
            position,
            price,
            quantity,
            variant,
        )
        this.onGaReady(() => {
            this.analytics.addEcommerce(gaProduct)
        })
    }

    addImpression (params) {
        const { id, name, list, brand, category, variant, position, price } = params
        const gaImpression = new GAEcommerceHits.AddImpression(
            id,
            name,
            list,
            brand,
            category,
            variant,
            position,
            price,
        )
        this.onGaReady(() => {
            this.analytics.addEcommerce(gaImpression)
            this.impressionCount++
            if (this.impressionCount === 10) {
                this.impressionReport()
            }
        })
    }

    impressionReport (destory) {
        // GA 打点 商品曝光
        if (!(destory && this.impressionCount > 0) && this.impressionCount !== 10) {
            return
        }
        this.sendEvent(
            'Product',
            'Impression',
            'Product Impression',
        )
        this.impressionCount = 0
    }

    onGaReady (action) {
        if (this.analytics) {
            action()
        } else {
            this.pendingTasks?.push(action)
        }
    }

    setAction (action, params) {
        const gaAction = new GAEcommerceHits.SetAction(action, params)
        this.analytics.addEcommerce(gaAction)
    }

    gtag (command, ...commandParams) {
        if (!['config', 'set', 'event'].includes(command)) throw new Error('command can only config with config, set and event')
        if (command === 'event') {
            const eventName = commandParams[0]
            if (!eventName) throw new Error('event must set event name')
            const eventParams = commandParams[1] || {}
            let eventCategory = ''
            if (eventName === 'view_item') {
                eventCategory = 'engagement'
                // event category = engagement
            }
        }
    }

    async getExperiment (filterVars = []) {
        let experiment = null
        return experiment
    }
}

export default GoogleAnalytics
