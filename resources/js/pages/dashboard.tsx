import { Head } from '@inertiajs/react';
import { BookOpen, Users } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function Dashboard() {
    return (
        <MainLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-slate-900">Cursos</h3>
                            <p className="text-sm text-slate-500">Gerenciar cursos</p>
                        </div>
                    </div>
                    <a
                        href="/cursos"
                        className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Acessar cursos →
                    </a>
                </div>

                <div className="card">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-slate-900">Alunos</h3>
                            <p className="text-sm text-slate-500">Gerenciar alunos</p>
                        </div>
                    </div>
                    <a
                        href="/alunos"
                        className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                        Acessar alunos →
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
