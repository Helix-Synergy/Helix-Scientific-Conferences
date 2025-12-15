// import React from 'react';
// import './AllConferences.css';

// // Image URLs for each field (you can replace these with actual images)
// const fieldImages = {
//   "FOOD & AGRI": "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop",
//   "MEDICAL": "https://images.unsplash.com/photo-1516549655669-df565bcfbc19?w=400&h=250&fit=crop",
//   "LIFE SCIENCES": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
//   "SCIENCE & TECHNOLOGY": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
//   "PHARMA": "https://images.unsplash.com/photo-1585435557343-3b092031d77a?w=400&h=250&fit=crop",
//   "NURSING": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
//   "Digi": "https://cdn.sanity.io/images/0vv8moc6/mhe/7fbfb1af70cd235247dcf65e5d4aa94b3d02cd1a-8500x4000.jpg?fit=crop&auto=format",
//   "Food":"https://tse4.mm.bing.net/th/id/OIP.o0uJsoIlV3JTZo9K6qEDrQHaE7?pid=Api&P=0&h=180",
//   "Medi":"https://wallpaperaccess.com/full/3275630.jpg",
//   "Bio":"https://wallpapercave.com/wp/wp9283244.jpg",
//   "e":"https://wallpaperaccess.com/full/3310619.jpg",
//   "ee":"https://www.idbs.com/wp-content/uploads/2024/01/BL_Blog_Feature_Image_PR_9_Webpage_2048x1152.png",
//   "n":"https://tse2.mm.bing.net/th/id/OIP.M-gUvAXPG88mKN_9tx2uBAHaEK?pid=Api&P=0&h=180",
//   "Food-Meet":"https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1712835327056-D280SHVHRBB49J5M58TM/CH040421-5.jpg",
//   "osaka":"https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
//   "tech":"https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
//   "bio":" https://florenciahealthcare.com/wp-content/uploads/2023/10/Slider-01.jpg",
//   "medical":"https://www.pixelstalk.net/wp-content/uploads/images1/Medical-Wallpapers-HD-Free-download.jpg",
//   "biocon":"https://thesaudiboom.com/wp-content/uploads/2024/01/1-Saudi-Arabia-Launches-National-Biotechnology-Strategy-To-Become-Global-BioTech-Hub-by-2040-scaled.jpeg",
//   "nursing":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlogsZ1LK2PopL1jGerEig3DzWzYk2I8_I3A&s"





// };

// const conferenceData = [
//   // FOOD & AGRI
//      {
//     field: "Food-Meet",
//     title: "Global Summit on Food, Agriculture & Environmental Sciences",
//     shortName: "FOODMEET-2026",
//     date: "Apr 23-24 | 2026",
//     venue: "Barcelona | Spain"
//   },
//   {
//     field: "FOOD & AGRI",
//     title: "World Summit on Sustainable Agricultural Practices",
//     shortName: "Agriprac-2026",
//     date: "Apr 23-24 | 2026",
//     venue: "Barcelona | Spain"
//   },
//   {
//     field: "Food",
//     title: "Global Foodomics Conclave",
//     shortName: "Foodomics-2026",
//     date: "Apr 23-24 | 2026",
//     venue: "Barcelona | Spain"
//   },
 
  
//   // MEDICAL
//    {
//     field: "medical",
//     title: "World Medical Conclave",
//     shortName: "MEDICLAVE 2026",
//     date: "May 21-22 | 2026",
//     venue: "Vienna | Austria"
//   },

//   {
//     field: "Medi",
//     title: "International Conference on Precision Medicine & Personalized Therapies",
//     shortName: "Precision Medicine-2026",
//     date: "May 21-22 | 2026",
//     venue: "Vienna | Austria"
//   },
//   {
//     field: "MEDICAL",
//     title: "World Summit Preventive Medicine & Public Health Innovations",
//     shortName: "Public Health-2026",
//     date: "May 21-22 | 2026",
//     venue: "Vienna | Austria"
//   },
  
