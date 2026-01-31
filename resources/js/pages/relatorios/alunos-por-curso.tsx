import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { BarChart3 } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';

interface CursoStats {
    id: number;
    codigo: string;
    nome: string;
    quantidade_alunos: number;
}

interface Props {
    cursos: CursoStats[];
    totalAlunos: number;
}

export default function AlunosPorCurso({ cursos, totalAlunos }: Props) {
    const maxAlunos = Math.max(...cursos.map((c) => c.quantidade_alunos), 1);

    return (
        <MainLayout title="Relatório: Alunos por Curso">
            <Head title="Alunos por Curso" />

            <div className="mb-6 flex gap-4">
                <Link href="/relatorios/alunos-por-curso">
                    <Button>Alunos por Curso</Button>
                </Link>
                <Link href="/relatorios/alunos-agrupados">
                    <Button variant="secondary">Alunos Agrupados</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <BarChart3 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total de Alunos</p>
                                <p className="text-2xl font-bold">{totalAlunos}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-full">
                                <BarChart3 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Total de Cursos</p>
                                <p className="text-2xl font-bold">{cursos.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quantitativo de Alunos por Curso</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cursos.map((curso) => (
                            <div key={curso.id} className="flex items-center gap-4">
                                <div className="w-48 flex-shrink-0">
                                    <p className="font-medium truncate">{curso.nome}</p>
                                    <p className="text-sm text-slate-500">{curso.codigo}</p>
                                </div>
                                <div className="flex-1">
                                    <div className="h-8 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full transition-all"
                                            style={{ width: `${(curso.quantidade_alunos / maxAlunos) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="w-20 text-right font-semibold">{curso.quantidade_alunos} alunos</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
