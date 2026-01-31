import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Curso } from '../../types';

interface Props {
    curso: Curso;
}

export default function CursoEdit({ curso }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        codigo: curso.codigo,
        nome: curso.nome,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/cursos/${curso.id}`);
    };

    return (
        <MainLayout title="Editar Curso">
            <Head title="Editar Curso" />

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Editar Curso</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Código *</Label>
                                <Input
                                    value={data.codigo}
                                    onChange={(e) => setData('codigo', e.target.value)}
                                    error={errors.codigo}
                                />
                                {errors.codigo && <p className="text-red-500 text-sm">{errors.codigo}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Nome *</Label>
                                <Input
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    error={errors.nome}
                                />
                                {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Salvar'}
                                </Button>
                                <Link href="/cursos">
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
