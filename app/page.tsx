import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import { CalendarDays, Clock4, HandshakeIcon, ThumbsUp, CheckCircle } from 'lucide-react';
import {Card, CardContent} from "@/components/ui/card"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[#ccc9c2] py-16">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            Discover a world of possibilities: activities for children in our center!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We invite you and your children to our Open Days! This is a great opportunity to learn more
                            about our programs, meet teachers, and see how we conduct classes.
                        </p>
                        <Button asChild>
                            <Link href="/contacts">Contact Us</Link>
                        </Button>
                    </div>
                    <div className="relative h-[400px]">
                        <Image
                            src="/childrens.png"
                            alt="Children activities"
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-[#FFE4D6]">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                                <p>Medical consultations and support for children</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#FFD6E6]">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Entertaining Science</h3>
                                <p>Fun and educational science activities</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#E6D6FF]">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Sports Games</h3>
                                <p>Physical activities and sports training</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">1,000+</h3>
                            <p className="text-gray-600">Lives Transformed</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold mb-2">95%</h3>
                            <p className="text-gray-600">Client Satisfaction</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Top 10</h3>
                            <p className="text-gray-600">Mental Health Center</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Days Section */}
            <section className="border-t bg-gray-50/50">
                <div className="container py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Open Days</h2>
                    <p className="text-center text-gray-500 mb-12">
                        We invite you and your children to our Open Days! This is a great opportunity to learn more
                        about our programs,
                        meet teachers, and see how we conduct classes.
                    </p>
                    <div className="grid gap-6">
                        {[
                            {
                                title: "Healthcare Consultation",
                                category: "Healthcare",
                                date: "12.10.2024",
                                time: "01:00 PM",
                            },
                            {
                                title: "Entertaining Science",
                                category: "English Training",
                                date: "12.10.2024",
                                time: "01:00 PM",
                            },
                            {
                                title: "Sports Games",
                                category: "Football",
                                date: "12.10.2024",
                                time: "01:00 PM",
                            },
                        ].map((event) => (
                            <Card key={event.title}>
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <CalendarDays className="h-6 w-6 text-primary"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{event.title}</h3>
                                            <p className="text-sm text-gray-500">{event.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-semibold">{event.date}</p>
                                            <p className="text-sm text-gray-500">{event.time}</p>
                                        </div>
                                        <Button variant="outline">FREE</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="border-t">
                <div className="container py-12">
                    <h2 className="text-3xl font-bold text-center mb-12">Our advantages</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <Clock4 className="h-6 w-6 text-primary"/>
                                <div>
                                    <h3 className="font-semibold">24/7 support</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <HandshakeIcon className="h-6 w-6 text-primary"/>
                                <div>
                                    <h3 className="font-semibold">Courteous staff</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <ThumbsUp className="h-6 w-6 text-primary"/>
                                <div>
                                    <h3 className="font-semibold">Best reviews</h3>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3 mt-12">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold">1,000+</h3>
                            <p className="text-gray-500">Lives Transformed</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold">95%</h3>
                            <p className="text-gray-500">Client Satisfaction</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold">Top 10</h3>
                            <p className="text-gray-500">Mental Health Center</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="border-t bg-gray-50/50">
                <div className="container py-12">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
                    <Card>
                        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
                            <div className="relative h-[300px] overflow-hidden rounded-xl">
                                <Image
                                    src="/feedback.png"
                                    alt="Happy children"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <CheckCircle key={star} className="h-5 w-5 text-yellow-400"/>
                                    ))}
                                </div>
                                <blockquote className="text-xl italic mb-4">
                                    "Serenity Haven Wellness transformed my life. The support and guidance I received
                                    were truly invaluable."
                                </blockquote>
                                <cite className="not-italic">
                                    <div className="font-semibold">Sarah Michels</div>
                                    <div className="text-gray-500">Client</div>
                                </cite>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Registration Section */}
            <section className="border-t">
                <div className="container py-12">
                    <h2 className="text-3xl font-bold text-center mb-4">Registration for Classes</h2>
                    <p className="text-center text-gray-500 mb-12">
                        Do you want your child to participate in exciting and enriching activities? Sign up for our
                        courses right now!
                    </p>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">What We Offer</h3>
                            <p className="text-gray-500">
                                We provide a variety of classes for children of different ages, from art and music
                                courses to sports sections
                                and science experiments. Each course is developed by experienced instructors to ensure
                                engaging and safe
                                learning.
                            </p>
                            <div className="relative h-[200px] mt-6 overflow-hidden rounded-xl">
                                <Image
                                    src="/childrens_activities.png"
                                    alt="Children activities"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Why You Should Sign Up</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary"/>
                                    <span>Flexible class schedules for the convenience of parents</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary"/>
                                    <span>Small groups for a personalized approach to each child</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary"/>
                                    <span>A range of programs that foster skill development and talents</span>
                                </li>
                            </ul>
                            <div className="relative h-[200px] mt-6 overflow-hidden rounded-xl">
                                <Image
                                    src="/childrens_learning.png"
                                    alt="Children learning"
                                    className="object-cover"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

