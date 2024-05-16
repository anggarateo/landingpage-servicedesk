// 3rd's
import { AsyncDataOptions } from '#app'

// locals
import FetchFactory from '~/repository/factory'

type ILogin = {
  email: string;
  password: string;
}
interface ApiResponse {
  data: {
    authorization:{},
    user:{}
  };
  request_at: string;
  message: string;
  version: string;
}

class AuthModule extends FetchFactory<any> {
  private RESOURCE = 'auth'

  /**
   * Return the products as array
   * @param asyncDataOptions options for `useAsyncData`
   * @returns
   */
  // eslint-disable-next-line require-await
  async postLogin (
    body : ILogin,
    asyncDataOptions?: AsyncDataOptions<ApiResponse>
  ) {
    return useAsyncData(
      () => {
        return this.call(
          'POST',
          `${this.RESOURCE}/login`,
          body
        )
      },
      asyncDataOptions
    )
  }

  async forgotPassword (body: { email: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/forgot-password-send`,
        body
      )
    }, asyncDataOptions
    )
  }

  async resetPassword (body: { token: any, password: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/forgot-password/save`,
        body
      )
    }, asyncDataOptions
    )
  }

  async verifyAccount (body: { token: any }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/verify-email`,
        body
      )
    }, asyncDataOptions
    )
  }

  /**
   * Return the products as array
   * @param asyncDataOptions options for `useAsyncData`
   * @returns
   */
  // eslint-disable-next-line require-await
  async postLoginSosmed (
    param : any,
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(
      () => {
        return this.call(
          'POST',
          `${this.RESOURCE}/login-sosmed`,
          param // body
        )
      },
      asyncDataOptions
    )
  }

  // eslint-disable-next-line require-await
  async postLoginSso (
    param : any,
    asyncDataOptions?: AsyncDataOptions<ApiResponse>
  ) {
    return useAsyncData(
      () => {
        return this.call(
          'POST',
          'auth/login-sso',
          param // body
        )
      },
      asyncDataOptions
    )
  }
}

export default AuthModule
