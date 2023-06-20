import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptypes'
import styles from './taskList.module.scss'
import PropTypes from 'prop-types'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}
TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes),
  handleDoneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } =
    props

  const onChangeCheckbox =
    (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(idTodo, event.target.checked)
    }
  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>
        {doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}
      </h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckBox}
              checked={todo.done}
              onChange={onChangeCheckbox(todo.id)}
            />
            <span className={styles.taskName}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => startEditTodo(todo.id)}
              >
                Edit
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
