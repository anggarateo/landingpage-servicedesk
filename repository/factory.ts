// 3rd's
import { $Fetch, FetchOptions } from 'ofetch'

/*
 The HttpFactory acts as a wrapper around an HTTP client.
 It encapsulates the functionality for making API requests asynchronously
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory<T> {
  private $fetch: $Fetch

  constructor (fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  /**
   * The HTTP client is utilized to control the process of making API requests. 412 is unauthorized
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns
   */
  // eslint-disable-next-line require-await
  async call (
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>,
    query?: object
  ): Promise<T> {
    const auth:any = localStorage.getItem('auth')
    return this.$fetch<T>(
      url,
      {
        method,
        body: data,
        headers: {
          'Accept-Language': 'en-US',
          Authorization: auth ? `Bearer ${JSON.parse(auth).token}` : ''
        },
        query,
        ...fetchOptions,
        onResponse: ({ response }) => {
          if (response.status === 401) {
            localStorage.clear()
            useRouter().push('/')
          }
        }
      }
    )
  }
}

export default FetchFactory
