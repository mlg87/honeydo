import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
// collections
import { Tasks } from '../api/tasks'
import { Lists } from '../api/lists'
import { UserActivities } from '../api/userActivities'
// components
import Task from './Task'
import { SingleSelect } from '../components/inputs/SingleSelect'

// App component - represents the whole app
class TaskBoard extends Component {
  // need to set the state first
  constructor(props) {
    super(props)

    this.state = {
      hideCompleted: false,
      selectedList: new ReactiveVar()
    }

    this.onSingleSelectMount = this.onSingleSelectMount.bind(this)
  }

  componentWillUnmount() {
    // reset the listId session var
    Session.set('listId', null)
  }

  handleSubmit(e) {
    e.preventDefault()

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

    // dont use arrow function here b/c we dont want it to bind
    // to react
    Meteor.call('tasks.insert', text, Session.get('listId'), function(err, id) {
      if (err) {
        alert(err.reason.reason)
      }
    })

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }

  removedCompleted() {
    Meteor.call('lists.cleanList', Session.get('listId'), (err) => {
      if (err) {
        alert(err)
      }
    })
  }

  // get the tasks on the dom
  renderTasks() {
    let filteredTasks = this.props.tasks
    // if hideCompleted is selected, only show incomplete tasks
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.isChecked)
    }
    return filteredTasks.map((task) => (
      <Task key={ task._id } task={ task } />
    ))
  }

  // list select nonsense
  getListSelectOptions() {
    const lists = this.props.lists
    return lists.map((list) => {
      return {
        value: list._id,
        placeholder: list.name
      }
    })
  }

  onSingleSelectMount() {
    // this is fucking hacky
    Session.set('listId', this.props.lists[0]._id)
  }

  render() {
    const completedPrompt = this.state.hideCompleted ? 'Show' : 'Hide'

    return (
      <div>
        { this.props.currentUser ?
          <header>
            { this.props.isLoadingLists ?
              <p>fetching lists...</p> :
              <SingleSelect
                options={ this.getListSelectOptions() }
                label='List'
                onChange={ this.props.setListId }
                onSingleSelectMount={ this.onSingleSelectMount }
              />
            }
            <h1>Tasks To Complete ({ this.props.incompleteCount })</h1>
            <div className='list-options'>
              <label className='clickable'>
                <input
                  className="hidden"
                  type="checkbox"
                  readOnly
                  checked={ this.state.hideCompleted }
                  onClick={ this.toggleHideCompleted.bind(this) }
                  />
                { completedPrompt } Completed
              </label>
              <span> | </span>
              <span
                className='clickable'
                onClick={ this.removedCompleted.bind(this) }>
                Remove Completed
              </span>
            </div>
            {/* events are handled in React by listening directly on the html comp */}
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="+ Type to add new tasks"
                />
            </form>
          </header>
          :
          <header>
            <h1>Sign in or create an account to bang out some tasks...</h1>
          </header>
        }
        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    )
  }
}

TaskBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  isLoadingLists: PropTypes.bool,
  isLoadingTasks: PropTypes.bool
}

export default TaskBoardContainer = createContainer(({ params }) => {
  const listSubscription = Meteor.subscribe('lists')
  const isLoadingLists = !listSubscription.ready()
  const taskSubscription = Meteor.subscribe('tasks')
  const isLoadingTasks = !taskSubscription.ready()

  const setListId = (listId) => {
    Session.set('listId', listId)
  }

  const taskQuery = {
    listId: Session.get('listId')
  }
  const tasks = Tasks.find(taskQuery, {sort: {createdAt: -1}}).fetch()
  const incompleteCount = Tasks.find(_.assignIn(taskQuery, {isChecked: {$ne: true}})).count()

  const listQuery = {
    'users.userId': {
      $in: [Meteor.userId()]
    }
  }
  const lists = Lists.find(listQuery).fetch()

  return {
    currentUser: Meteor.user(),
    tasks,
    lists,
    incompleteCount,
    setListId,
    isLoadingLists,
    isLoadingTasks
  }
}, TaskBoard)
