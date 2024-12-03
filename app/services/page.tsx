import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, BookOpen, ClubIcon as Football } from 'lucide-react'

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
        At our center, we offer a wide range of services aimed at the development and support of children. Explore our offerings to find the perfect option for your child!
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-[#FFE4D6]">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Healthcare</h2>
            <p className="text-gray-700 mb-4">
              Our center provides the necessary medical services to ensure the health and well-being of your child.
            </p>
            <Button asChild>
              <Link href="#healthcare">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#FFD6E6]">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Educational Programs</h2>
            <p className="text-gray-700 mb-4">
              We offer engaging educational programs that inspire children to love learning.
            </p>
            <Button asChild>
              <Link href="#education">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#E6D6FF]">
          <CardContent className="p-6 text-center">
            <Football className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Sports Activities</h2>
            <p className="text-gray-700 mb-4">
              Physical activity is important for children's health and development. Our sports programs promote teamwork and fitness.
            </p>
            <Button asChild>
              <Link href="#sports">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section id="healthcare" className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Healthcare</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Our center provides the necessary medical services to ensure the health and well-being of your child. We offer:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Psychologist: Our child psychologist provides emotional support and assistance, helping children cope with their feelings and develop resilience.</li>
              <li>Children's pediatrician: Regular check-ups and consultations with our pediatrician will help monitor your child's physical health.</li>
              <li>Speech therapist: Help for children who need correction of speech skills.</li>
              <li>Nutritionist: Consultations on healthy nutrition and lifestyle for children.</li>
            </ul>
            <Button><a href="/contacts">Book a Consultation</a></Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/healthcare.png"
              alt="Healthcare services"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      <section id="education" className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Educational Programs</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[300px]">
            <Image
              src="/education.png"
              alt="Educational programs"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-gray-700 mb-4">
              We offer engaging educational programs that inspire children to love learning:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>English Language Courses: Interactive classes designed to help children learn English through games and fun activities.</li>
              <li>Preschool Programs: Early learning programs that prepare children for school by focusing on social skills, creativity, and foundational knowledge.</li>
              <li>Science Experiments: Hands-on activities that introduce children to basic scientific concepts in a fun way.</li>
              <li>Arts and Crafts: Activities that encourage artistic expression through a variety of media, such as drawing, modeling, and crafting.</li>
            </ul>
            <Button> <a href="/contacts">Enroll Now</a> </Button>
          </div>
        </div>
      </section>

      <section id="sports">
        <h2 className="text-3xl font-semibold mb-6">Sports Activities</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Physical activity is important for children's health and development. Our sports programs promote teamwork, discipline, and physical fitness:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Football: Training sessions on our football pitch to develop skills, teamwork and sportsmanship.</li>
              <li>Volleyball: Fun and exciting volleyball training sessions that develop physical fitness and coordination.</li>
              <li>Basketball: Gymnasium sessions designed to develop playing skills and teamwork.</li>
              <li>Gymnastics: Sessions designed to improve flexibility, strength and coordination through structured gymnastics exercises.</li>
            </ul>
            <Button><a href="/contacts">Join a Sports Program</a></Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/sports.png"
              alt="Sports activities"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

