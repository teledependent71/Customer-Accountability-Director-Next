import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import authorsPageInitialPathsEa28aResource from '../../../resources/authors-page-initial-paths-ea28a'
import authorsPageInitialProps2121aResource from '../../../resources/authors-page-initial-props-2121a'

const Authors1 = (props) => {
  return (
    <>
      <div className="authors1-container">
        <Head>
          <title>Authors - Customer Accountability Director</title>
          <meta
            property="og:title"
            content="Authors - Customer Accountability Director"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(AuthorsEntities) => (
                  <>
                    <div className="authors1-container1">
                      <h1>{AuthorsEntities?.Name}</h1>
                      <span>{AuthorsEntities?.Name}</span>
                      <span>{AuthorsEntities?.Linkedin}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.authorsEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .authors1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .authors1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Authors1.defaultProps = {
  authorsEntities: [],
}

Authors1.propTypes = {
  authorsEntities: PropTypes.array,
}

export default Authors1

export async function getStaticPaths() {
  try {
    const response = await authorsPageInitialPathsEa28aResource({})
    const totalCount = response?.meta?.pagination?.total
    const pagesCount = Math.ceil(totalCount / 10)
    return {
      paths: Array.from(
        {
          length: pagesCount,
        },
        (_, i) => ({
          params: {
            page: (i + 1).toString(),
          },
        })
      ),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await authorsPageInitialProps2121aResource({
      ...context?.params,
      start: (context.params.page - 1) * 10,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        authorsEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
