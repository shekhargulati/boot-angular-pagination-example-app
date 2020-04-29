export interface TodoListResponse {
    content: Todo[];
    totalElements: number;
}
export interface Todo{
    id: number;
    task: string;
    done: boolean
}
