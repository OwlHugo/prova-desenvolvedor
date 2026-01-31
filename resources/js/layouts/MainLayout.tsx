import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FileText, GraduationCap, Home, Users } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { PageProps } from '../types';

interface MainLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
    const { flash, name } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const navigation = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Cursos', href: '/cursos', icon: BookOpen },
        { name: 'Alunos', href: '/alunos', icon: Users },
        { name: 'Relatórios', href: '/relatorios/alunos-por-curso', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-semibold text-slate-900">
                                {name || 'Prova Full Stack'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)] border-r border-slate-200">
                    <nav className="mt-5 px-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors mb-1"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}

                        {/* Sub-menu de Relatórios */}
                        <div className="ml-8 mt-1">
                            <Link
                                href="/relatorios/alunos-por-curso"
                                className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Alunos por Curso
                            </Link>
                            <Link
                                href="/relatorios/alunos-agrupados"
                                className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                Alunos Agrupados
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-8">
                    {title && (
                        <h1 className="text-2xl font-bold text-slate-900 mb-6">{title}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
