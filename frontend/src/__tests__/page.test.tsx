import Home from '../app/page'
import { test, expect } from 'vitest'
import { render, screen, waitFor, renderHook, act  } from '@testing-library/react'
import '@testing-library/jest-dom'


describe('Home Page', () => {
    test('Page renders correctly', () => {
        render(<Home />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('Page handles empty user list', async () => {
        render(<Home />)
        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
        })
    })

    test ('Page displays not found message', async () => {
        render(<Home />)
        await waitFor(() => {
            expect(screen.getByText('There are no users available at the moment.')).toBeInTheDocument()
        })
    })
})


