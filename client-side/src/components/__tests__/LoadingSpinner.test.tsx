import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('generic')
    expect(spinner).toBeInTheDocument()
  })

  it('displays message when provided', () => {
    const testMessage = 'Loading data...'
    render(<LoadingSpinner message={testMessage} />)
    
    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = document.querySelector('[class*="w-5 h-5"]')
    expect(spinner).toBeInTheDocument()

    rerender(<LoadingSpinner size="lg" />)
    spinner = document.querySelector('[class*="w-12 h-12"]')
    expect(spinner).toBeInTheDocument()
  })

  it('renders as overlay when overlay prop is true', () => {
    render(<LoadingSpinner overlay={true} message="Loading..." />)
    
    const overlay = document.querySelector('.fixed.inset-0')
    expect(overlay).toBeInTheDocument()
    expect(overlay).toHaveClass('bg-black', 'bg-opacity-50')
  })

  it('applies custom className', () => {
    const customClass = 'custom-spinner-class'
    render(<LoadingSpinner className={customClass} />)
    
    const spinner = document.querySelector(`.${customClass}`)
    expect(spinner).toBeInTheDocument()
  })
})