import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Customer Accountability Director</title>
          <meta
            property="og:title"
            content="test-page - Customer Accountability Director"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_crt8i9) => (
            <>
              <h1 id={context_crt8i9?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextCrt8i9Prop}
          persistDataDuringLoading={true}
          key={props?.contextCrt8i9Prop?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextCrt8i9Prop = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextCrt8i9Prop: contextCrt8i9Prop?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
