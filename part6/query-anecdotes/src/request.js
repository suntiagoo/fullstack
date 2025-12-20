const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch Anecdotes')
    }
    return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseUrl, options)


    if (!response.ok) {
        const { error } = await response.json()
        throw new Error(`Failed to create Anecdote - ${error}`)

    }

    return await response.json()
}

export const updateAnecdote = async (newObject) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObject)
    }
    const response = await fetch(`${baseUrl}/${newObject.id}`, options)

    if (!response.ok) {
        throw new Error('Failed to update Anecdote')
    }

    return await response.json()
}

export default { getAnecdotes, createAnecdote }