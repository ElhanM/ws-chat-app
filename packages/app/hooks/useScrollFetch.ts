import { useRef, useState, useEffect } from "react";
import {
  FetchMoreQueryOptions,
  FetchMoreOptions,
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client";

interface FetchData {
  [key: string]: any;
}

const useScrollFetch = <
  TData extends FetchData = FetchData,
  TFetchVars extends OperationVariables = OperationVariables,
>(
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TData> &
      FetchMoreOptions<TData, TFetchVars>
  ) => Promise<ApolloQueryResult<TData>>,
  dataLength: number,
  key: keyof TData,
  getVariables: (dataLength: number) => TFetchVars
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
        variables: getVariables(dataLength),
        updateQuery: (
          prev: TData,
          {
            fetchMoreResult,
          }: {
            fetchMoreResult?: TData;
          }
        ) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            [key]: [...prev[key], ...(fetchMoreResult?.[key] || [])],
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
