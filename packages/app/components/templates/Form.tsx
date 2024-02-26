"use client";
import useMutation from "@/hooks/useCustomMutation";
import {
  addTokenToLocalStorage,
  setCurrentUser,
} from "@/lib/features/users/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Loader from "../atoms/Loader";
import ControlledInput from "../molecules/ControlledInput";
import FormWrapper from "../organisms/FormWrapper";
import { DocumentNode } from "graphql";
import * as yup from "yup";

type Props<T> = {
  fields: Array<{
    name: string;
    label: string;
    type: string;
    placeholder: string;
  }>;
  mutation: DocumentNode;
  validationSchema: yup.AnyObjectSchema;
  buttonText: string;
  mutationName: string;
};

function Form<T>({
  fields,
  mutation,
  validationSchema,
  buttonText,
  mutationName,
}: Props<T>) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const [mutate, { data, loading, error }] = useMutation(mutation, {
    onCompleted: (data) => {
      dispatch(setCurrentUser(data[mutationName]));
      dispatch(addTokenToLocalStorage(data[mutationName].accessToken));
      // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function
      /* 
        There are four ways to navigate between routes in Next.js:
        Using the <Link> Component
        Using the useRouter hook (Client Components)
        Using the redirect function (Server Components)
        Using the native History API
      */
      router.push("/chats");
    },
  });

  const onSubmit = (data: T) => {
    mutate({ variables: { input: data } });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log({ error });
  }

  return (
    <FormWrapper methods={methods} onSubmit={onSubmit}>
      {fields.map((field) => (
        <ControlledInput
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
        />
      ))}
      <Button text={buttonText} type="submit" />
    </FormWrapper>
  );
}

export default Form;
