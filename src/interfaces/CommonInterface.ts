export interface IUrl {
  type: string;
  url: string;
}

export interface IThumbnail {
  path: string;
  extension: string;
}

export interface IResourceURI {
  resourceURI: string;
  name: string;
}

export interface IResourceAPI {
  available: number;
  collectionURI: string;
  returned: number;
  items: IResourceURI[];
}

export interface IAPIResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}
