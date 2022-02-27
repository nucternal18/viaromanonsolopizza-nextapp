import { ReactElement } from "react";
import { NextPageContext, NextPage } from "next";

import { ErrorProps as NextErrorProps } from "next/error";
import NextErrorComponent from "../components/NextErrorComponent";

type ErrorPageProps = {
  err: Error;
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  children?: ReactElement;
};

type ErrorProps = {
  hasGetInitialPropsRun: boolean;
} & NextErrorProps;

function MyError({ statusCode, hasGetInitialPropsRun, err }: ErrorPageProps) {
  return <NextErrorComponent statusCode={statusCode} />;
}

MyError.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (err) {
    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry

  return errorInitialProps;
};

export default MyError;
