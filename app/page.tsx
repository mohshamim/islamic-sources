import { Search, BookOpen, MessageCircle, Download, Share2, Bookmark, Play, Clock, Eye, ChevronRight, Youtube, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { recentAnswers, categories, scholars, stats, mediaItems } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-lg">
              إ
            </div>
            <span className="text-xl font-bold text-emerald-800">Islamic Sources</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Articles</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Media</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Scholars</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">About</a>
            <Button variant="outline" size="sm">العربية</Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="md:hidden">Menu</Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-100/50 -z-10" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-4 py-1.5 text-sm">
                ✨ Trusted Islamic Knowledge Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                Seek Authentic
                <span className="block text-emerald-600 mt-2">Islamic Knowledge</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                Answers, Articles, and Media from trusted scholars based on Quran and Sunnah
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search by topic, scholar, or question..."
                  className="pl-12 pr-4 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-emerald-400 shadow-lg"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-xl text-base shadow-lg hover:shadow-xl transition-all">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Topics
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 h-12 rounded-xl text-base">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Answers Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Answers</h2>
              <p className="text-gray-600 mt-2">Latest responses from our scholars</p>
            </div>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAnswers.map((answer) => (
              <Card key={answer.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200 rounded-2xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                      {answer.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      {answer.views.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {answer.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    By {answer.scholar} • {new Date(answer.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {answer.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4 bg-gray-50/50">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-emerald-600">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Browse by Category</h2>
            <p className="text-gray-600 text-lg">Explore knowledge organized by Islamic sciences</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-300 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-emerald-50/20 hover:to-emerald-50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      {category.questionCount}+ Q&A
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 w-full justify-between group/btn">
                    Explore
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Carousel */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Media</h2>
              <p className="text-gray-600 mt-2">Watch and listen to Islamic lectures</p>
            </div>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden rounded-2xl border-2 hover:border-emerald-200 hover:shadow-xl transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shadow-lg">
                      <Play className="h-7 w-7 text-emerald-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-black/70 text-white hover:bg-black/70 backdrop-blur">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Eye className="h-4 w-4" />
                    {item.views.toLocaleString()} views
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ask Question Banner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="border-0 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />
              <CardContent className="relative py-12 md:py-16 text-center space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-bold">Have a Question?</h2>
                  <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto">
                    Submit your question to our panel of verified scholars and get authentic Islamic answers
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 h-12 rounded-xl shadow-xl hover:shadow-2xl transition-all">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Ask Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 h-12 rounded-xl">
                    Browse FAQ
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Scholar Highlights */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Scholars</h2>
            <p className="text-gray-600 text-lg">Learn from qualified Islamic scholars</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholars.map((scholar) => (
              <Card key={scholar.id} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200 rounded-2xl overflow-hidden">
                <CardContent className="pt-8 pb-6 space-y-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-emerald-100 shadow-lg">
                    <AvatarImage src={scholar.image} alt={scholar.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                      {scholar.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{scholar.name}</h3>
                    <p className="text-emerald-600 font-medium mt-1">{scholar.expertise}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed px-2">
                    {scholar.bio}
                  </p>
                  <div className="pt-2">
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 px-4 py-1">
                      {scholar.answersCount}+ Answers
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-bold text-lg">
                  إ
                </div>
                <span className="text-xl font-bold text-white">Islamic Sources</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted platform for authentic Islamic knowledge from Quran and Sunnah
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="icon" variant="ghost" className="hover:bg-emerald-600/20 hover:text-emerald-400 rounded-full">
                  <Youtube className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-emerald-600/20 hover:text-emerald-400 rounded-full">
                  <Send className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-emerald-600/20 hover:text-emerald-400 rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {['About Us', 'Our Scholars', 'Ask Question', 'Browse Articles', 'Media Library'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-2.5">
                {['Aqeedah', 'Salah', 'Fiqh', 'Quran & Tafsir', 'Hadith', 'Family'].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>Email: info@islamicsources.com</li>
                <li>Support: support@islamicsources.com</li>
                <li>
                  <Button variant="outline" size="sm" className="mt-3 border-emerald-600 text-emerald-400 hover:bg-emerald-600/20">
                    🌍 Switch to العربية
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 Islamic Sources. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
