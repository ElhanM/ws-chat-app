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
  getVariables: (dataLength: number) => TFetchVars,
  isModalOpen: boolean = false,
  scrollDirection: "up" | "down" = "down",
  loading?: boolean
) => {
  const [isFetching, setIsFetching] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFetching) return;
    if (scrollDirection === "up") {
      if (loading || loading === undefined) return;
    }
    fetchMoreData();
  }, [isFetching]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => scrollableDiv.removeEventListener("scroll", handleScroll);
    }
  }, [dataLength, isFetching, isModalOpen, loading]);

  function handleScroll() {
    const scrollableDiv = scrollableDivRef.current;
    if (!scrollableDiv) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollableDiv;
    const isNearEdge =
      scrollDirection === "down"
        ? scrollTop + clientHeight >= scrollHeight - 50
        : scrollTop <= 1;

    if (isNearEdge && !isFetching) {
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
          if (scrollDirection === "down") {
            return {
              ...prev,
              [key]: [...prev[key], ...(fetchMoreResult?.[key] || [])],
            };
          } else {
            return {
              ...fetchMoreResult,
              [key]: [...fetchMoreResult[key], ...(prev[key] || [])],
            };
          }
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
