type ApiOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number>;
};

export default ApiOptions;
