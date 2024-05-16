/* eslint-disable require-await */
// 3rd's
import { AsyncDataOptions } from '#app'

// locals
import FetchFactory from '~/repository/factory'

class GlobalModule extends FetchFactory<any> {
  private RESOURCE = 'service/group'
  private RUNIT = 'unit-of-work'
  private RPOSITION = 'position'
  private RLANDINGPAGE = 'complaint/home'

  /**
   * Return the products as array
   * @param asyncDataOptions options for `useAsyncData`
   * @returns
   */
  async getUnitOfWork (
    body : any,
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(
      () => {
        return this.call(
          'GET',
          `${this.RUNIT}`,
          body // body
        )
      },
      asyncDataOptions
    )
  }

  async getPositinOfWork (
    body : any,
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(
      () => {
        return this.call(
          'GET',
          `${this.RPOSITION}`,
          body // body
        )
      },
      asyncDataOptions
    )
  }

  async getContent (lang: Object) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        this.RLANDINGPAGE,
        undefined,
        undefined,
        lang
      )
    })
  }

  async searchKeyword (params: Object) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        'page-home/search',
        // `${this.RLANDINGPAGE}/search`,
        undefined,
        undefined,
        params
      )
    })
  }
}

export default GlobalModule
