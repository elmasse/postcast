/* global describe, test, expect */
import React from 'react'
import fetchMock from 'fetch-mock'

import { mount } from 'enzyme'

/* SUT */
import Postcast from '../../src'

describe('Postcast', () => {
  test('load src', async () => {
    fetchMock.get('/source', {
      body: '# This is a title\n And this a paragraph',
      status: 200,
      headers: {
        'content-type': 'text/markdown'
      }
    })

    const wrapper = mount(<Postcast src={'/source'} />)

    await wrapper.instance().componentDidMount()

    wrapper.update()

    expect(wrapper.state('loaded')).toBe(true)
    expect(wrapper.state('error')).toBeFalsy()

    expect(wrapper).toMatchSnapshot()
  })

  test('load src with error', async () => {
    fetchMock.get('/not-found', {
      status: 404
    })

    const wrapper = mount(<Postcast src={'/not-found'} />)

    await wrapper.instance().componentDidMount()

    wrapper.update()

    expect(wrapper.state('loaded')).toBe(false)
    expect(wrapper.state('error')).not.toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  test('load src with non markdown endpoint', async () => {
    fetchMock.get('/not-markdown', {
      body: '<html></html>',
      status: 200,
      headers: {
        'content-type': 'text/html'
      }
    })

    const wrapper = mount(<Postcast src={'/not-markdown'} />)

    await wrapper.instance().componentDidMount()

    wrapper.update()

    expect(wrapper.state('loaded')).toBe(false)
    expect(wrapper.state('error')).not.toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  test('markdown as children', async () => {
    const wrapper = mount(<Postcast >{() => `# Title\nAnd Paragraph`}</Postcast>)

    await wrapper.instance().componentDidMount()

    wrapper.update()

    expect(wrapper.state('loaded')).toBe(true)
    expect(wrapper.state('error')).toBeFalsy()

    expect(wrapper).toMatchSnapshot()
  })
})
