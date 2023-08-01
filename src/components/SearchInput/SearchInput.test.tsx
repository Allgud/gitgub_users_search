import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";
import SearchInput from ".";

const onSearchClick = jest.fn()
const onChange = jest.fn()

describe('Testing Searchinput component', () => {
  test('Render input', () => {
    render(
      <SearchInput
        onSearchClick={onSearchClick}
        text=''
        onTextChange={onChange}
      />)
    const input = screen.getByPlaceholderText(/поиск/i)
    expect(input).toBeInTheDocument()
  })

  test('onChange works', () => {
    render(
      <SearchInput
        onSearchClick={onSearchClick}
        text=''
        onTextChange={onChange}
      />)
    
    userEvent.type(screen.getByRole('textbox'), 'Allgud')

    expect(onChange).toHaveBeenCalledTimes(6)
  })

})