//   // LIFE SCIENCES
//    {
//     field: "biocon",
//     title: "International Conference on Applied Lifesciences",
//     shortName: "BIOCON-2026",
//     date: "Jun 25-26 | 2026",
//     venue: "Amsterdam | Netherlands"
//   },
//   {
//     field: "LIFE SCIENCES",
//     title: "World Synthetic Biology & Bioengineering Conclave",
//     shortName: "Synthetic Biology - 2026",
//     date: "Jun 25-26 | 2026",
//     venue: "Amsterdam | Netherlands"
//   },
//   {
//     field: "Bio",
//     title: "Global Colloquium on Biosolutions for Global Challenges",
//     shortName: "Biosol -2026",
//     date: "Jun 25-26 | 2026",
//     venue: "Amsterdam | Netherlands"
//   },
  
//   // SCIENCE & TECHNOLOGY
//     {
//     field: "tech",
//     title: "World Science & Technology Summit",
//     shortName: "TECHMATICS-2026",
//     date: "Sep 24-25 | 2026",
//     venue: "Osaka | Japan"
//   },
//   {
//     field: "SCIENCE & TECHNOLOGY",
//     title: "International conference on Quantum Computing & Information Science",
//     shortName: "Quantum Computing-2026",
//     date: "Sep 24-25 | 2026",
//     venue: "Osaka | Japan"
//   },
//   {
//     field: "e",
//     title: "World Summit on Engineering, Energy & Applied Technologies",
//     shortName: "EAT-2026",
//     date: "Sep 24-25 | 2026",
//  venue: "Osaka | Japan"
//   },
  
//   // PHARMA
//     {
//     field: "bio",
//     title: "International Conference on Advanced Pharmaceutical Sciences",
//     shortName: "PHARMTECH-2026",
//     date: "Oct 22-23 | 2026",
//     venue: "Singapore | Singapore City"
//   },
//   {
//     field: "ee",
//     title: "Global Conclave on Drug Discovery & Development Innovations",
//     shortName: "Drugs-2026",
//     date: "Oct 22-23 | 2026",
//     venue: "Singapore | Singapore City"
//   },
//   {
//     field: "n",
//     title: "World Summit on Biologics, Biosimilars & Biopharmaceuticals",
//     shortName: "Biosimilars-2026",
//     date: "Oct 22-23 | 2026",
//     venue: "Singapore | Singapore City"
//   },
  
//   // NURSING
//     {
//     field: "nursing",
//     title: "World summit on Nursing & Nurse Practices",
//     shortName: "NURSESUMMIT-2026",
//     date: "Nov 19-20 | 2026",
//     venue: "Dubai | UAE"
//   },
//   {
//     field: "NURSING",
//     title: "International Conference on Critical Care & Emergency Nursing",
//     shortName: "Critical Care-2026",
//     date: "Nov 19-20 | 2026",
//     venue: "Dubai | UAE"
//   },
//   {
//     field: "Digi",
//     title: "Global Digital Health, AI & Nursing Informatics Convlave",
//     shortName: "Nursing Informative-2026",
//     date: "Nov 19-20 | 2026",
//     venue: "Dubai | UAE"

//   }
// ];

// const AllConferences = () => {
//   return (
//     <div className="conferences-container">
// <header className="conferences-header">
//   <h1>HELIX CONFERENCES - 2026</h1>
// </header>

      
//       <div className="cards-container">
//         {conferenceData.map((conference, index) => (
//           <div key={index} className="conference-card">
//             <div className="card-image">
//               <img 
//                 src={fieldImages[conference.field] || fieldImages["MEDICAL"]} 
//                 alt={conference.field}
//                 onError={(e) => {
//                   e.target.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop";
//                 }}
//               />
//               <div className="image-overlay"></div>
//               <div className="date-badge">{conference.date}</div>
//             </div>
            
//             <div className="card-content">
//               <h3 className="conference-title">{conference.title}</h3>
              
//               <div className="card-details">
//                 <div className="detail-item">
//                   <span className="detail-icon">📅</span>
//                   <span className="detail-value">{conference.date}</span>
//                 </div>
                
//                 <div className="detail-item">
//                   <span className="detail-icon">📍</span>
//                   <span className="detail-value">{conference.venue}</span>
//                 </div>
//               </div>
              
//               <div className="card-footer">
//                 {/* <span className="field-badge">{conference.field}</span> */}
//                 {/* <button className="learn-more-btn">
//                   Learn More →
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllConferences;
import React from 'react';
import './AllConferences.css';

