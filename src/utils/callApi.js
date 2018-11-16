/** @flow **/
import axios from 'axios'

type TCallApi = {
  url: string,
  config: {},
  onRequest: () => mixed,
  onSuccess: (value: {}) => mixed,
  onError: (value: any) => mixed,
}

export const callApi = ({
                          url,
                          config,
                          onRequest,
                          onSuccess,
                          onError,
                        }: TCallApi) => {
  onRequest()
  const Headers = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
    },
  }
  return getResult(url, config)
    .then(json => onSuccess(json))
    .catch(error => onError(error.toString()))
}

export const getResult = (url: string, config: {}) =>
  axios.get(url, Object.assign({}, { crossDomain: true }, Headers, config))
