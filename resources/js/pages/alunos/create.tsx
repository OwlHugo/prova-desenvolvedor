import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Curso } from '../../types';

interface Props {
    cursos: Curso[];
}

export default function AlunoCreate({ cursos }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        matricula: '',
        nome: '',
        curso_id: '',
        endereco: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/alunos');
    };

    return (
        <MainLayout title="Novo Aluno">
            <Head title="Novo Aluno" />
            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Cadastrar Aluno</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Matrícula *</Label>
                                <Input
                                    value={data.matricula}
                                    onChange={(e) => setData('matricula', e.target.value)}
                                    placeholder="Ex: MAT00001"
                                    error={errors.matricula}
                                />
                                {errors.matricula && <p className="text-red-500 text-sm">{errors.matricula}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Nome *</Label>
                                <Input
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    placeholder="Nome do aluno"
                                    error={errors.nome}
                                />
                                {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Curso *</Label>
                                <Select value={data.curso_id} onValueChange={(value) => setData('curso_id', value)}>
                                    <SelectTrigger className={errors.curso_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Selecione um curso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cursos.map((curso) => (
                                            <SelectItem key={curso.id} value={String(curso.id)}>{curso.nome}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.curso_id && <p className="text-red-500 text-sm">{errors.curso_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Endereço</Label>
                                <Input
                                    value={data.endereco}
                                    onChange={(e) => setData('endereco', e.target.value)}
                                    placeholder="Endereço do aluno"
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Salvar'}
                                </Button>
                                <Link href="/alunos">
                                    <Button variant="secondary" type="button">Cancelar</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
