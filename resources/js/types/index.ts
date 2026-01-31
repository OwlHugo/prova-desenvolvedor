export interface PageProps {
    flash: {
        message?: string;
        success?: string;
        error?: string;
    };
    name: string;
}

export interface Curso {
    id: number;
    codigo: string;
    nome: string;
    created_at: string;
    updated_at: string;
    alunos_count?: number;
}

export interface Aluno {
    id: number;
    matricula: string;
    nome: string;
    curso_id: number;
    endereco: string | null;
    created_at: string;
    updated_at: string;
    curso?: Curso;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface CursoFilters {
    codigo?: string;
    nome?: string;
}

export interface AlunoFilters {
    matricula?: string;
    nome?: string;
    curso_id?: string;
    endereco?: string;
}
