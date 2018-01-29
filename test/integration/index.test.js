
import React from 'react'

import fetchMock from 'fetch-mock'
import Enzyme from 'enzyme'
import {shallow, mount, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Postcast from '../../src'

describe('Postcast', () => {

  test('load src', async () => {
    fetchMock.get('/source', {
      body:'# This is a title\n And this a paragraph',
      status: 200,
      headers: {"content-type": "text/markdown"}
    })

    const wrapper = mount(<Postcast src="/source" />)

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

    const wrapper = mount(<Postcast src="/not-found" />)

    await wrapper.instance().componentDidMount()

    wrapper.update()

    expect(wrapper.state('loaded')).toBe(false)
    expect(wrapper.state('error')).not.toBeFalsy()
    expect(wrapper).toMatchSnapshot()

  })
})
