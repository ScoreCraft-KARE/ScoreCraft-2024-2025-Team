import React from 'react';
import './CoreTeam.css';
import DeveloperCard from '../DeveloperCard/DeveloperCard';

const CoreTeam = () => {
  const teamMembers = [
    {
      name: "Bandi Hanuma Kumar",
      role: "President",
      linkedin: "https://www.linkedin.com/in/hanuma-kumar-bandi-233444252",
      image: "https://i.ibb.co/fzsxJfCf/B-Hanuma-Kumar.jpg",
      delay: 0
    },
    {
      name: "Ch.Manohar",
      role: "Vice President",
      linkedin: "https://www.linkedin.com/in/manoharchirukuri",
      image: "https://i.ibb.co/QvyCtF7B/Manohar.jpg",
      delay: 0.1
    },
    {
      name: "S.Pavani",
      role: "Vice President",
      linkedin: "https://www.linkedin.com/in/sagi-pavani-6b9977268",
      image: "https://i.ibb.co/hFfsj42J/Pavani.jpg",
      delay: 0.2
    },
    {
      name: "P.Harshini",
      role: "Secretary",
      linkedin: "https://www.linkedin.com/in/harshini-p-1a47802a2",
      image: "https://i.ibb.co/b5H0L8W2/Harshini.jpg",
      delay: 0.3
    },
    {
      name: "S.Dasharath",
      role: "Treasurer",
      linkedin: "https://www.linkedin.com/in/dasharath18",
      image: "https://i.ibb.co/mV72kQHN/Dasharath.jpg",
      delay: 0.4
    },
    {
      name: "I.Soniesh",
      role: "Co-Treasurer",
      linkedin: "https://www.linkedin.com/in/soniesh-immidichetty-182858268",
      image: "https://i.ibb.co/bGfDf3x/Soniesh.jpg",
      delay: 0.5
    },
    {
      name: "G.Velugondaiah",
      role: "Web Developer Lead",
      linkedin: "https://www.linkedin.com/in/garlapati-velugondaiah",
      image: "https://i.ibb.co/Gv54D8CW/Velugondaiah.jpg",
      delay: 0.6
    },
    {
      name: "B Issac Preetham",
      role: "Assistant Web developer",
      linkedin: "https://www.linkedin.com/in/issac-preetham-bodanapu-378984288",
      image: "https://i.ibb.co/7x6HwzmL/Issac-Preetham.jpg",
      delay: 0.7
    },
    {
      name: "Y.Setu Sai Ram",
      role: "Technical Lead",
      linkedin: "https://www.linkedin.com/in/setusairam-y",
      image: "https://i.ibb.co/dwKYnm81/Setu.jpg",
      delay: 0.8
    },
    {
      name: "Sk.Shamraj",
      role: "Technical",
      linkedin: "https://www.linkedin.com/in/shamraj-sheik-5b21572b2",
      image: "https://i.ibb.co/xtRNPN6N/Shamraj.jpg",
      delay: 0.9
    },
    {
      name: "Y.Bala NagiReddy",
      role: "Technical",
      linkedin: "https://www.linkedin.com/in/bala-nagi-reddy-718546356",
      image: "https://i.ibb.co/1Y4Szq83/Bala-Nagi-Reddy.jpg",
      delay: 1.0
    },
    {
      name: "P.Bhargav Kumar",
      role: "Content Creator",
      linkedin: "https://www.linkedin.com/in/bhargav-kumar-4b88862a5",
      image: "https://i.ibb.co/PGj5zNZr/Bhargav.jpg",
      delay: 1.1
    },
    {
      name: "K.Manasa",
      role: "Content Creator",
      linkedin: "https://www.linkedin.com/in/manasa-koka-2327b3268",
      image: "https://i.ibb.co/jZbxk0Hk/Manasa.jpg",
      delay: 1.2
    },
    {
      name: "P.Kavya",
      role: "Content Creator",
      linkedin: "https://www.linkedin.com/in/kavya-poona-994853268",
      image: "https://i.ibb.co/KxTz5180/Kavya.jpg",
      delay: 1.3
    },
    {
      name: "N.Gopi Chand",
      role: "Social Media",
      linkedin: "https://www.linkedin.com/in/nettikoppula-gopi-chand-0b5861268",
      image: "https://i.ibb.co/r22kjsx4/Gopi.jpg",
      delay: 1.4
    },
    {
      name: "Sk.Kalesha",
      role: "Social Media",
      linkedin: "https://www.linkedin.com/in/shaik-kalesha-2973b426a",
      image: "https://i.ibb.co/4w2fhLQx/Kalesha.jpg",
      delay: 1.5
    },
    {
      name: "M J Bhuvaneshwar Naidu",
      role: "UI/UX Lead",
      linkedin: "https://www.linkedin.com/in/m-j-bhuvaneshwar-naidu-24781028b",
      image: "https://i.ibb.co/DPsbNgsC/Bhuvaneshwar.jpg",
      delay: 1.6
    },
    {
      name: "K.Deva Chandan",
      role: "Event Co-Ordinator",
      linkedin: "https://www.linkedin.com/in/deva-chandan-b98b27254",
      image: "https://i.ibb.co/9m5hMcqh/Deva.jpg",
      delay: 1.7
    },
    {
      name: "I.Poojitha",
      role: "Event Co-Ordinator",
      linkedin: "https://www.linkedin.com/in/lakshmi-poojitha-inturi-370880268",
      image: "https://i.ibb.co/kYN587b/Poojitha.jpg",
      delay: 1.8
    },
    {
      name: "S.Naga Jayanth",
      role: "Event Co-Ordinator",
      linkedin: "https://www.linkedin.com/in/jayanth-sunkara-209905290",
      image: "https://i.ibb.co/BV46pcnQ/Naga-Jayanth.jpg",
      delay: 1.9
    },
    {
      name: "T.Kranthi Kumar",
      role: "Video Editor",
      linkedin: "https://www.linkedin.com/in/kranthi-tanniru-45237431b",
      image: "https://i.ibb.co/ZzpyWQD6/Kranthi.jpg",
      delay: 2.0
    },
    {
      name: "M.Pavan Kumar",
      role: "Video Editor",
      linkedin: "https://www.linkedin.com/in/pavan-kumar-239665268",
      image: "https://i.ibb.co/tphmwx0r/Pavan.jpg",
      delay: 2.1
    },
    {
      name: "P.Kiran Kumar",
      role: "Organiser",
      linkedin: "https://www.linkedin.com/in/peruvaila-kirankumar-5282a5252",
      image: "https://i.ibb.co/Y7SzX8Z4/Kiran.jpg",
      delay: 2.2
    }
  ];

  return (
    <section className="core-team-section">
      <div className="container">
        <h2 className="section-title">Our Core Team</h2>
        <div className="section-description">
          <p>
            Meet our dedicated core team members who work tirelessly to make our community thrive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto justify-center items-center text-center">
          {teamMembers.map((member, index) => (
            <DeveloperCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedin={member.linkedin}
              delay={member.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTeam;
