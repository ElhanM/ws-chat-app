import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery as originalUseQuery,
} from "@apollo/client";
import client from "../apollo/apollo-client";
import { toast } from "react-toastify";

function useQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) {
  return originalUseQuery<TData, TVariables>(query, {
    ...options,
    client,
    onError: (error) => {
      console.log({ error });
      toast.error("Error: " + error.message);
      options?.onError?.(error);
    },
  });
}

// example usage:
// const { loading, error, data } = useQuery(GET_TODOS, { variables: { id: 1 } });

export default useQuery;
