/**
 * api请求库
 */

export default class Request {
  config: {
    baseURL: ""
  }

  constructor(config = {}) {
    this.config = Object.assign(this.config, config)
  }

  /**
   * 请求实现
   */
  async request(config = {}) {
    return new Promise((resolve, reject) => {})
  }
}
