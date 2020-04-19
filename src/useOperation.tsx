import { useContext, useState } from 'react';
import { OpenAPIContext } from './OpenAPIProvider';
import { UnknownOperationMethod, AxiosResponse } from 'openapi-client-axios';

export function useOperation(
  operationId: string,
): [UnknownOperationMethod, { loading: boolean; error?: Error; data?: any }] {
  const { api } = useContext(OpenAPIContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const operationMethod: UnknownOperationMethod = async (...params) => {
    setLoading(true);
    const client = await api.getClient();
    let res: AxiosResponse;
    try {
      res = await client[operationId](...params);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    return res;
  };

  return [operationMethod, { loading, error, data }];
}