import UserList from "@/app/modules/users/UserList";
import { test, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

test('UserList displays user data correctly', async () => {
    const users = [
        {
            id: 1,
            name: 'John Doe',
            city: 'New York',
            country: 'USA',
            favorite_sport: 'Basketball',
        }
    ]
    render(<UserList users={users} />)
    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('New York, USA')).toBeInTheDocument()
        expect(screen.getByText('Favorite Sport: Basketball')).toBeInTheDocument()
    })
})