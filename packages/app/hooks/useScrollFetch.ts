import { useRef, useState, useEffect } from "react";
import {
  FetchMoreQueryOptions,
  FetchMoreOptions,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client";
import { User } from "@ws-chat-app/shared";

interface OtherUsers {
  otherUsers: Array<User>;
}

const useScrollFetch = (
  fetchMore: <
    TFetchData = OtherUsers,
    TFetchVars extends OperationVariables = OperationVariables,
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> &
      FetchMoreOptions<TFetchData, TFetchVars>
  ) => Promise<ApolloQueryResult<TFetchData>>,
  dataLength: number
) => {
  const [isFetching, setIsFetching] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData();
  }, [isFetching]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => scrollableDiv.removeEventListener("scroll", handleScroll);
    }
  }, [dataLength, isFetching]);

  function handleScroll() {
    const scrollableDiv = scrollableDivRef.current;
    if (!scrollableDiv) return;

    const { scrollHeight, scrollTop, clientHeight } = scrollableDiv;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (isNearBottom && !isFetching) {
      setIsFetching(true);
    }
  }

  async function fetchMoreData() {
    try {
      await fetchMore({
        variables: {
          skip: dataLength,
          take: 15,
        },
        updateQuery: (
          prev: OtherUsers,
          {
            fetchMoreResult,
          }: {
            fetchMoreResult?: OtherUsers;
          }
        ) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            otherUsers: [
              ...prev.otherUsers,
              ...(fetchMoreResult?.otherUsers || []),
            ],
          };
        },
      });
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  }

  return { isFetching, setIsFetching, scrollableDivRef };
};

export default useScrollFetch;
