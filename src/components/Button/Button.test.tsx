import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Button from ".";

const onClick = jest.fn()

describe('Render elements', () => {
  test('Render button', () => {
    render(<Button text="Найти" onClick={onClick} />)
    const btn = screen.getByRole('button')
    const text = screen.getByText(/найти/i)
    expect(btn).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })
})

