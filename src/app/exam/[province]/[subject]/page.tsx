'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, AlertCircle, ExternalLink } from 'lucide-react';
import { provinces, subjects, googleFormLinks } from '@/data/moeys-data';

export default function ExamPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const provinceName = decodeURIComponent(params.province as string);
    const subjectName = decodeURIComponent(params.subject as string);

    const province = provinces.find(p => p.name === provinceName);
    const subject = subjects.find(s => s.name === subjectName);
    const linkKey = `${provinceName}-${subjectName}`;
    const googleFormLink = googleFormLinks[linkKey];

    useEffect(() => {
        if (!province || !subject) {
            setError('Invalid province or subject');
            setIsLoading(false);
            return;
        }

        if (!googleFormLink) {
            setError('Google Form link is not available yet. Please contact administrator.');
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    }, [province, subject, googleFormLink]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">កំពុងផ្ទុក...</p>
                </div>
            </div>
        );
    }

    if (error || !province || !subject || !googleFormLink) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md mx-4">
                    <CardHeader className="text-center">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-xl text-red-600">មានបញ្ហា</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground mb-6">{error || 'Google Form link is not available'}</p>
                        <div className="space-y-3">
                            <Link href={`/subjects/${encodeURIComponent(provinceName)}`}>
                                <Button className="w-full">ត្រឡប់ទៅជ្រើសរើសមុខវិជ្ជា</Button>
                            </Link>
                            <Link href="/provinces">
                                <Button variant="outline" className="w-full">ត្រឡប់ទៅជ្រើសរើសខេត្ត</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            {/* Header */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link href={`/subjects/${encodeURIComponent(provinceName)}`}>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 sm:px-4 py-2 sm:py-2 min-h-[40px] sm:min-h-[36px] text-sm sm:text-base">
                                    <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">ត្រឡប់</span>
                                </Button>
                            </Link>
                            <Link href="/welcome">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 sm:px-4 py-2 sm:py-2 min-h-[40px] sm:min-h-[36px] text-sm sm:text-base">
                                    <Home className="h-4 w-4 mr-1 sm:mr-2" />
                                    <span className="hidden sm:inline">ទំព័រដើម</span>
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src="/moeys-logo.png"
                                alt="MoEYS Logo"
                                width={60}
                                height={60}
                                className="h-15 w-auto"
                                priority
                            />
                        </div>
                        <div className="w-32"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            {/* Exam Info */}
            <div className="bg-blue-50 border-b border-blue-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-blue-900 mb-2">
                            ប្រឡងតេស្ត {subject.name_km}
                        </h1>
                        <p className="text-blue-700">
                            ខេត្ត: {province.name_km} ({province.name})
                        </p>
                        <p className="text-blue-600 text-sm mt-1">
                            មុខវិជ្ជា: {subject.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Google Form Embed */}
            <main className="flex-1 container mx-auto p-4">
                <Card className="shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-center text-xl">
                            ប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP
                        </CardTitle>
                        <div className="text-center">
                            <a
                                href={googleFormLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                            >
                                បើកក្នុងផ្ទាំងថ្មី
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="w-full h-[calc(100vh-300px)] min-h-[600px]">
                            <iframe
                                src={googleFormLink}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                title={`Exam for ${subject.name} in ${province.name}`}
                                className="rounded-b-lg"
                            >
                                <p>Your browser does not support iframes.
                                    <a href={googleFormLink} target="_blank" rel="noopener noreferrer">
                                        Click here to open the exam in a new tab
                                    </a>
                                </p>
                            </iframe>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="py-4 text-center bg-gray-50 border-t">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