// Image URLs for each field
const fieldImages = {
  "FOOD & AGRI": "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop",
  "MEDICAL": "https://images.unsplash.com/photo-1516549655669-df565bcfbc19?w=400&h=250&fit=crop",
  "LIFE SCIENCES": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
  "SCIENCE & TECHNOLOGY": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
  "PHARMA": "https://images.unsplash.com/photo-1585435557343-3b092031d77a?w=400&h=250&fit=crop",
  "NURSING": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
  "Digi": "https://cdn.sanity.io/images/0vv8moc6/mhe/7fbfb1af70cd235247dcf65e5d4aa94b3d02cd1a-8500x4000.jpg?fit=crop&auto=format",
  "Food": "https://tse4.mm.bing.net/th/id/OIP.o0uJsoIlV3JTZo9K6qEDrQHaE7?pid=Api&P=0&h=180",
  "Medi": "https://wallpaperaccess.com/full/3275630.jpg",
  "Bio": "https://wallpapercave.com/wp/wp9283244.jpg",
  "e": "https://wallpaperaccess.com/full/3310619.jpg",
  "ee": "https://www.idbs.com/wp-content/uploads/2024/01/BL_Blog_Feature_Image_PR_9_Webpage_2048x1152.png",
  "n": "https://tse2.mm.bing.net/th/id/OIP.M-gUvAXPG88mKN_9tx2uBAHaEK?pid=Api&P=0&h=180",
  "Food-Meet": "https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1712835327056-D280SHVHRBB49J5M58TM/CH040421-5.jpg",
  "osaka": "https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
  "tech": "https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg",
  "bio": "https://florenciahealthcare.com/wp-content/uploads/2023/10/Slider-01.jpg",
  "medical": "https://www.pixelstalk.net/wp-content/uploads/images1/Medical-Wallpapers-HD-Free-download.jpg",
  "biocon": "https://thesaudiboom.com/wp-content/uploads/2024/01/1-Saudi-Arabia-Launches-National-Biotechnology-Strategy-To-Become-Global-BioTech-Hub-by-2040-scaled.jpeg",
  "nursing": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlogsZ1LK2PopL1jGerEig3DzWzYk2I8_I3A&s",

  "food-tech-expo":"https://images.yourstory.com/cs/wordpress/2016/03/foodtech.jpg",
  "millets":"https://www.zettafarms.com/wp-content/uploads/2024/01/blog-7.jpg",
  "medicine":"https://cdn.pixabay.com/photo/2023/10/01/14/40/medicine-8287535_1280.jpg",
  "rare":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1rD-4ayjUib1DET_1b2JFcmxrb6ZUcSHkQ&s",
  "energy":"https://sdg.iisd.org/wp-content/uploads/2023/08/cg642.jpg",
  "pharma-access":"https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-digital-remix_53876-126742.jpg",
  "nursing-lead":"https://wallpapers.com/images/hd/beautiful-indian-nurse-05s83ahwccah9a3i.jpg"
};


