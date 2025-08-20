'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Calculator, Atom, BookOpen, ExternalLink } from 'lucide-react';
import { provinces, subjects, googleFormLinks } from '@/data/moeys-data';

export default function SubjectsPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const provinceName = decodeURIComponent(params.province as string);
    const province = provinces.find(p => p.name === provinceName);

    if (!province) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">ខេត្តមិនត្រូវ</h1>
                    <Link href="/provinces">
                        <Button>ត្រឡប់ទៅជ្រើសរើសខេត្ត</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubjectClick = (subjectName: string) => {
        const linkKey = `${province.name}-${subjectName}`;
        const googleFormLink = googleFormLinks[linkKey];

        if (googleFormLink) {
            // Navigate to the exam page with the Google Form
            router.push(`/exam/${encodeURIComponent(province.name)}/${encodeURIComponent(subjectName)}`);
        } else {
            alert('Google Form link is not available yet. Please contact administrator.');
        }
    };

    const getSubjectIcon = (subjectName: string) => {
        switch (subjectName) {
            case 'Mathematics':
                return <Calculator className="w-8 h-8 text-blue-600" />;
            case 'Physics':
                return <Atom className="w-8 h-8 text-green-600" />;
            case 'Khmer Language':
                return <BookOpen className="w-8 h-8 text-purple-600" />;
            default:
                return <BookOpen className="w-8 h-8 text-gray-600" />;
        }
    };

    const getSubjectColor = (subjectName: string) => {
        switch (subjectName) {
            case 'Mathematics':
                return 'hover:bg-blue-50 border-blue-200 hover:border-blue-300';
            case 'Physics':
                return 'hover:bg-green-50 border-green-200 hover:border-green-300';
            case 'Khmer Language':
                return 'hover:bg-purple-50 border-purple-200 hover:border-purple-300';
            default:
                return 'hover:bg-gray-50 border-gray-200 hover:border-gray-300';
        }
    };

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            {/* Header */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center space-x-4">
                            <Link href="/provinces">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    ត្រឡប់
                                </Button>
                            </Link>
                            <Link href="/welcome">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                    <Home className="h-4 w-4 mr-2" />
                                    ទំព័រដើម
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src="https://admin.fedrupp.org/images/1754726994.png"
                                alt="MoEYS Logo"
                                width={80}
                                height={80}
                                className="h-20 w-auto"
                                priority
                            />
                        </div>
                        <div className="w-32"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-4xl">
                    <Card className="shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="font-headline text-primary text-3xl mb-2">
                                ជ្រើសរើសមុខវិជ្ជា
                            </CardTitle>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    {province.name_km}
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    {province.name}
                                </p>
                            </div>
                            <p className="text-muted-foreground text-lg mt-4">
                                ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡងតេស្ត
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {subjects.map((subject) => {
                                    const linkKey = `${province.name}-${subject.name}`;
                                    const googleFormLink = googleFormLinks[linkKey];
                                    const hasLink = !!googleFormLink;

                                    return (
                                        <Card
                                            key={subject.name}
                                            className={`transition-all duration-300 transform hover:scale-105 cursor-pointer ${getSubjectColor(subject.name)} ${hasLink ? 'hover:shadow-lg' : 'opacity-60'
                                                }`}
                                            onClick={() => hasLink && handleSubjectClick(subject.name)}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <div className="flex justify-center mb-4">
                                                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center">
                                                        {getSubjectIcon(subject.name)}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground mb-2">
                                                    {subject.name_km}
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    {subject.name}
                                                </p>
                                                {hasLink ? (
                                                    <Button
                                                        className="w-full"
                                                        onClick={() => handleSubjectClick(subject.name)}
                                                        disabled={isLoading === subject.name}
                                                    >
                                                        {isLoading === subject.name ? (
                                                            'កំពុងផ្ទុក...'
                                                        ) : (
                                                            <>
                                                                ចាប់ផ្ដើមប្រឡងតេស្ត
                                                                <ExternalLink className="ml-2 h-4 w-4" />
                                                            </>
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <Button variant="outline" className="w-full" disabled>
                                                        កំពុងរៀបចំ
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Instructions */}
                            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                                    ការណែនាំ
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                                        <span>ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡង</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                                        <span>ចាប់ផ្ដើមប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                                        <span>ឆ្លើយសំណួរទាំងអស់ និងដាក់ស្នើចម្លើយ</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
