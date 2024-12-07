export interface RollResponse {
    message: string
    result: number
}

export interface RollRequest {
    sides: number
    advantage?: boolean
    disadvantage?: boolean
    modifiers?: string[]
}

export async function rollDice(data: RollRequest): Promise<RollResponse> {
    const response = await fetch('http://localhost:8080/roll',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok){
        throw new Error('Failed to roll dice')
    }
    const result: RollResponse = await response.json()
    return result;
}