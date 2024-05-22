import { Timestamp } from 'firebase/firestore';

export interface ChatMessage {
    id: string
    conversation_id: number,
    user_id: number,
    message: string,
    created_at: Timestamp,
}