import { AsyncDataOptions } from '#app'
import FetchFactory from '~/repository/factory'

class TicketModule extends FetchFactory<any> {
  private RESOURCE = 'trans'

  async getCategories (param?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/master/list-service-category`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

  async getServices (param?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/master/list-service`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

  async getAllServices (param?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/master/list-service-all`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

  async getImpacts (param?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/master/list-impact-level`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

  async createGuest (body: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/guest`,
        body
      )
    }, asyncDataOptions)
  }

  async getByPin (codeTicket: String, body: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/guest/${codeTicket}`,
        body
      )
    }, asyncDataOptions)
  }

  async createUser (body: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/user`,
        body
      )
    }, asyncDataOptions)
  }

  async getList (params?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/user/list`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async getById (idTicket: String, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/user/${idTicket}`
      )
    }, asyncDataOptions)
  }

  async uploadFile (body: FormData, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/upload`,
        body
      )
    }, asyncDataOptions)
  }

  async getServiceFilter (params?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/filter-layanan`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async getStatusTicket (params?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/status`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async rating (body: { trx_ticket_id: String, grade: Number, message?: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        'rating',
        body
      )
    }, asyncDataOptions)
  }

  async closeTicket (idTicket: String, body: FormData, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/user/close-ticket/${idTicket}`,
        body
      )
    }, asyncDataOptions)
  }

  async reOpenTicket (idTicket: String, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/user/re-open-ticket/${idTicket}`
      )
    }, asyncDataOptions)
  }

  async closeTicketGuest (body: { code_ticket: String, pin: String | Number, note?: String }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/guest/close-ticket`,
        body
      )
    }, asyncDataOptions)
  }

  async reOpenTicketGuest (body: { code_ticket: String, pin: String | Number }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/guest/re-open-ticket`,
        body
      )
    }, asyncDataOptions)
  }
  
  async getInfoById (id: String, params?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/admin/info/${id}`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }
  
  async getInfoByPin (params: { code_ticket: String, pin: String | Number }, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/ticket/admin/info/guest`,
        undefined,
        undefined,
        params
      )
    }, asyncDataOptions)
  }

  async resendCode (codeTicket: String, body?: Object, asyncDataOptions?: AsyncDataOptions<any>) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/ticket/guest/resend-message/${codeTicket}`,
        body
      )
    }, asyncDataOptions)
  }
}

export default TicketModule
