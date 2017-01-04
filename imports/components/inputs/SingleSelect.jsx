import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export class SingleSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
    // defined here bc form is pure react
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // init select
    $(this.refs.singleSelect).material_select()
    // HACK: since the materialize select adds a bunch of shit to
    // the DOM, need to add an event listener using jankQuery
    $(ReactDOM.findDOMNode(this.refs.singleSelect)).on('change', this.handleChange)
    // HACK: set the default value to the first el in the arr
    // (options will be in the same order)
    this.props.onSingleSelectMount()
  }

  handleChange() {
    // HACK: have to get the val using jankQuery bc of materialize
    const val = $(this.refs.singleSelect).val()
    this.props.onChange(val)
    // clear the form
    $(this.refs.singleSelect).material_select()
    ReactDOM.findDOMNode(this.refs.singleSelect).value = ''
  }


  render() {
    return (
      <div className='input-field'>

        {/* HACK: warning message if this doesnt have readOnly on it. useing jankQuery to get values on submit (i know, its bad) */}
        <select
          value={ this.state.value }
          readOnly
          ref='singleSelect'
          >

          { this.props.options.map((option) =>
            <option key={ option.value } value={ option.value }>{ option.placeholder }</option>
          )}

        </select>

        <label>{ this.props.label }</label>

      </div>
    )
  }
}
