import axios, { AxiosRequestConfig } from 'axios'

export interface CallApiParams<T> {
  url: string
  config?: AxiosRequestConfig
  onRequest: () => void
  onSuccess: (value: T) => void
  onError: (error: string) => void
}

export const getResult = <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return axios
    .get<T>(url, { crossDomain: true, ...config })
    .then(response => response.data)
}

export const callApi = async <T>({
  url,
  config,
  onRequest,
  onSuccess,
  onError,
}: CallApiParams<T>): Promise<T> => {
  onRequest()
  try {
    const result = await getResult<T>(url, config)
    onSuccess(result)
    return result
  } catch (error: any) {
    onError(error.toString())
    throw error
  }
}
