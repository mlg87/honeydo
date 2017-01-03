import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Measure from 'react-measure'

export class MultiSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: [],
      formWidth: null,
      submitWidth: null
    }
    // defined here bc form is pure react
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    // init select & bind onchange bc the materialize select
    // adds some shit to the dom outside of react
    $(this.refs.multiSelect).material_select()
  }

  // handleChange(e) {
  //   console.log('dafuq is e', e);
  //   console.log('dafuq is this', this);
  //   console.log('args', arguments);
  //   const val = $(this.refs.multiSelect).val()
  //   console.log('val', val);
  //   return
  //   this.setState({value: e.target.value})
  //   if (this.props.onChange) {
  //     this.props.onChange(this.state.value)
  //   }
  // }

  getSubmitStyle() {
    return {
      left: (this.state.formWidth - this.state.submitWidth) + 'px'
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const val = $(this.refs.multiSelect).val()
    this.props.onSubmit(val)
    // clear the form
    $(this.refs.multiSelect).material_select()
    ReactDOM.findDOMNode(this.refs.multiSelect).value = ''
  }


  render() {
    return (
      <Measure onMeasure={(dimensions) => this.setState({formWidth: dimensions.width})}>

        <form onSubmit={ this.onSubmit }>

          <div className='input-field'>

            {/* HACK: warning message if this doesnt have readOnly on it. useing jankQuery to get values on submit (i know, its bad) */}
            <select
              multiple
              value={ this.state.value }
              readOnly
              ref='multiSelect'
              >

              <option value='' disabled>{ this.props.placeholder }</option>

              { this.props.options.map((option) =>
                <option key={ option.value } value={ option.value }>{ option.placeholder }</option>
              )}

            </select>

            <label>{ this.props.label }</label>

          </div>

          <Measure onMeasure={(dimensions) => this.setState({submitWidth: dimensions.width})}>

            <input
              type='submit'
              value={ this.props.submitPrompt }
              className='btn-flat btn-flat-standard no-focus-state relative'
              style={ this.getSubmitStyle() }
              />

          </Measure>

        </form>

      </Measure>
    )
  }
}
