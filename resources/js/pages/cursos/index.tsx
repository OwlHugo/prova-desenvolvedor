import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { FormEvent } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Curso, CursoFilters, PaginatedData } from '../../types';

interface Props {
    cursos: PaginatedData<Curso>;
    filters: CursoFilters;
}

export default function CursosIndex({ cursos, filters }: Props) {
    const { data, setData, get } = useForm<CursoFilters>({
        codigo: filters.codigo || '',
        nome: filters.nome || '',
    });

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        get('/cursos', { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este curso?')) {
            router.delete(`/cursos/${id}`);
        }
    };

    return (
        <MainLayout title="Cursos">
            <Head title="Cursos" />

            <div className="mb-6">
                <Link href="/cursos/create">
                    <Button>
                        <Plus className="h-4 w-4" />
                        Novo Curso
                    </Button>
                </Link>
            </div>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <form onSubmit={handleFilter} className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 space-y-2">
                            <Label>Código</Label>
                            <Input
                                value={data.codigo}
                                onChange={(e) => setData('codigo', e.target.value)}
                                placeholder="Filtrar por código"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label>Nome</Label>
                            <Input
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                placeholder="Filtrar por nome"
                            />
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
                                <TableHead>Código</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Qtd. Alunos</TableHead>
                                <TableHead className="w-32">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cursos.data.map((curso) => (
                                <TableRow key={curso.id}>
                                    <TableCell className="font-medium">{curso.codigo}</TableCell>
                                    <TableCell>{curso.nome}</TableCell>
                                    <TableCell>{curso.alunos_count || 0}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Link href={`/cursos/${curso.id}/edit`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(curso.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {cursos.last_page > 1 && (
                        <div className="mt-4 flex justify-center gap-2">
                            {cursos.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${
                                        link.active ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-4 text-sm text-slate-500 text-center">
                        Mostrando {cursos.from} a {cursos.to} de {cursos.total} registros
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
