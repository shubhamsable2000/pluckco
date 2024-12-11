import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Globe,
  Instagram,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from './components/header';
import { Footer } from './components/footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e1f5b] to-[#7c4dff]">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-[#2e1f5b] to-[#7c4dff]  h-[650px] px-4 py-32  sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl sm:text-7xl mt-20 font-bold mb-6 bg-gradient-to-r from-slate-100 to-stone-50 text-transparent bg-clip-text animate-gradient">
            Get Paid to Eat & Share 🍽️
          </h1>
          <p className="text-xl sm:text-2xl mb-8">
            Join Boston's coolest micro-influencer platform.
            <br />
            Discover restaurants, share experiences, earn rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup/influencer">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg bg-black hover:bg-purple-700 text-white"
              >
                Join as Influencer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup/business">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg border-white text-white hover:bg-white hover:text-purple-600"
              >
                Partner with Us
                <Building2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-blue-950 text-transparent bg-clip-text">
                How Pluck Works ✨
              </h2>
              <p className="text-xl text-blue-900">
                Three simple steps to start earning
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className="rounded-full bg-purple-200 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Globe className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                    1. Discover
                  </h3>
                  <p className="text-gray-600 text-center">
                    Browse curated collections of Boston's best restaurants and
                    experiences
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className="rounded-full bg-pink-200 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Instagram className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                    2. Share
                  </h3>
                  <p className="text-gray-600 text-center">
                    Visit locations and share your authentic experiences on
                    social media
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-8">
                  <div className="rounded-full bg-purple-200 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
                    3. Earn
                  </h3>
                  <p className="text-gray-600 text-center">
                    Get rewarded with exclusive perks, discounts, and cash
                    rewards
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-[#1E2A39]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl text-center sm:text-5xl font-bold mb-12 bg-gradient-to-r from-pink-500 to-purple-300 text-transparent bg-clip-text">
              Milestones We've Achieved
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
                    200+
                  </div>
                  <div className="text-gray-700">Partner Restaurants</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
                    5K+
                  </div>
                  <div className="text-gray-700">Active Influencers</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
                    50K+
                  </div>
                  <div className="text-gray-700">Posts Created</div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
                    $500K+
                  </div>
                  <div className="text-gray-700">Rewards Given</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className=" bg-white py-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-blue-950 text-transparent bg-clip-text">
                What Our Community Says
              </h2>
              <p className="text-xl text-white">
                Join thousands of happy influencers
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Chen',
                  handle: '@foodie_sarah',
                  image: '/img1.jpg',
                  text:
                    'Pluck has completely changed how I discover new restaurants! The rewards are amazing, and I love being part of this community.',
                  followers: '15.5K',
                },
                {
                  name: 'Mike Rodriguez',
                  handle: '@mike.eats',
                  image: '/img2.jpg',
                  text:
                    'As a food blogger, Pluck helps me find the best spots in Boston. The platform is super easy to use, and the team is incredibly supportive!',
                  followers: '22.3K',
                },
                {
                  name: 'Emma Liu',
                  handle: '@emmaeats',
                  image: '/img3.jpg',
                  text:
                    "I've discovered so many hidden gems through Pluck! It's amazing how they connect influencers with great restaurants.",
                  followers: '18.7K',
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="pt-8">
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="w-16 h-16 rounded-full border-4 border-purple-200"
                      />
                      <div>
                        <div className="font-semibold text-lg text-gray-800">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-sm flex items-center gap-2">
                          {testimonial.handle}
                          <span className="text-xs bg-purple-200 px-2 py-1 rounded-full flex items-center gap-1 text-purple-500">
                            <Users className="w-3 h-3" />
                            {testimonial.followers}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.text}</p>
                    <div className="flex items-center gap-1 mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-[#2e1f5b] to-[#563e98] ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Start Your Journey? 🚀
            </h2>
            <p className="text-xl mb-8">
              Join thousands of influencers who are already earning through
              Pluck
            </p>
            <Link href="/signup/influencer">
              <Button
                size="lg"
                className="text-lg bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
