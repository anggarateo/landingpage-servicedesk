import { AsyncDataOptions } from '#app'
import FetchFactory from '~/repository/factory'

class ChatModule extends FetchFactory<any> {
  private RESOURCE = 'chat'
  private GUEST = 'chat/guest'

  async uploadImage (body: FormData, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/upload/image`,
        body
      )
    }, asyncDataOptions)
  }

  async storeImage (body: { trx_ticket_chat_id: String, image: [] }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/store/image`,
        body
      )
    }, asyncDataOptions)
  }

  async create (body: { trx_ticket_id: String, message: String, category?: String, sub_chat_id?: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        this.RESOURCE,
        body
      )
    }, asyncDataOptions)
  }

  async detail (id: String, params: { lang?: String, category?: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/${id}/detail`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async list (id: String, params?: { lang?: String, category?: String, sort?: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/list/${id}`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async uploadImageGuest (body: FormData, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.GUEST}/upload/image`,
        body
      )
    }, asyncDataOptions)
  }

  async storeImageGuest (body: { trx_ticket_chat_id: String, image: [] }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.GUEST}/store/image`,
        body
      )
    }, asyncDataOptions)
  }

  async createGuest (
    body: {
      code_ticket: String,
      pin_ticket: String,
      trx_ticket_id: String,
      message: String,
      category?: String,
      sub_chat_id?: String
    },
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        this.GUEST,
        body
      )
    }, asyncDataOptions)
  }

  async detailGuest (
    id: String,
    params: {
      code_ticket: String,
      pin_ticket: String,
      lang?: String,
      category?: String
    },
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.GUEST}/${id}/detail`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async listGuest (
    id: String,
    params: {
      code_ticket: String,
      pin_ticket: String,
      lang?: String,
      category?: String,
      sort?: String
    },
    asyncDataOptions?: AsyncDataOptions<any>
  ) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.GUEST}/list/${id}`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

}

export default ChatModule
