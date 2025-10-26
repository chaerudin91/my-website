import React, { useState } from 'react';
import { Users, BookOpen, Video, Calendar, Star, Clock, Award, Search, Filter, CheckCircle } from 'lucide-react';

const EducationMentor = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const courses = [
    {
      title: 'Export Fundamentals',
      level: 'Beginner',
      duration: '6 weeks',
      students: 1234,
      rating: 4.8,
      lessons: 24,
      description: 'Learn the fundamentals of exporting from zero to mastery. Perfect for beginners who want to start an export business.',
      instructor: 'John Anderson',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Export Documentation', 'Shipping Methods', 'Payment Terms', 'Market Research'],
      price: 'Rp 1,500,000',
      modules: [
        { title: 'Introduction to Export Business', lessons: 6, duration: '2 hours' },
        { title: 'Understanding Export Documentation', lessons: 8, duration: '3 hours' },
        { title: 'Shipping and Logistics Basics', lessons: 6, duration: '2.5 hours' },
        { title: 'International Payment Methods', lessons: 4, duration: '1.5 hours' }
      ],
      requirements: ['Basic business knowledge', 'Computer with internet connection', 'Willingness to learn'],
      benefits: ['Certificate of completion', 'Lifetime access to course materials', 'Access to private community', 'Monthly Q&A sessions']
    },
    {
      title: 'International Trade Law',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 856,
      rating: 4.9,
      lessons: 32,
      description: 'Understanding international trade law, regulations, and export-import compliance requirements.',
      instructor: 'Sarah Chen',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Trade Agreements', 'Customs Regulations', 'Legal Compliance', 'Dispute Resolution'],
      price: 'Rp 2,500,000',
      modules: [
        { title: 'Foundations of International Trade Law', lessons: 8, duration: '3 hours' },
        { title: 'WTO and Trade Agreements', lessons: 8, duration: '3.5 hours' },
        { title: 'Customs and Border Regulations', lessons: 8, duration: '3 hours' },
        { title: 'Legal Disputes and Resolution', lessons: 8, duration: '2.5 hours' }
      ],
      requirements: ['Basic understanding of export business', 'Experience in international trade (recommended)', 'English proficiency'],
      benefits: ['Professional certificate', 'Legal document templates', 'Case study library', 'Expert mentorship sessions']
    },
    {
      title: 'Advanced Logistics',
      level: 'Advanced',
      duration: '10 weeks',
      students: 542,
      rating: 4.7,
      lessons: 40,
      description: 'Advanced logistics strategies for supply chain optimization and international shipping management.',
      instructor: 'Michael Roberts',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Supply Chain Optimization', 'Warehouse Management', 'Freight Forwarding', 'Risk Management'],
      price: 'Rp 3,500,000',
      modules: [
        { title: 'Supply Chain Strategy', lessons: 10, duration: '4 hours' },
        { title: 'Advanced Warehouse Operations', lessons: 10, duration: '4 hours' },
        { title: 'International Freight Management', lessons: 10, duration: '3.5 hours' },
        { title: 'Risk Management and Insurance', lessons: 10, duration: '3 hours' }
      ],
      requirements: ['2+ years experience in logistics', 'Understanding of supply chain basics', 'Data analysis skills'],
      benefits: ['Advanced certification', 'Software tools access', 'Industry network access', 'Job placement support']
    },
    {
      title: 'Digital Marketing for Exports',
      level: 'Intermediate',
      duration: '5 weeks',
      students: 967,
      rating: 4.6,
      lessons: 20,
      description: 'Digital marketing strategies to reach global markets and increase export sales effectively.',
      instructor: 'Emma Wilson',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['SEO for Export', 'Social Media Marketing', 'B2B Platforms', 'Email Campaigns'],
      price: 'Rp 1,800,000',
      modules: [
        { title: 'Digital Marketing Fundamentals', lessons: 5, duration: '2 hours' },
        { title: 'SEO and Content Strategy', lessons: 5, duration: '2.5 hours' },
        { title: 'Social Media for B2B', lessons: 5, duration: '2 hours' },
        { title: 'Email Marketing Campaigns', lessons: 5, duration: '1.5 hours' }
      ],
      requirements: ['Basic marketing knowledge', 'Active social media accounts', 'Website or online presence'],
      benefits: ['Marketing certificate', 'Campaign templates', 'Marketing tools access', 'Portfolio building guidance']
    }
  ];

  const mentors = [
    { 
      name: 'John Anderson', 
      expertise: 'International Trade Law', 
      experience: '15 years',
      rating: 4.9,
      sessions: 342,
      hourlyRate: 'Rp 500,000/hour',
      bio: 'Expert in international trade law with experience handling 200+ export-import cases.',
      availability: ['Monday 09:00-17:00', 'Wednesday 09:00-17:00', 'Friday 09:00-17:00'],
      languages: ['English', 'Indonesian', 'Mandarin']
    },
    { 
      name: 'Sarah Chen', 
      expertise: 'Export Documentation', 
      experience: '12 years',
      rating: 4.8,
      sessions: 289,
      hourlyRate: 'Rp 450,000/hour',
      bio: 'Export documentation specialist who has helped 500+ companies complete their export processes.',
      availability: ['Tuesday 10:00-18:00', 'Thursday 10:00-18:00', 'Saturday 09:00-15:00'],
      languages: ['English', 'Indonesian']
    },
    { 
      name: 'Michael Roberts', 
      expertise: 'Global Logistics', 
      experience: '18 years',
      rating: 5.0,
      sessions: 456,
      hourlyRate: 'Rp 600,000/hour',
      bio: 'Global logistics veteran with track record of optimizing shipping costs by up to 40% for clients.',
      availability: ['Monday 08:00-16:00', 'Tuesday 08:00-16:00', 'Thursday 08:00-16:00'],
      languages: ['English', 'Indonesian', 'Japanese']
    },
    { 
      name: 'Emma Wilson', 
      expertise: 'Digital Marketing', 
      experience: '10 years',
      rating: 4.7,
      sessions: 234,
      hourlyRate: 'Rp 400,000/hour',
      bio: 'Digital marketing strategist who has helped 100+ export businesses increase their online presence.',
      availability: ['Wednesday 11:00-19:00', 'Friday 11:00-19:00', 'Saturday 10:00-16:00'],
      languages: ['English', 'Indonesian', 'Spanish']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const handleEnrollCourse = (course) => {
    if (!enrolledCourses.includes(course.title)) {
      setEnrolledCourses([...enrolledCourses, course.title]);
      alert(`Enrollment Successful!\n\nCourse: ${course.title}\nPrice: ${course.price}\n\nYou will receive a confirmation email with payment instructions and course access details.`);
    } else {
      alert('You are already enrolled in this course!');
    }
    setSelectedCourse(null);
  };

  const handleBookMentor = (mentor) => {
    if (bookingDate && bookingTime) {
      alert(`Booking Successful!\n\nMentor: ${mentor.name}\nDate: ${bookingDate}\nTime: ${bookingTime}\nRate: ${mentor.hourlyRate}\n\nConfirmation will be sent to your email.`);
      setSelectedMentor(null);
      setBookingDate('');
      setBookingTime('');
    } else {
      alert('Please select date and time first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#3d3d3d' }}>
          Education & Mentor
        </h1>
        <p className="mb-8" style={{ color: '#bc1823' }}>Enhance your export skills with the best experts</p>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: '#bc1823' }} />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] outline-none"
                style={{ color: '#3d3d3d' }}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5" style={{ color: '#bc1823' }} />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="pl-10 pr-8 py-2 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] outline-none appearance-none bg-white"
                style={{ color: '#3d3d3d' }}
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#bc1823' }}>
                <BookOpen className="w-6 h-6" />
                Available Courses
              </h2>
              <div className="grid gap-4">
                {filteredCourses.map((course, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#bc1823] transition-all cursor-pointer"
                       onClick={() => setSelectedCourse(course)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg" style={{ color: '#3d3d3d' }}>{course.title}</h3>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold" 
                                style={{ backgroundColor: '#ffa629', color: 'white' }}>
                            {course.level}
                          </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: '#3d3d3d' }}>{course.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm mb-2">
                          <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                            <Clock className="w-4 h-4" style={{ color: '#bc1823' }} />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                            <Video className="w-4 h-4" style={{ color: '#bc1823' }} />
                            {course.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                            <Users className="w-4 h-4" style={{ color: '#bc1823' }} />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold" style={{ color: '#bc1823' }}>{course.price}</p>
                      </div>
                    </div>
                    <button className="w-full text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-all" 
                            style={{ backgroundColor: '#bc1823', color: 'white' }}>
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#bc1823' }}>
                <Award className="w-6 h-6" />
                Expert Mentors
              </h2>
              <div className="space-y-4">
                {mentors.map((mentor, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#ffa629] transition-all cursor-pointer"
                       onClick={() => setSelectedMentor(mentor)}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                           style={{ backgroundColor: index % 2 === 0 ? '#bc1823' : '#ffa629' }}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-1" style={{ color: '#3d3d3d' }}>{mentor.name}</h3>
                        <p className="text-sm mb-1" style={{ color: '#3d3d3d' }}>{mentor.expertise}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span style={{ color: '#bc1823' }}>{mentor.experience}</span>
                          <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {mentor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: '#bc1823' }}>
                        {mentor.hourlyRate}
                      </span>
                      <button className="text-sm font-semibold px-4 py-1 rounded-lg hover:opacity-90" 
                              style={{ backgroundColor: '#bc1823', color: 'white' }}>
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedCourse(null)}>
            <div className="bg-white rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: '#3d3d3d' }}>{selectedCourse.title}</h2>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" 
                          style={{ backgroundColor: '#ffa629', color: 'white' }}>
                      {selectedCourse.level}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{selectedCourse.rating}</span>
                      <span>({selectedCourse.students} students)</span>
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedCourse(null)} 
                        className="text-2xl font-bold hover:opacity-70" style={{ color: '#bc1823' }}>×</button>
              </div>
              
              {/* Video Preview */}
              <div className="aspect-video mb-6 bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedCourse.videoUrl}
                  title={selectedCourse.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Course Content */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <h3 className="font-bold mb-3 text-xl" style={{ color: '#bc1823' }}>Course Overview</h3>
                  <p className="mb-6" style={{ color: '#3d3d3d' }}>{selectedCourse.description}</p>

                  <h3 className="font-bold mb-3 text-xl" style={{ color: '#bc1823' }}>What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {selectedCourse.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#bc1823' }} />
                        <span style={{ color: '#3d3d3d' }}>{topic}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-bold mb-3 text-xl" style={{ color: '#bc1823' }}>Course Curriculum</h3>
                  <div className="space-y-3">
                    {selectedCourse.modules.map((module, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold" style={{ color: '#3d3d3d' }}>
                            Module {idx + 1}: {module.title}
                          </h4>
                          <span className="text-sm font-semibold" style={{ color: '#bc1823' }}>
                            {module.duration}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: '#3d3d3d' }}>
                          {module.lessons} lessons
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="border-2 rounded-lg p-4 mb-4" style={{ borderColor: '#bc1823' }}>
                    <h3 className="font-bold mb-3 text-xl" style={{ color: '#bc1823' }}>Course Details</h3>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" style={{ color: '#bc1823' }} />
                        <div>
                          <p className="font-semibold" style={{ color: '#3d3d3d' }}>Duration</p>
                          <p style={{ color: '#3d3d3d' }}>{selectedCourse.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5" style={{ color: '#bc1823' }} />
                        <div>
                          <p className="font-semibold" style={{ color: '#3d3d3d' }}>Total Lessons</p>
                          <p style={{ color: '#3d3d3d' }}>{selectedCourse.lessons} video lessons</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" style={{ color: '#bc1823' }} />
                        <div>
                          <p className="font-semibold" style={{ color: '#3d3d3d' }}>Instructor</p>
                          <p style={{ color: '#3d3d3d' }}>{selectedCourse.instructor}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 pt-4 mb-4" style={{ borderColor: '#ffa629' }}>
                      <p className="text-sm font-semibold mb-2" style={{ color: '#3d3d3d' }}>Course Price</p>
                      <p className="text-3xl font-bold mb-4" style={{ color: '#bc1823' }}>{selectedCourse.price}</p>
                      
                      {enrolledCourses.includes(selectedCourse.title) ? (
                        <button className="w-full px-6 py-3 rounded-lg font-bold text-lg cursor-not-allowed opacity-60"
                                style={{ backgroundColor: '#3d3d3d', color: 'white' }} disabled>
                          Already Enrolled ✓
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEnrollCourse(selectedCourse)}
                          className="w-full px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all"
                          style={{ backgroundColor: '#bc1823', color: 'white' }}>
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-4 mb-4">
                    <h4 className="font-bold mb-2" style={{ color: '#bc1823' }}>Requirements</h4>
                    <ul className="space-y-2">
                      {selectedCourse.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span style={{ color: '#bc1823' }}>•</span>
                          <span style={{ color: '#3d3d3d' }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold mb-2" style={{ color: '#bc1823' }}>Benefits</h4>
                    <ul className="space-y-2">
                      {selectedCourse.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#bc1823' }} />
                          <span style={{ color: '#3d3d3d' }}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentor Booking Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
               onClick={() => setSelectedMentor(null)}>
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>Book a Session</h2>
                <button onClick={() => setSelectedMentor(null)} 
                        className="text-2xl font-bold hover:opacity-70" style={{ color: '#bc1823' }}>×</button>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-gray-50">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: '#bc1823' }}>
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1" style={{ color: '#3d3d3d' }}>{selectedMentor.name}</h3>
                  <p className="mb-1" style={{ color: '#3d3d3d' }}>{selectedMentor.expertise}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1" style={{ color: '#3d3d3d' }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {selectedMentor.rating}
                    </span>
                    <span style={{ color: '#3d3d3d' }}>{selectedMentor.sessions} sessions</span>
                    <span style={{ color: '#bc1823' }} className="font-semibold">{selectedMentor.hourlyRate}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2 text-lg" style={{ color: '#bc1823' }}>About the Mentor</h4>
                <p className="mb-4" style={{ color: '#3d3d3d' }}>{selectedMentor.bio}</p>
                
                <h4 className="font-bold mb-2 text-lg" style={{ color: '#bc1823' }}>Languages</h4>
                <div className="flex gap-2 mb-4">
                  {selectedMentor.languages.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-sm font-semibold" 
                          style={{ backgroundColor: '#ffa629', color: 'white' }}>
                      {lang}
                    </span>
                  ))}
                </div>

                <h4 className="font-bold mb-2 text-lg" style={{ color: '#bc1823' }}>Availability</h4>
                <div className="space-y-2 mb-4">
                  {selectedMentor.availability.map((time, idx) => (
                    <p key={idx} className="flex items-center gap-2" style={{ color: '#3d3d3d' }}>
                      <Calendar className="w-5 h-5" style={{ color: '#bc1823' }} />
                      {time}
                    </p>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-4 text-lg" style={{ color: '#bc1823' }}>Schedule Your Session</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#3d3d3d' }}>Select Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] outline-none"
                      style={{ color: '#3d3d3d' }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#3d3d3d' }}>Select Time</label>
                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] outline-none"
                      style={{ color: '#3d3d3d' }}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleBookMentor(selectedMentor)}
                  className="w-full px-6 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#bc1823', color: 'white' }}>
                  Confirm Booking - {selectedMentor.hourlyRate}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationMentor;