import React from 'react';
import './Mentors.css';
import DeveloperCard from '../DeveloperCard/DeveloperCard';

const Mentors = () => {
  const mentors = [
    {
      name: "Dr. Abhishek Tripathi",
      role: "Associate Professor",
      linkedin: "https://www.linkedin.com/in/abhishek-tripathi-05826291",
      image: "https://i.ibb.co/xt8YjbGQ/abhishek-tripathi-Sir.jpg",
      delay: 0
    },
    {
      name: "Mrs J Benita",
      role: "Assistant Professor",
      linkedin: "https://www.linkedin.com/in/benita-j-3673a0222",
      image: "https://i.ibb.co/0p67DR2K/Benita-Mam.jpg",
      delay: 0.1
    },
    {
      name: "Mrs S Sujitha",
      role: "Assistant Professor",
      linkedin: "https://www.linkedin.com/in/sujitha-s-b2a0b199",
      image: "https://i.ibb.co/mwqQJ8c/Sujitha-Mam.jpg",
      delay: 0.2
    },
    {
      name: "Mr. S. Suresh Kumar",
      role: "Assistant Professor",
      linkedin: "https://www.linkedin.com/in/sureshkumar-s-a5032b2b6",
      image: "https://i.ibb.co/3YSkqXxz/Suresh-Kumar-Sir.jpg",
      delay: 0.3
    },
    {
      name: "Ms M R Vishnu Priya",
      role: "Assistant Professor",
      linkedin: "https://www.linkedin.com/in/vishnu-priya-m-r-b9042a25b",
      image: "https://i.ibb.co/mVSvZw7c/Vishnu-Priya-Mam.jpg",
      delay: 0.4
    }
  ];

  return (
    <section className="mentors-section">
      <div className="container">
        <h2 className="section-title">Our Mentors</h2>
        <div className="section-description">
          <p>
            Meet the mentors who guide and support our community. Their expertise and dedication
            help us achieve our goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto justify-center items-center text-center">
          {mentors.map((mentor, index) => (
            <DeveloperCard
              key={index}
              name={mentor.name}
              role={mentor.role}
              image={mentor.image}
              linkedin={mentor.linkedin}
              delay={mentor.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mentors;
