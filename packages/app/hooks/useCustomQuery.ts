import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  useQuery as originalUseQuery,
} from "@apollo/client";
import client from "../apollo/apollo-client";

function useQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>) {
  return originalUseQuery<TData, TVariables>(query, {
    ...options,
    client,
  });
}

// example usage:
// const { loading, error, data } = useQuery(GET_TODOS, { variables: { id: 1 } });

export default useQuery;
