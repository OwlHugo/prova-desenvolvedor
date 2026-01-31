import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { FormEvent } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Aluno, AlunoFilters, Curso, PaginatedData } from '../../types';

interface Props {
    alunos: PaginatedData<Aluno>;
    cursos: Curso[];
    filters: AlunoFilters;
}

export default function AlunosIndex({ alunos, cursos, filters }: Props) {
    const { data, setData, get } = useForm<AlunoFilters>({
        matricula: filters.matricula || '',
        nome: filters.nome || '',
        curso_id: filters.curso_id || '',
        endereco: filters.endereco || '',
    });

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        get('/alunos', { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
            router.delete(`/alunos/${id}`);
        }
    };

    return (
        <MainLayout title="Alunos">
            <Head title="Alunos" />

            <div className="mb-6">
                <Link href="/alunos/create">
                    <Button>
                        <Plus className="h-4 w-4" />
                        Novo Aluno
                    </Button>
                </Link>
            </div>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <form onSubmit={handleFilter} className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 space-y-2">
                            <Label>Matrícula</Label>
                            <Input
                                value={data.matricula}
                                onChange={(e) => setData('matricula', e.target.value)}
                                placeholder="Filtrar"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label>Nome</Label>
                            <Input
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                placeholder="Filtrar"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <Label className="mb-2">Curso</Label>
                            <Select value={data.curso_id} onValueChange={(value) => setData('curso_id', value)}>
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {cursos.map((curso) => (
                                        <SelectItem key={curso.id} value={String(curso.id)}>{curso.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit">
                            <Search className="h-4 w-4" />
                            Filtrar
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Matrícula</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Curso</TableHead>
                                <TableHead>Endereço</TableHead>
                                <TableHead className="w-32">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alunos.data.map((aluno) => (
                                <TableRow key={aluno.id}>
                                    <TableCell className="font-medium">{aluno.matricula}</TableCell>
                                    <TableCell>{aluno.nome}</TableCell>
                                    <TableCell>{aluno.curso?.nome || '-'}</TableCell>
                                    <TableCell className="max-w-xs truncate">{aluno.endereco || '-'}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Link href={`/alunos/${aluno.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(aluno.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {alunos.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-2">
                            {alunos.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active ? 'bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200'
                                    } ${!link.url ? 'opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                    <div className="mt-4 text-sm text-slate-500 text-center">
                        Mostrando {alunos.from} a {alunos.to} de {alunos.total} registros
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
