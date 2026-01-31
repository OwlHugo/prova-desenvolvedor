import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link } from '@inertiajs/react';
import { Users } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

interface AlunoInfo {
    id: number;
    matricula: string;
    nome: string;
    endereco: string | null;
}

interface CursoComAlunos {
    id: number;
    codigo: string;
    nome: string;
    alunos: AlunoInfo[];
}

interface Props {
    cursosComAlunos: CursoComAlunos[];
}

export default function AlunosAgrupados({ cursosComAlunos }: Props) {
    return (
        <MainLayout title="Relatório: Alunos Agrupados por Curso">
            <Head title="Alunos Agrupados" />

            <div className="mb-6 flex gap-4">
                <Link href="/relatorios/alunos-por-curso">
                    <Button variant="secondary">Alunos por Curso</Button>
                </Link>
                <Link href="/relatorios/alunos-agrupados">
                    <Button>Alunos Agrupados</Button>
                </Link>
            </div>

            <div className="space-y-6">
                {cursosComAlunos.map((curso) => (
                    <Card key={curso.id}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle>{curso.nome}</CardTitle>
                                    <p className="text-sm text-slate-500">
                                        {curso.codigo} - {curso.alunos.length} alunos
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {curso.alunos.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Matrícula</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Endereço</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {curso.alunos.map((aluno) => (
                                            <TableRow key={aluno.id}>
                                                <TableCell className="font-medium">{aluno.matricula}</TableCell>
                                                <TableCell>{aluno.nome}</TableCell>
                                                <TableCell className="text-slate-600">{aluno.endereco || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-slate-500 text-center py-4">Nenhum aluno matriculado neste curso.</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </MainLayout>
    );
}
