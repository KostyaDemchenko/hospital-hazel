import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"

export default function AboutUs() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="relative h-[300px] mb-12 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-black/60 z-10"/>
                <Image
                    src="/childrens_learning.png"
                    alt="Children learning"
                    className="object-cover"
                    fill
                />
                <div
                    className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center p-6">
                    <h2 className="text-4xl font-bold mb-4">About Us</h2>
                    <p className="max-w-2xl">
                        From preschool to pre-tertiary, our students stay fun, interactive and relevant lessons and
                        are empowered to think beyond the confines of the classroom.
                    </p>
                </div>
            </div>


            <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
            <p className="text-center text-gray-600 mb-8">
                Our dedicated team of educators is passionate about nurturing young minds and fostering a love
                for learning. Below are our talented instructors, each bringing their unique expertise and
                experience to our programs.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <Card key={index}>
                        <CardContent className="p-6 text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-gray-600 mb-2">{member.role}</p>
                            <p className="text-sm text-gray-700">{member.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>


            <div className="container py-12">
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center mb-4">Photo of our center</h3>
                    <p className="text-center text-gray-600 mb-8">
                        Explore the vibrant and engaging activities we offer at our center! Below is a glimpse of our
                        fun-filled classes and events, showcasing the joyful moments of learning and growth for our
                        children.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/01.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/02.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/03.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/04.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/05.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src="/aboutus/06.png"
                                    alt="Center activity" 
                                    className="object-cover"
                                    fill
                                />
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center bg-black/60 text-white px-2 py-1 rounded">
                                    lorem ipsum
                                </p>
                            </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

const teamMembers = [
    {
        name: "Dr. Emily Johnson",
        role: "Child Psychologist",
        description: "With over 15 years of experience, Dr. Johnson leads our mental health initiatives and provides expert guidance to our team.",
        image: "/avatars/emily.png"
    },
    {
        name: "Mark Thompson",
        role: "Education Specialist",
        description: "Mark designs our educational programs, ensuring they are both engaging and effective for children of all ages.",
        image: "/avatars/mark.png"
    },
    {
        name: "Sarah Lee",
        role: "Physical Education Instructor",
        description: "Sarah brings energy and expertise to our sports programs, promoting physical fitness and teamwork.",
        image: "/avatars/sarah.png"
    }
]
