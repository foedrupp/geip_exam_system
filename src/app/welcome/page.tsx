'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Globe, Award } from 'lucide-react';

export default function WelcomePage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleStartExam = () => {
        setIsLoading(true);
        // Navigate to province selection
        window.location.href = '/provinces';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="https://admin.fedrupp.org/images/1754726994.png"
                            alt="MoEYS Logo"
                            width={120}
                            height={120}
                            className="h-24 w-auto"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        ប្រឡងតេស្តស្ដង់ដារ MoEYS EdTech
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        ប្រឡងតេស្តស្ដង់ដារ MoEYS EdTech តាម online សម្រាប់សិស្សានុសិស្ស
                    </p>
                </header>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                                ស្វាគមន៍មកកាន់ប្រព័ន្ធប្រឡងតេស្ត
                            </CardTitle>
                            <p className="text-lg text-gray-600">
                                ជ្រើសរើសខេត្ត និងមុខវិជ្ជាដើម្បីចាប់ផ្ដើមប្រឡងតេស្ត
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Features */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Globe className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">ខេត្តទាំង ២៥</h3>
                                    <p className="text-gray-600">ជ្រើសរើសខេត្តរបស់អ្នក</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">មុខវិជ្ជា ៣</h3>
                                    <p className="text-gray-600">គណិតវិទ្យា រូបវិទ្យា ភាសាខ្មែរ</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Award className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">ប្រឡងតេស្ត Online</h3>
                                    <p className="text-gray-600">ប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</p>
                                </div>
                            </div>

                            {/* Start Button */}
                            <div className="text-center">
                                <Button
                                    onClick={handleStartExam}
                                    disabled={isLoading}
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    {isLoading ? 'កំពុងផ្ទុក...' : 'ចាប់ផ្ដើមប្រឡងតេស្ត'}
                                </Button>
                            </div>

                            {/* Instructions */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                                    ការណែនាំ
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                                        <span>ជ្រើសរើសខេត្តរបស់អ្នក</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                                        <span>ជ្រើសរើសមុខវិជ្ជាដែលអ្នកចង់ប្រឡង</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                                        <span>ចាប់ផ្ដើមប្រឡងតេស្តតាមប្រព័ន្ធប្រឡងគម្រោង GEIP</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <footer className="text-center mt-12 text-gray-500">
                    <p>&copy; {new Date().getFullYear()} MoEYS EdTech. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
