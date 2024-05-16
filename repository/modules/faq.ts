import { AsyncDataOptions } from '#app'
import FetchFactory from '~/repository/factory'

interface content {
  id: String,
  title: String,
  content: String
}

interface faq {
  id: String,
  name: String,
  description: String,
  count_content: Number,
  content: content[]
}

interface Links {
  first: String;
  last: String;
  prev: String | null;
  next: String | null;
}

interface LinkItem {
  url: String | null;
  label: String;
  active: Boolean;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: LinkItem[];
  path: String;
  per_page: number;
  to: number;
  total: number;
}

interface Response {
  data: faq[];
  links: Links;
  meta: Meta;
  message: String;
  version: String
}

interface category {
  id: String
  name: String
  description: String
}

interface categories {
  data: category[]
  message: String
  version: String
}

class FaqModule extends FetchFactory<any> {
  private RESOURCE = 'page-faq'

  async getFaq (param?: Object, asyncDataOptions?: AsyncDataOptions<Response>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/list`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

  async getFaqCategory (param?: Object, asyncDataOptions?: AsyncDataOptions<categories>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/category`,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }
}

export default FaqModule
