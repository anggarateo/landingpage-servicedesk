// locals
import FetchFactory from '~/repository/factory'

class GlobalModule extends FetchFactory<any> {
  private RLANDINGPAGE = 'complaint/home'

  /**
   * Return the products as array
   * @param asyncDataOptions options for `useAsyncData`
   * @returns
   */

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
}

export default GlobalModule