// 🔗 Add links for specific conferences
const conferenceData = [
  // Food
  {
    field: "Food-Meet",
    title: "Food, Agriculture & Environmental Sciences Forum",
    shortName: "FOODMEET-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain",
    link: "https://foodmeet.helixconferences.com/"
  },
  {
    field: "FOOD & AGRI",
    title: "Food Microbiome Summit",
    shortName: "FOODMICRO-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain"
  },
  // 3
  {
    field: "Food",
    title: "Regenerative AgriTech Forum",
    shortName: "AGRIREGEN-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain"
  },
    {
    field: "food-tech-expo",
    title: "Future FoodTech Expo",
    shortName: "FOODTECH-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain"
  },
  // 5
    {
    field: "millets",
    title: "Millets & Climate-Resilient Agriculture Summit",
    shortName: "MILLETS-2026",
    date: "Apr 23-24 | 2026",
    venue: "Barcelona | Spain"
  },
  // Medical 
// 1
  {
    field: "medical",
    title: "Advanced Medical Practices Conclave",
    shortName: "MEDICLAVE 2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria",
    link: "https://mediclave.helixconferences.com/"
  },
// 2
  {
    field: "Medi",
    title: "Digital Pathology & AI Diagnostics Congress",
    shortName: "DIGIPATH-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria"
  },
  // 3
  {
    field: "MEDICAL",
    title: "Precision Medicine Summit",
    shortName: "PRECISIONMEDICINE-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria"
  },
  // 4
    {
    field: "medicine",
    title: "Aesthetic Medicine & Cosmetic Innovation Summit",
    shortName: "AESTHETICA-2026",
    date: "May 21-22 | 2026",
    venue: "Vienna | Austria"
  },
// Biocon
// 1
  {
    field: "biocon",
    title: "International Conference on Applied Lifesciences",
    shortName: "BIOCON-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands",
    link: "https://biocon.helixconferences.com/"
  },
  //2
  {
    field: "LIFE SCIENCES",
    title: "International Synthetic Biology & Bioengineering Forum",
    shortName: "SYNBIO-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands"
  },
  // 3
  {
    field: "Bio",
    title: "Microbiome Therapeutics Summit",
    shortName: "MICROBIOME-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands"
  },
    {
    field: "rare",
    title: "International Rare Disease & Orphan Drug Congress",
    shortName: "RAREDISEASE-2026",
    date: "Jun 25-26 | 2026",
    venue: "Amsterdam | Netherlands"
  },
  // Qunatam

  {
    field: "tech",
    title: "World Quantam Technology Summit",
    shortName: "QUANTUMTECH-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan",
    link: "https://techmatics.helixconferences.com/"
  },
  {
    field: "SCIENCE & TECHNOLOGY",
    title: "Zero-Trust Security & AI Defense Forum",
    shortName: "ZEROTRUSTAI-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan"
  },
  {
    field: "e",
    title: "Smart Materials, Nanotech & Advanced Manufacturing Congress",
    shortName: "SMARTMATERIALS-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan"
  },
  // 4
    {
    field: "energy",
    title: "Advanced Materials & Clean Energy Forum",
    shortName: "MATENERGY-2026",
    date: "Sep 24-25 | 2026",
    venue: "Osaka | Japan"
  },
// Pharmatech
  {
    field: "bio",
    title: " Advanced Pharmaceutical Sciences Forum",
    shortName: "PHARMTECH-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City",
    link: "https://pharmatech.helixconferences.com/"
  },
  {
    field: "ee",
    title: "AI Drug Discovery Conclave",
    shortName: "AIDRUG-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City"
  },
  {
    field: "n",
    title: "Cell & Gene Therapy Manufacturing Summit",
    shortName: "CELLGENE-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City"
  },
  // 4
   {
    field: "pharma-access",
    title: "Real-World Evidence & Pharma Access Forum",
    shortName: "PHARMACCESS-2026",
    date: "Oct 22-23 | 2026",
    venue: "Singapore | Singapore City"
  },
// Nursing
  {
    field: "nursing",
    title: "Nursing & Nurse Practices Conclave",
    shortName: "NURSESUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE"
  },
  {
    field: "NURSING",
    title: "AI & Digital Nursing Forum",
    shortName: "AINURSE-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE"
  },
  {
    field: "Digi",
    title: "Critical & Emergency Care Summit",
    shortName: "ER-SUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE"
  },
  // 4
    {
    field: "nursing-lead",
    title: "Nursing Leadership & Workforce Excellence Congress",
    shortName: "ER-SUMMIT-2026",
    date: "Nov 19-20 | 2026",
    venue: "Dubai | UAE"
  }
];


const AllConferences = () => {
  return (
    <div className="conferences-container">

      <header className="conferences-header">
        <h1>HELIX CONFERENCES - 2026</h1>
      </header>

      <div className="cards-container">
        {conferenceData.map((conference, index) => (
          <div
            key={index}
            className="conference-card"
            onClick={() => {
              if (conference.link) {
                window.open(conference.link, "_blank");
              } else {
                window.location.reload(); // same page refresh
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="card-image">
              <img
                src={fieldImages[conference.field] || fieldImages["MEDICAL"]}
                alt={conference.field}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop";
                }}
              />
              <div className="image-overlay"></div>
              <div className="date-badge">{conference.date}</div>
            </div>

            <div className="card-content">
              <h3 className="conference-title">{conference.title}</h3>

              <div className="card-details">
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-value">{conference.date}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span className="detail-value">{conference.venue}</span>
                </div>
              </div>

              <div className="card-footer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllConferences;
