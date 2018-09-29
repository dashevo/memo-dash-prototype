import _ from 'lodash'
import React, { Component } from 'react'

import { Grid, Search } from 'semantic-ui-react'

import './search.component.styles.css'

export const SEARCH_CATEGORIES = {
  USERS: 'users',
  MEMOS: 'memos'
}

export default class SearchComponent extends Component {
  state = { isLoading: false, results: [], value: '' }

  componentDidMount() {
    this.props.getAllUsers()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    switch (result.category) {
      case SEARCH_CATEGORIES.USERS:
        this.props.onGoToProfileClicked(result.childKey)
        break
      case SEARCH_CATEGORIES.MEMOS:
        this.props.onOpenMemoClicked(result.childKey)
        break
      default:
        break
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    if (value.length < 1) return this.resetComponent()

    let { source } = this.props

    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)

    const filteredResults = _.reduce(
      source,
      (result, data, name) => {
        const results = _.filter(data.results, isMatch)
        if (results.length) result[name] = { name, results } // eslint-disable-line no-param-reassign

        return result
      },
      {}
    )

    this.setState({
      isLoading: false,
      results: filteredResults
    })
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
