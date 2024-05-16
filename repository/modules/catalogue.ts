import { AsyncDataOptions } from '#app'
import FetchFactory from '~/repository/factory'

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

interface service {
  id: String,
  phone: String,
  photo_url: String,
  name: String,
  description: String
}

interface catalogue {
  id: String,
  code: String,
  name: String,
  description: String,
  service: service[]
}

interface Response {
  data: catalogue[];
  links: Links;
  meta: Meta;
  message: String;
  version: String
}

class CatalogueModule extends FetchFactory<any> {
  private RESOURCE = 'page-pengadu'

  async getCatalogues (param?: Object, asyncDataOptions?: AsyncDataOptions<Response>) {
    return useAsyncData(() => {
      return this.call(
        'GET',
        this.RESOURCE,
        undefined,
        undefined,
        param
      )
    }, asyncDataOptions)
  }

}

export default CatalogueModule
