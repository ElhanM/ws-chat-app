import {
  useMutation as originalUseMutation,
  DocumentNode,
  MutationHookOptions,
} from "@apollo/client";
import client from "../apollo/apollo-client";
import { toast } from "react-toastify";

function useMutation<TData = any, TVariables = any>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) {
  return originalUseMutation<TData, TVariables>(mutation, {
    onError: (error) => {
      toast.error("Error: " + error.message);
    },
    ...options,
    client,
  });
}

// example usage:
// const [addTodo, { data }] = useMutation(ADD_TODO, {
//   variables: { title: "Hello World" }
// });

export default useMutation;
