import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import AddTaskForm from './AddTaskForm'

// Mock the `useMutation` hook from RedwoodJS
jest.mock('@redwoodjs/web', () => {
  const originalModule = jest.requireActual('@redwoodjs/web')
  return {
    __esModule: true,
    ...originalModule,
    useMutation: jest.fn(() => [() => Promise.resolve({ data: { createTask: { id: 1 } } })])
  }
})

describe('AddTaskForm', () => {
  it('renders successfully', () => {
    render(<AddTaskForm />)
    expect(screen.getByText('Add Task')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
  })

  it('allows entering task details', () => {
    render(<AddTaskForm />)
    const taskNameInput = screen.getByPlaceholderText('Task Name')
    const descriptionInput = screen.getByPlaceholderText('Description')
    fireEvent.change(taskNameInput, { target: { value: 'New Task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Task Description' } })

    expect(taskNameInput.value).toBe('New Task')
    expect(descriptionInput.value).toBe('Task Description')
  })

  it('submits the form', () => {
    render(<AddTaskForm />)
    const submitButton = screen.getByText('Add Task')
    fireEvent.click(submitButton)
 
  })

})
