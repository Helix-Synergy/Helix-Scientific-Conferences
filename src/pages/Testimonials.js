import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon } from '@heroicons/react/24/solid'; // For rating stars

const Testimonials = () => {
  const testimonials = [
    {
        id: 1,
        quote: "Thank you, Helix Conferences, for the platform to bring this conversation on Why I Chose to Speak on Digital Dentistry, Cybersecurity & Regulation forward.",
        author: "Srividya Narayanan",
        role: "Northeastern University",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/1E90FF/FFFFFF?text=SN",
    },
    {
        id: 2,
        quote: "I’m humbled to have received this certificate of participation for presenting at the International Conference on Public Health & Nursing, hosted by Helix Conferences.",
        author: "Julie Condliffe",
        role: "Keynote speaker | De Montford University",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FFD700/000000?text=JC",
    },
    {
        id: 3,
        quote: "Thanks to Helix Conferences for the invitation to keynote this UK morning‘s Public Health Conference with Putting The Bloom on STEM: The Importance of Female Representation in Science and the C-Suite.",
        author: "Amy Gutman",
        role: "CEO & Founder of ToughLoveMD | Keynote Speaker",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FF69B4/FFFFFF?text=AG",
    },
    {
        id: 4,
        quote: "Grateful to see you today, organized by Helix Conferences in the June 2025 Important Conferences in Public Health and Nursing. Thank you for listening well and for your words of thanks and praise. Thank you Helix Conferences for the good organization and great effort, especially Mike.",
        author: "Esraa Mohamed Elsisy",
        role: "Dietitian, Saudi Arabia",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/8A2BE2/FFFFFF?text=EM",
    },
    {
        id: 5,
        quote: "The energy and intellectual vibrancy at Helix were palpable, even for those of us participating remotely. The blend of cutting-edge Technology and human-centric design made me feel completely connected to the Event. My Session received incredible feedback and sparked follow-up conversations that are already leading to new projects. Helix is an essential Platform for anyone pushing the boundaries in their field.",
        author: "Aisha Sharma",
        role: "Lead Engineer, Future Labs R&D",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/20B2AA/FFFFFF?text=AS",
    },
    {
        id: 6,
        quote: "I was deeply impressed by the diversity of thought and expertise. Helix offers an unparalleled Forum for exchanging groundbreaking Ideas and building a global Network of professionals. I am already looking forward to next year's Conference.",
        author: "Dr. Kenji Tanaka",
        role: "Research Fellow, Tokyo Institute of Technology",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/6A5ACD/FFFFFF?text=KT",
    },
    {
        id: 7,
        quote: "Helix's commitment to creating a seamless digital experience is evident in every detail. As a Speaker, it was reassuring to know that the Technical team had every aspect of the Virtual presentation covered. This Event is a shining example of how Technology can bring people closer.",
        author: "Sophia Rossi",
        role: "Chief Innovation Officer, MetaTech Solutions",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=SR",
    },
    {
        id: 8,
        quote: "The in-person networking at Helix was fantastic. The way the Event facilitated connections between Sponsors, Speakers, and Attendees was second to none. I've made several valuable contacts that are already proving fruitful.",
        author: "Dr. David Kim",
        role: "Director of Product, Nexus Dynamics",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/32CD32/FFFFFF?text=DK",
    },
    {
        id: 9,
        quote: "The quality of the Content and the depth of the Discussions at Helix are truly exceptional. It's a Forum where real, substantive questions are addressed. It's the only Conference I attend annually without hesitation.",
        author: "Grace Adebayo",
        role: "Senior Consultant, Strategic Futures",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/FF4500/FFFFFF?text=GA",
    },
    {
        id: 10,
        quote: "I presented my research virtually and the experience was flawless. The Helix Platform is intuitive and the engagement tools for the Audience are outstanding. It's truly a next-generation Conference.",
        author: "Dr. Chloe Martin",
        role: "Postdoctoral Researcher, Institute for Applied Sciences",
        rating: 5,
        imageUrl: "https://placehold.co/100x100/800080/FFFFFF?text=CM",
    },
];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const testimonialVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white py-20 px-4 bg-gray-900">
      {/* Background: Soft, Swirling Nebula Effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(74, 40, 104, 0.6), rgba(46, 101, 154, 0.6), rgba(154, 46, 101, 0.6))',
          backgroundSize: '300% 300%',
          animation: 'swirl-bg 40s linear infinite',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in-up">
          What Our Eminent Speakers Say
        </h1>

        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          Hear directly from participants about their experiences at Helix Conferences.
          Their satisfaction is our greatest reward.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-800/70 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 transform transition-all duration-300 hover:scale-[1.01] group"
              variants={testimonialVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              <div className="flex items-start mb-6">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-400 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{testimonial.author}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-500'} transition-colors duration-200`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg italic text-gray-200 leading-relaxed relative">
                <span className="absolute -top-4 -left-4 text-6xl text-blue-500 opacity-20 transform rotate-180">“</span>
                {testimonial.quote}
                <span className="absolute -bottom-4 -right-4 text-6xl text-blue-500 opacity-20">”</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;