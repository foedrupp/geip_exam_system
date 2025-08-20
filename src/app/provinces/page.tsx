'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Province } from '@/data/moeys-data';
import { provinces } from '@/data/moeys-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MapPin, Search, ArrowLeft, Home } from 'lucide-react';

export default function ProvincesPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProvinces = useMemo(() => {
        if (!searchQuery) {
            return provinces;
        }
        return provinces.filter(
            (province) =>
                province.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                province.name_km.includes(searchQuery) ||
                province.id.toString().includes(searchQuery)
        );
    }, [searchQuery]);

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            {/* Header */}
            <header className="bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center space-x-4">
                            <Link href="/welcome">
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
                <div className="w-full max-w-5xl">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary text-center text-3xl mb-2">
                                ជ្រើសរើសខេត្តរបស់អ្នក
                            </CardTitle>
                            <p className="text-center text-muted-foreground text-lg">
                                ជ្រើសរើសខេត្តដែលអ្នកចង់ប្រឡងតេស្ត
                            </p>
                            <div className="relative mt-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="ស្វែងរកខេត្ត ឬលេខខេត្ត..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 h-12 text-lg"
                                    aria-label="Search province"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100dvh-22rem)]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredProvinces.map((province) => (
                                        <Button
                                            key={province.name}
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="h-auto p-6 justify-start transition-all duration-200 hover:bg-primary/10 hover:shadow-md hover:scale-105"
                                        >
                                            <Link href={`/subjects/${encodeURIComponent(province.name)}`}>
                                                <div className="flex items-center w-full">
                                                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                                                        {province.id}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-body font-bold text-lg">{province.name_km}</div>
                                                        <div className="text-sm text-muted-foreground">{province.name}</div>
                                                    </div>
                                                    <MapPin className="h-5 w-5 text-primary ml-2 flex-shrink-0" />
                                                </div>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
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
