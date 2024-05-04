export interface JikanImagesCollection {
  image_url: string
  small_image_url?: string
  medium_image_url?: string
  large_image_url?: string
  maximum_image_url?: string
}

export interface JikanImages {
  jpg: JikanImagesCollection
  webp?: JikanImagesCollection
}

export interface JikanResourceTitle {
  type: string
  title: string
}

export interface JikanResourcePeriod {
  from: string
  to: string
  prop: {
    form: { day: number; month: number; year: number }
    to: { day: number; month: number; year: number }
    string: string
  }
}

export interface JikanResource {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface JikanResourceRelation {
  relation: string
  entry: JikanResource[]
}

export interface JikanNamedResource {
  name: string
  url: string
}
