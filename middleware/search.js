require("dotenv").config({ path: "./config/.env" });
const axios = require('axios');

function findJobCode(searchTerm) {
  // Assuming jobs is a global variable or accessible in this scope
  const job = jobs.find(job => job.jobtitle === searchTerm);
  if (job) {
      console.log(job.jobcode);
      return job.jobcode;
  } else {
      console.log('Job not found');
      return null; // or handle accordingly
  }
}


async function searchJobs(jobCode) {
  try {
    const apiEndpoint = `https://services.onetcenter.org/ws/mnm/careers/${jobCode}/check_out_my_state`;
    // Replace 'YOUR_API_TOKEN' with your actual API token
    const apiToken = process.env.CHECK_STATE_TOKEN;
    // Set up the headers with Authorization
    const headers = {
      // Authorization: `Basic ${Buffer.from(apiToken).toString('base64')}`,
      Authorization: `Basic ${apiToken}`,
    };
    // Make a GET request to the API endpoint with the specified headers
    // console.log(apiEndpoint, headers)
    const response = await axios.get(apiEndpoint, { headers });
    // Log the JSON data to the console
      //all states
    // console.log(JSON.stringify(response.data, null, 2));
      //only above-average states
    // console.log(JSON.stringify(response.data.above_average.state, null, 2));
    // return JSON.stringify(response.data, null, 2)
    return response.data

  } catch (error) {
    // Handle errors, if any
    console.error('Error fetching data from the API:', error.message);
  }
}



async function getRentData(arr) {

  const rentApiToken = process.env.RENT_API_TOKEN;

  const fetchData = async (v) => {
    try {
      const apiEndpoint = `https://www.huduser.gov/hudapi/public/fmr/statedata/${v}`;
      const headers = {
        Authorization: `Bearer ${rentApiToken}`,
      };

      // Make a GET request to the API endpoint with the specified headers
      const response = await axios.get(apiEndpoint, { headers });

      // Log the response for debugging
      console.log(`RESPONSE FOR ${v}:=============>`, response.data);

      // Return the data from the API response
      return response.data;
    } catch (error) {
      // Handle errors, if any
      console.error(`Error fetching data for ${v} from the API =============>:`, error.message);
      
      // Return a default or placeholder value if needed
      return null;
    }
  };

  try {
    // Use Promise.all to wait for all the async calls to complete
    const resolvedValues = [] 

    for (const v of arr) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const data = await fetchData(v);
      resolvedValues.push(data)
    }

    // // Output the results
    // resolvedValues.forEach((value) => {
    //   console.log(JSON.stringify(value));
    // });

    return resolvedValues.filter(value => value !== null); // Return the data if needed, filtering out null values
  } catch (error) {
    // Handle errors from Promise.all
    console.error('Error in Promise.all:', error.message);
  }
}


module.exports = {
    findJobCode,
    searchJobs,
    getRentData,
};


const jobs = 
[
  {
   "jobtitle": "Accountants and Auditors",
   "jobcode": "13-2011.00"
  },
  {
   "jobtitle": "Actors",
   "jobcode": "27-2011.00"
  },
  {
   "jobtitle": "Actuaries",
   "jobcode": "15-2011.00"
  },
  {
   "jobtitle": "Acupuncturists",
   "jobcode": "29-1291.00"
  },
  {
   "jobtitle": "Acute Care Nurses",
   "jobcode": "29-1141.01"
  },
  {
   "jobtitle": "Adapted Physical Education Specialists",
   "jobcode": "25-2059.01"
  },
  {
   "jobtitle": "Adhesive Bonding Machine Operators and Tenders",
   "jobcode": "51-9191.00"
  },
  {
   "jobtitle": "Administrative Law Judges, Adjudicators, and Hearing Officers",
   "jobcode": "23-1021.00"
  },
  {
   "jobtitle": "Administrative Services Managers",
   "jobcode": "11-3012.00"
  },
  {
   "jobtitle": "Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors",
   "jobcode": "25-3011.00"
  },
  {
   "jobtitle": "Advanced Practice Psychiatric Nurses",
   "jobcode": "29-1141.02"
  },
  {
   "jobtitle": "Advertising and Promotions Managers",
   "jobcode": "11-2011.00"
  },
  {
   "jobtitle": "Advertising Sales Agents",
   "jobcode": "41-3011.00"
  },
  {
   "jobtitle": "Aerospace Engineering and Operations Technologists and Technicians",
   "jobcode": "17-3021.00"
  },
  {
   "jobtitle": "Aerospace Engineers",
   "jobcode": "17-2011.00"
  },
  {
   "jobtitle": "Agents and Business Managers of Artists, Performers, and Athletes",
   "jobcode": "13-1011.00"
  },
  {
   "jobtitle": "Agricultural Engineers",
   "jobcode": "17-2021.00"
  },
  {
   "jobtitle": "Agricultural Equipment Operators",
   "jobcode": "45-2091.00"
  },
  {
   "jobtitle": "Agricultural Inspectors",
   "jobcode": "45-2011.00"
  },
  {
   "jobtitle": "Agricultural Sciences Teachers, Postsecondary",
   "jobcode": "25-1041.00"
  },
  {
   "jobtitle": "Agricultural Technicians",
   "jobcode": "19-4012.00"
  },
  {
   "jobtitle": "Agricultural Workers, All Other",
   "jobcode": "45-2099.00"
  },
  {
   "jobtitle": "Air Crew Members",
   "jobcode": "55-3011.00"
  },
  {
   "jobtitle": "Air Crew Officers",
   "jobcode": "55-1011.00"
  },
  {
   "jobtitle": "Air Traffic Controllers",
   "jobcode": "53-2021.00"
  },
  {
   "jobtitle": "Aircraft Cargo Handling Supervisors",
   "jobcode": "53-1041.00"
  },
  {
   "jobtitle": "Aircraft Launch and Recovery Officers",
   "jobcode": "55-1012.00"
  },
  {
   "jobtitle": "Aircraft Launch and Recovery Specialists",
   "jobcode": "55-3012.00"
  },
  {
   "jobtitle": "Aircraft Mechanics and Service Technicians",
   "jobcode": "49-3011.00"
  },
  {
   "jobtitle": "Aircraft Service Attendants",
   "jobcode": "53-6032.00"
  },
  {
   "jobtitle": "Aircraft Structure, Surfaces, Rigging, and Systems Assemblers",
   "jobcode": "51-2011.00"
  },
  {
   "jobtitle": "Airfield Operations Specialists",
   "jobcode": "53-2022.00"
  },
  {
   "jobtitle": "Airline Pilots, Copilots, and Flight Engineers",
   "jobcode": "53-2011.00"
  },
  {
   "jobtitle": "Allergists and Immunologists",
   "jobcode": "29-1229.01"
  },
  {
   "jobtitle": "Ambulance Drivers and Attendants, Except Emergency Medical Technicians",
   "jobcode": "53-3011.00"
  },
  {
   "jobtitle": "Amusement and Recreation Attendants",
   "jobcode": "39-3091.00"
  },
  {
   "jobtitle": "Anesthesiologist Assistants",
   "jobcode": "29-1071.01"
  },
  {
   "jobtitle": "Anesthesiologists",
   "jobcode": "29-1211.00"
  },
  {
   "jobtitle": "Animal Breeders",
   "jobcode": "45-2021.00"
  },
  {
   "jobtitle": "Animal Caretakers",
   "jobcode": "39-2021.00"
  },
  {
   "jobtitle": "Animal Control Workers",
   "jobcode": "33-9011.00"
  },
  {
   "jobtitle": "Animal Scientists",
   "jobcode": "19-1011.00"
  },
  {
   "jobtitle": "Animal Trainers",
   "jobcode": "39-2011.00"
  },
  {
   "jobtitle": "Anthropologists and Archeologists",
   "jobcode": "19-3091.00"
  },
  {
   "jobtitle": "Anthropology and Archeology Teachers, Postsecondary",
   "jobcode": "25-1061.00"
  },
  {
   "jobtitle": "Appraisers and Assessors of Real Estate",
   "jobcode": "13-2023.00"
  },
  {
   "jobtitle": "Appraisers of Personal and Business Property",
   "jobcode": "13-2022.00"
  },
  {
   "jobtitle": "Arbitrators, Mediators, and Conciliators",
   "jobcode": "23-1022.00"
  },
  {
   "jobtitle": "Architects, Except Landscape and Naval",
   "jobcode": "17-1011.00"
  },
  {
   "jobtitle": "Architectural and Civil Drafters",
   "jobcode": "17-3011.00"
  },
  {
   "jobtitle": "Architectural and Engineering Managers",
   "jobcode": "11-9041.00"
  },
  {
   "jobtitle": "Architecture Teachers, Postsecondary",
   "jobcode": "25-1031.00"
  },
  {
   "jobtitle": "Archivists",
   "jobcode": "25-4011.00"
  },
  {
   "jobtitle": "Area, Ethnic, and Cultural Studies Teachers, Postsecondary",
   "jobcode": "25-1062.00"
  },
  {
   "jobtitle": "Armored Assault Vehicle Crew Members",
   "jobcode": "55-3013.00"
  },
  {
   "jobtitle": "Armored Assault Vehicle Officers",
   "jobcode": "55-1013.00"
  },
  {
   "jobtitle": "Art Directors",
   "jobcode": "27-1011.00"
  },
  {
   "jobtitle": "Art Therapists",
   "jobcode": "29-1129.01"
  },
  {
   "jobtitle": "Art, Drama, and Music Teachers, Postsecondary",
   "jobcode": "25-1121.00"
  },
  {
   "jobtitle": "Artillery and Missile Crew Members",
   "jobcode": "55-3014.00"
  },
  {
   "jobtitle": "Artillery and Missile Officers",
   "jobcode": "55-1014.00"
  },
  {
   "jobtitle": "Artists and Related Workers, All Other",
   "jobcode": "27-1019.00"
  },
  {
   "jobtitle": "Assemblers and Fabricators, All Other",
   "jobcode": "51-2099.00"
  },
  {
   "jobtitle": "Astronomers",
   "jobcode": "19-2011.00"
  },
  {
   "jobtitle": "Athletes and Sports Competitors",
   "jobcode": "27-2021.00"
  },
  {
   "jobtitle": "Athletic Trainers",
   "jobcode": "29-9091.00"
  },
  {
   "jobtitle": "Atmospheric and Space Scientists",
   "jobcode": "19-2021.00"
  },
  {
   "jobtitle": "Atmospheric, Earth, Marine, and Space Sciences Teachers, Postsecondary",
   "jobcode": "25-1051.00"
  },
  {
   "jobtitle": "Audio and Video Technicians",
   "jobcode": "27-4011.00"
  },
  {
   "jobtitle": "Audiologists",
   "jobcode": "29-1181.00"
  },
  {
   "jobtitle": "Audiovisual Equipment Installers and Repairers",
   "jobcode": "49-2097.00"
  },
  {
   "jobtitle": "Automotive and Watercraft Service Attendants",
   "jobcode": "53-6031.00"
  },
  {
   "jobtitle": "Automotive Body and Related Repairers",
   "jobcode": "49-3021.00"
  },
  {
   "jobtitle": "Automotive Engineering Technicians",
   "jobcode": "17-3027.01"
  },
  {
   "jobtitle": "Automotive Engineers",
   "jobcode": "17-2141.02"
  },
  {
   "jobtitle": "Automotive Glass Installers and Repairers",
   "jobcode": "49-3022.00"
  },
  {
   "jobtitle": "Automotive Service Technicians and Mechanics",
   "jobcode": "49-3023.00"
  },
  {
   "jobtitle": "Aviation Inspectors",
   "jobcode": "53-6051.01"
  },
  {
   "jobtitle": "Avionics Technicians",
   "jobcode": "49-2091.00"
  },
  {
   "jobtitle": "Baggage Porters and Bellhops",
   "jobcode": "39-6011.00"
  },
  {
   "jobtitle": "Bailiffs",
   "jobcode": "33-3011.00"
  },
  {
   "jobtitle": "Bakers",
   "jobcode": "51-3011.00"
  },
  {
   "jobtitle": "Barbers",
   "jobcode": "39-5011.00"
  },
  {
   "jobtitle": "Baristas",
   "jobcode": "35-3023.01"
  },
  {
   "jobtitle": "Bartenders",
   "jobcode": "35-3011.00"
  },
  {
   "jobtitle": "Bicycle Repairers",
   "jobcode": "49-3091.00"
  },
  {
   "jobtitle": "Bill and Account Collectors",
   "jobcode": "43-3011.00"
  },
  {
   "jobtitle": "Billing and Posting Clerks",
   "jobcode": "43-3021.00"
  },
  {
   "jobtitle": "Biochemists and Biophysicists",
   "jobcode": "19-1021.00"
  },
  {
   "jobtitle": "Bioengineers and Biomedical Engineers",
   "jobcode": "17-2031.00"
  },
  {
   "jobtitle": "Biofuels Processing Technicians",
   "jobcode": "51-8099.01"
  },
  {
   "jobtitle": "Biofuels Production Managers",
   "jobcode": "11-3051.03"
  },
  {
   "jobtitle": "Biofuels/Biodiesel Technology and Product Development Managers",
   "jobcode": "11-9041.01"
  },
  {
   "jobtitle": "Bioinformatics Scientists",
   "jobcode": "19-1029.01"
  },
  {
   "jobtitle": "Bioinformatics Technicians",
   "jobcode": "15-2099.01"
  },
  {
   "jobtitle": "Biological Science Teachers, Postsecondary",
   "jobcode": "25-1042.00"
  },
  {
   "jobtitle": "Biological Scientists, All Other",
   "jobcode": "19-1029.00"
  },
  {
   "jobtitle": "Biological Technicians",
   "jobcode": "19-4021.00"
  },
  {
   "jobtitle": "Biologists",
   "jobcode": "19-1029.04"
  },
  {
   "jobtitle": "Biomass Plant Technicians",
   "jobcode": "51-8013.03"
  },
  {
   "jobtitle": "Biomass Power Plant Managers",
   "jobcode": "11-3051.04"
  },
  {
   "jobtitle": "Biostatisticians",
   "jobcode": "15-2041.01"
  },
  {
   "jobtitle": "Blockchain Engineers",
   "jobcode": "15-1299.07"
  },
  {
   "jobtitle": "Boilermakers",
   "jobcode": "47-2011.00"
  },
  {
   "jobtitle": "Bookkeeping, Accounting, and Auditing Clerks",
   "jobcode": "43-3031.00"
  },
  {
   "jobtitle": "Brickmasons and Blockmasons",
   "jobcode": "47-2021.00"
  },
  {
   "jobtitle": "Bridge and Lock Tenders",
   "jobcode": "53-6011.00"
  },
  {
   "jobtitle": "Broadcast Announcers and Radio Disc Jockeys",
   "jobcode": "27-3011.00"
  },
  {
   "jobtitle": "Broadcast Technicians",
   "jobcode": "27-4012.00"
  },
  {
   "jobtitle": "Brokerage Clerks",
   "jobcode": "43-4011.00"
  },
  {
   "jobtitle": "Brownfield Redevelopment Specialists and Site Managers",
   "jobcode": "11-9199.11"
  },
  {
   "jobtitle": "Budget Analysts",
   "jobcode": "13-2031.00"
  },
  {
   "jobtitle": "Building Cleaning Workers, All Other",
   "jobcode": "37-2019.00"
  },
  {
   "jobtitle": "Bus and Truck Mechanics and Diesel Engine Specialists",
   "jobcode": "49-3031.00"
  },
  {
   "jobtitle": "Bus Drivers, School",
   "jobcode": "53-3051.00"
  },
  {
   "jobtitle": "Bus Drivers, Transit and Intercity",
   "jobcode": "53-3052.00"
  },
  {
   "jobtitle": "Business Continuity Planners",
   "jobcode": "13-1199.04"
  },
  {
   "jobtitle": "Business Intelligence Analysts",
   "jobcode": "15-2051.01"
  },
  {
   "jobtitle": "Business Operations Specialists, All Other",
   "jobcode": "13-1199.00"
  },
  {
   "jobtitle": "Business Teachers, Postsecondary",
   "jobcode": "25-1011.00"
  },
  {
   "jobtitle": "Butchers and Meat Cutters",
   "jobcode": "51-3021.00"
  },
  {
   "jobtitle": "Buyers and Purchasing Agents, Farm Products",
   "jobcode": "13-1021.00"
  },
  {
   "jobtitle": "Cabinetmakers and Bench Carpenters",
   "jobcode": "51-7011.00"
  },
  {
   "jobtitle": "Calibration Technologists and Technicians",
   "jobcode": "17-3028.00"
  },
  {
   "jobtitle": "Camera and Photographic Equipment Repairers",
   "jobcode": "49-9061.00"
  },
  {
   "jobtitle": "Camera Operators, Television, Video, and Film",
   "jobcode": "27-4031.00"
  },
  {
   "jobtitle": "Captains, Mates, and Pilots of Water Vessels",
   "jobcode": "53-5021.00"
  },
  {
   "jobtitle": "Cardiologists",
   "jobcode": "29-1212.00"
  },
  {
   "jobtitle": "Cardiovascular Technologists and Technicians",
   "jobcode": "29-2031.00"
  },
  {
   "jobtitle": "Career/Technical Education Teachers, Middle School",
   "jobcode": "25-2023.00"
  },
  {
   "jobtitle": "Career/Technical Education Teachers, Postsecondary",
   "jobcode": "25-1194.00"
  },
  {
   "jobtitle": "Career/Technical Education Teachers, Secondary School",
   "jobcode": "25-2032.00"
  },
  {
   "jobtitle": "Cargo and Freight Agents",
   "jobcode": "43-5011.00"
  },
  {
   "jobtitle": "Carpenters",
   "jobcode": "47-2031.00"
  },
  {
   "jobtitle": "Carpet Installers",
   "jobcode": "47-2041.00"
  },
  {
   "jobtitle": "Cartographers and Photogrammetrists",
   "jobcode": "17-1021.00"
  },
  {
   "jobtitle": "Cashiers",
   "jobcode": "41-2011.00"
  },
  {
   "jobtitle": "Cement Masons and Concrete Finishers",
   "jobcode": "47-2051.00"
  },
  {
   "jobtitle": "Chefs and Head Cooks",
   "jobcode": "35-1011.00"
  },
  {
   "jobtitle": "Chemical Engineers",
   "jobcode": "17-2041.00"
  },
  {
   "jobtitle": "Chemical Equipment Operators and Tenders",
   "jobcode": "51-9011.00"
  },
  {
   "jobtitle": "Chemical Plant and System Operators",
   "jobcode": "51-8091.00"
  },
  {
   "jobtitle": "Chemical Technicians",
   "jobcode": "19-4031.00"
  },
  {
   "jobtitle": "Chemistry Teachers, Postsecondary",
   "jobcode": "25-1052.00"
  },
  {
   "jobtitle": "Chemists",
   "jobcode": "19-2031.00"
  },
  {
   "jobtitle": "Chief Executives",
   "jobcode": "11-1011.00"
  },
  {
   "jobtitle": "Chief Sustainability Officers",
   "jobcode": "11-1011.03"
  },
  {
   "jobtitle": "Child, Family, and School Social Workers",
   "jobcode": "21-1021.00"
  },
  {
   "jobtitle": "Childcare Workers",
   "jobcode": "39-9011.00"
  },
  {
   "jobtitle": "Chiropractors",
   "jobcode": "29-1011.00"
  },
  {
   "jobtitle": "Choreographers",
   "jobcode": "27-2032.00"
  },
  {
   "jobtitle": "Civil Engineering Technologists and Technicians",
   "jobcode": "17-3022.00"
  },
  {
   "jobtitle": "Civil Engineers",
   "jobcode": "17-2051.00"
  },
  {
   "jobtitle": "Claims Adjusters, Examiners, and Investigators",
   "jobcode": "13-1031.00"
  },
  {
   "jobtitle": "Cleaners of Vehicles and Equipment",
   "jobcode": "53-7061.00"
  },
  {
   "jobtitle": "Cleaning, Washing, and Metal Pickling Equipment Operators and Tenders",
   "jobcode": "51-9192.00"
  },
  {
   "jobtitle": "Clergy",
   "jobcode": "21-2011.00"
  },
  {
   "jobtitle": "Climate Change Policy Analysts",
   "jobcode": "19-2041.01"
  },
  {
   "jobtitle": "Clinical and Counseling Psychologists",
   "jobcode": "19-3033.00"
  },
  {
   "jobtitle": "Clinical Data Managers",
   "jobcode": "15-2051.02"
  },
  {
   "jobtitle": "Clinical Neuropsychologists",
   "jobcode": "19-3039.03"
  },
  {
   "jobtitle": "Clinical Nurse Specialists",
   "jobcode": "29-1141.04"
  },
  {
   "jobtitle": "Clinical Research Coordinators",
   "jobcode": "11-9121.01"
  },
  {
   "jobtitle": "Coaches and Scouts",
   "jobcode": "27-2022.00"
  },
  {
   "jobtitle": "Coating, Painting, and Spraying Machine Setters, Operators, and Tenders",
   "jobcode": "51-9124.00"
  },
  {
   "jobtitle": "Coil Winders, Tapers, and Finishers",
   "jobcode": "51-2021.00"
  },
  {
   "jobtitle": "Coin, Vending, and Amusement Machine Servicers and Repairers",
   "jobcode": "49-9091.00"
  },
  {
   "jobtitle": "Command and Control Center Officers",
   "jobcode": "55-1015.00"
  },
  {
   "jobtitle": "Command and Control Center Specialists",
   "jobcode": "55-3015.00"
  },
  {
   "jobtitle": "Commercial and Industrial Designers",
   "jobcode": "27-1021.00"
  },
  {
   "jobtitle": "Commercial Divers",
   "jobcode": "49-9092.00"
  },
  {
   "jobtitle": "Commercial Pilots",
   "jobcode": "53-2012.00"
  },
  {
   "jobtitle": "Communications Equipment Operators, All Other",
   "jobcode": "43-2099.00"
  },
  {
   "jobtitle": "Communications Teachers, Postsecondary",
   "jobcode": "25-1122.00"
  },
  {
   "jobtitle": "Community and Social Service Specialists, All Other",
   "jobcode": "21-1099.00"
  },
  {
   "jobtitle": "Community Health Workers",
   "jobcode": "21-1094.00"
  },
  {
   "jobtitle": "Compensation and Benefits Managers",
   "jobcode": "11-3111.00"
  },
  {
   "jobtitle": "Compensation, Benefits, and Job Analysis Specialists",
   "jobcode": "13-1141.00"
  },
  {
   "jobtitle": "Compliance Managers",
   "jobcode": "11-9199.02"
  },
  {
   "jobtitle": "Compliance Officers",
   "jobcode": "13-1041.00"
  },
  {
   "jobtitle": "Computer and Information Research Scientists",
   "jobcode": "15-1221.00"
  },
  {
   "jobtitle": "Computer and Information Systems Managers",
   "jobcode": "11-3021.00"
  },
  {
   "jobtitle": "Computer Hardware Engineers",
   "jobcode": "17-2061.00"
  },
  {
   "jobtitle": "Computer Network Architects",
   "jobcode": "15-1241.00"
  },
  {
   "jobtitle": "Computer Network Support Specialists",
   "jobcode": "15-1231.00"
  },
  {
   "jobtitle": "Computer Numerically Controlled Tool Operators",
   "jobcode": "51-9161.00"
  },
  {
   "jobtitle": "Computer Numerically Controlled Tool Programmers",
   "jobcode": "51-9162.00"
  },
  {
   "jobtitle": "Computer Occupations, All Other",
   "jobcode": "15-1299.00"
  },
  {
   "jobtitle": "Computer Programmers",
   "jobcode": "15-1251.00"
  },
  {
   "jobtitle": "Computer Science Teachers, Postsecondary",
   "jobcode": "25-1021.00"
  },
  {
   "jobtitle": "Computer Systems Analysts",
   "jobcode": "15-1211.00"
  },
  {
   "jobtitle": "Computer Systems Engineers/Architects",
   "jobcode": "15-1299.08"
  },
  {
   "jobtitle": "Computer User Support Specialists",
   "jobcode": "15-1232.00"
  },
  {
   "jobtitle": "Computer, Automated Teller, and Office Machine Repairers",
   "jobcode": "49-2011.00"
  },
  {
   "jobtitle": "Concierges",
   "jobcode": "39-6012.00"
  },
  {
   "jobtitle": "Conservation Scientists",
   "jobcode": "19-1031.00"
  },
  {
   "jobtitle": "Construction and Building Inspectors",
   "jobcode": "47-4011.00"
  },
  {
   "jobtitle": "Construction and Related Workers, All Other",
   "jobcode": "47-4099.00"
  },
  {
   "jobtitle": "Construction Laborers",
   "jobcode": "47-2061.00"
  },
  {
   "jobtitle": "Construction Managers",
   "jobcode": "11-9021.00"
  },
  {
   "jobtitle": "Continuous Mining Machine Operators",
   "jobcode": "47-5041.00"
  },
  {
   "jobtitle": "Control and Valve Installers and Repairers, Except Mechanical Door",
   "jobcode": "49-9012.00"
  },
  {
   "jobtitle": "Conveyor Operators and Tenders",
   "jobcode": "53-7011.00"
  },
  {
   "jobtitle": "Cooks, All Other",
   "jobcode": "35-2019.00"
  },
  {
   "jobtitle": "Cooks, Fast Food",
   "jobcode": "35-2011.00"
  },
  {
   "jobtitle": "Cooks, Institution and Cafeteria",
   "jobcode": "35-2012.00"
  },
  {
   "jobtitle": "Cooks, Private Household",
   "jobcode": "35-2013.00"
  },
  {
   "jobtitle": "Cooks, Restaurant",
   "jobcode": "35-2014.00"
  },
  {
   "jobtitle": "Cooks, Short Order",
   "jobcode": "35-2015.00"
  },
  {
   "jobtitle": "Cooling and Freezing Equipment Operators and Tenders",
   "jobcode": "51-9193.00"
  },
  {
   "jobtitle": "Coroners",
   "jobcode": "13-1041.06"
  },
  {
   "jobtitle": "Correctional Officers and Jailers",
   "jobcode": "33-3012.00"
  },
  {
   "jobtitle": "Correspondence Clerks",
   "jobcode": "43-4021.00"
  },
  {
   "jobtitle": "Cost Estimators",
   "jobcode": "13-1051.00"
  },
  {
   "jobtitle": "Costume Attendants",
   "jobcode": "39-3092.00"
  },
  {
   "jobtitle": "Counselors, All Other",
   "jobcode": "21-1019.00"
  },
  {
   "jobtitle": "Counter and Rental Clerks",
   "jobcode": "41-2021.00"
  },
  {
   "jobtitle": "Couriers and Messengers",
   "jobcode": "43-5021.00"
  },
  {
   "jobtitle": "Court Reporters and Simultaneous Captioners",
   "jobcode": "27-3092.00"
  },
  {
   "jobtitle": "Court, Municipal, and License Clerks",
   "jobcode": "43-4031.00"
  },
  {
   "jobtitle": "Craft Artists",
   "jobcode": "27-1012.00"
  },
  {
   "jobtitle": "Crane and Tower Operators",
   "jobcode": "53-7021.00"
  },
  {
   "jobtitle": "Credit Analysts",
   "jobcode": "13-2041.00"
  },
  {
   "jobtitle": "Credit Authorizers, Checkers, and Clerks",
   "jobcode": "43-4041.00"
  },
  {
  "jobtitle": "Credit Counselors",
  "jobcode": "13-2071.00"
  },
  {
  "jobtitle": "Crematory Operators",
  "jobcode": "39-4012.00"
  },
  {
  "jobtitle": "Criminal Justice and Law Enforcement Teachers, Postsecondary",
  "jobcode": "25-1111.00"
  },
  {
  "jobtitle": "Critical Care Nurses",
  "jobcode": "29-1141.03"
  },
  {
  "jobtitle": "Crossing Guards and Flaggers",
  "jobcode": "33-9091.00"
  },
  {
  "jobtitle": "Crushing, Grinding, and Polishing Machine Setters, Operators, and Tenders",
  "jobcode": "51-9021.00"
  },
  {
  "jobtitle": "Curators",
  "jobcode": "25-4012.00"
  },
  {
  "jobtitle": "Customer Service Representatives",
  "jobcode": "43-4051.00"
  },
  {
  "jobtitle": "Customs and Border Protection Officers",
  "jobcode": "33-3051.04"
  },
  {
  "jobtitle": "Customs Brokers",
  "jobcode": "13-1041.08"
  },
  {
  "jobtitle": "Cutters and Trimmers, Hand",
  "jobcode": "51-9031.00"
  },
  {
  "jobtitle": "Cutting and Slicing Machine Setters, Operators, and Tenders",
  "jobcode": "51-9032.00"
  },
  {
  "jobtitle": "Cutting, Punching, and Press Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4031.00"
  },
  {
  "jobtitle": "Cytogenetic Technologists",
  "jobcode": "29-2011.01"
  },
  {
  "jobtitle": "Cytotechnologists",
  "jobcode": "29-2011.02"
  },
  {
  "jobtitle": "Dancers",
  "jobcode": "27-2031.00"
  },
  {
  "jobtitle": "Data Entry Keyers",
  "jobcode": "43-9021.00"
  },
  {
  "jobtitle": "Data Scientists",
  "jobcode": "15-2051.00"
  },
  {
  "jobtitle": "Data Warehousing Specialists",
  "jobcode": "15-1243.01"
  },
  {
  "jobtitle": "Database Administrators",
  "jobcode": "15-1242.00"
  },
  {
  "jobtitle": "Database Architects",
  "jobcode": "15-1243.00"
  },
  {
  "jobtitle": "Demonstrators and Product Promoters",
  "jobcode": "41-9011.00"
  },
  {
  "jobtitle": "Dental Assistants",
  "jobcode": "31-9091.00"
  },
  {
  "jobtitle": "Dental Hygienists",
  "jobcode": "29-1292.00"
  },
  {
  "jobtitle": "Dental Laboratory Technicians",
  "jobcode": "51-9081.00"
  },
  {
  "jobtitle": "Dentists, All Other Specialists",
  "jobcode": "29-1029.00"
  },
  {
  "jobtitle": "Dentists, General",
  "jobcode": "29-1021.00"
  },
  {
  "jobtitle": "Dermatologists",
  "jobcode": "29-1213.00"
  },
  {
  "jobtitle": "Derrick Operators, Oil and Gas",
  "jobcode": "47-5011.00"
  },
  {
  "jobtitle": "Designers, All Other",
  "jobcode": "27-1029.00"
  },
  {
  "jobtitle": "Desktop Publishers",
  "jobcode": "43-9031.00"
  },
  {
  "jobtitle": "Detectives and Criminal Investigators",
  "jobcode": "33-3021.00"
  },
  {
  "jobtitle": "Diagnostic Medical Sonographers",
  "jobcode": "29-2032.00"
  },
  {
  "jobtitle": "Dietetic Technicians",
  "jobcode": "29-2051.00"
  },
  {
  "jobtitle": "Dietitians and Nutritionists",
  "jobcode": "29-1031.00"
  },
  {
  "jobtitle": "Digital Forensics Analysts",
  "jobcode": "15-1299.06"
  },
  {
  "jobtitle": "Dining Room and Cafeteria Attendants and Bartender Helpers",
  "jobcode": "35-9011.00"
  },
  {
  "jobtitle": "Directors, Religious Activities and Education",
  "jobcode": "21-2021.00"
  },
  {
  "jobtitle": "Disc Jockeys, Except Radio",
  "jobcode": "27-2091.00"
  },
  {
  "jobtitle": "Dishwashers",
  "jobcode": "35-9021.00"
  },
  {
  "jobtitle": "Dispatchers, Except Police, Fire, and Ambulance",
  "jobcode": "43-5032.00"
  },
  {
  "jobtitle": "Document Management Specialists",
  "jobcode": "15-1299.03"
  },
  {
  "jobtitle": "Door-to-Door Sales Workers, News and Street Vendors, and Related Workers",
  "jobcode": "41-9091.00"
  },
  {
  "jobtitle": "Drafters, All Other",
  "jobcode": "17-3019.00"
  },
  {
  "jobtitle": "Dredge Operators",
  "jobcode": "53-7031.00"
  },
  {
  "jobtitle": "Drilling and Boring Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4032.00"
  },
  {
  "jobtitle": "Driver/Sales Workers",
  "jobcode": "53-3031.00"
  },
  {
  "jobtitle": "Drywall and Ceiling Tile Installers",
  "jobcode": "47-2081.00"
  },
  {
  "jobtitle": "Earth Drillers, Except Oil and Gas",
  "jobcode": "47-5023.00"
  },
  {
  "jobtitle": "Economics Teachers, Postsecondary",
  "jobcode": "25-1063.00"
  },
  {
  "jobtitle": "Economists",
  "jobcode": "19-3011.00"
  },
  {
  "jobtitle": "Editors",
  "jobcode": "27-3041.00"
  },
  {
  "jobtitle": "Education Administrators, All Other",
  "jobcode": "11-9039.00"
  },
  {
  "jobtitle": "Education Administrators, Kindergarten through Secondary",
  "jobcode": "11-9032.00"
  },
  {
  "jobtitle": "Education Administrators, Postsecondary",
  "jobcode": "11-9033.00"
  },
  {
  "jobtitle": "Education and Childcare Administrators, Preschool and Daycare",
  "jobcode": "11-9031.00"
  },
  {
  "jobtitle": "Education Teachers, Postsecondary",
  "jobcode": "25-1081.00"
  },
  {
  "jobtitle": "Educational Instruction and Library Workers, All Other",
  "jobcode": "25-9099.00"
  },
  {
  "jobtitle": "Educational, Guidance, and Career Counselors and Advisors",
  "jobcode": "21-1012.00"
  },
  {
  "jobtitle": "Electric Motor, Power Tool, and Related Repairers",
  "jobcode": "49-2092.00"
  },
  {
  "jobtitle": "Electrical and Electronic Engineering Technologists and Technicians",
  "jobcode": "17-3023.00"
  },
  {
  "jobtitle": "Electrical and Electronic Equipment Assemblers",
  "jobcode": "51-2022.00"
  },
  {
  "jobtitle": "Electrical and Electronics Drafters",
  "jobcode": "17-3012.00"
  },
  {
  "jobtitle": "Electrical and Electronics Installers and Repairers, Transportation Equipment",
  "jobcode": "49-2093.00"
  },
  {
  "jobtitle": "Electrical and Electronics Repairers, Commercial and Industrial Equipment",
  "jobcode": "49-2094.00"
  },
  {
  "jobtitle": "Electrical and Electronics Repairers, Powerhouse, Substation, and Relay",
  "jobcode": "49-2095.00"
  },
  {
  "jobtitle": "Electrical Engineers",
  "jobcode": "17-2071.00"
  },
  {
  "jobtitle": "Electrical Power-Line Installers and Repairers",
  "jobcode": "49-9051.00"
  },
  {
  "jobtitle": "Electricians",
  "jobcode": "47-2111.00"
  },
  {
  "jobtitle": "Electro-Mechanical and Mechatronics Technologists and Technicians",
  "jobcode": "17-3024.00"
  },
  {
  "jobtitle": "Electromechanical Equipment Assemblers",
  "jobcode": "51-2023.00"
  },
  {
  "jobtitle": "Electronic Equipment Installers and Repairers, Motor Vehicles",
  "jobcode": "49-2096.00"
  },
  {
  "jobtitle": "Electronics Engineers, Except Computer",
  "jobcode": "17-2072.00"
  },
  {
  "jobtitle": "Elementary School Teachers, Except Special Education",
  "jobcode": "25-2021.00"
  },
  {
  "jobtitle": "Elevator and Escalator Installers and Repairers",
  "jobcode": "47-4021.00"
  },
  {
  "jobtitle": "Eligibility Interviewers, Government Programs",
  "jobcode": "43-4061.00"
  },
  {
  "jobtitle": "Embalmers",
  "jobcode": "39-4011.00"
  },
  {
  "jobtitle": "Emergency Management Directors",
  "jobcode": "11-9161.00"
  },
  {
  "jobtitle": "Emergency Medical Technicians",
  "jobcode": "29-2042.00"
  },
  {
  "jobtitle": "Emergency Medicine Physicians",
  "jobcode": "29-1214.00"
  },
  {
  "jobtitle": "Endoscopy Technicians",
  "jobcode": "31-9099.02"
  },
  {
  "jobtitle": "Energy Auditors",
  "jobcode": "47-4011.01"
  },
  {
  "jobtitle": "Energy Engineers, Except Wind and Solar",
  "jobcode": "17-2199.03"
  },
  {
  "jobtitle": "Engine and Other Machine Assemblers",
  "jobcode": "51-2031.00"
  },
  {
  "jobtitle": "Engineering Teachers, Postsecondary",
  "jobcode": "25-1032.00"
  },
  {
  "jobtitle": "Engineering Technologists and Technicians, Except Drafters, All Other",
  "jobcode": "17-3029.00"
  },
  {
  "jobtitle": "Engineers, All Other",
  "jobcode": "17-2199.00"
  },
  {
  "jobtitle": "English Language and Literature Teachers, Postsecondary",
  "jobcode": "25-1123.00"
  },
  {
  "jobtitle": "Entertainers and Performers, Sports and Related Workers, All Other",
  "jobcode": "27-2099.00"
  },
  {
  "jobtitle": "Entertainment and Recreation Managers, Except Gambling",
  "jobcode": "11-9072.00"
  },
  {
  "jobtitle": "Entertainment Attendants and Related Workers, All Other",
  "jobcode": "39-3099.00"
  },
  {
  "jobtitle": "Environmental Compliance Inspectors",
  "jobcode": "13-1041.01"
  },
  {
  "jobtitle": "Environmental Economists",
  "jobcode": "19-3011.01"
  },
  {
  "jobtitle": "Environmental Engineering Technologists and Technicians",
  "jobcode": "17-3025.00"
  },
  {
  "jobtitle": "Environmental Engineers",
  "jobcode": "17-2081.00"
  },
  {
  "jobtitle": "Environmental Restoration Planners",
  "jobcode": "19-2041.02"
  },
  {
  "jobtitle": "Environmental Science and Protection Technicians, Including Health",
  "jobcode": "19-4042.00"
  },
  {
  "jobtitle": "Environmental Science Teachers, Postsecondary",
  "jobcode": "25-1053.00"
  },
  {
  "jobtitle": "Environmental Scientists and Specialists, Including Health",
  "jobcode": "19-2041.00"
  },
  {
  "jobtitle": "Epidemiologists",
  "jobcode": "19-1041.00"
  },
  {
  "jobtitle": "Equal Opportunity Representatives and Officers",
  "jobcode": "13-1041.03"
  },
  {
  "jobtitle": "Etchers and Engravers",
  "jobcode": "51-9194.00"
  },
  {
  "jobtitle": "Excavating and Loading Machine and Dragline Operators, Surface Mining",
  "jobcode": "47-5022.00"
  },
  {
  "jobtitle": "Executive Secretaries and Executive Administrative Assistants",
  "jobcode": "43-6011.00"
  },
  {
  "jobtitle": "Exercise Physiologists",
  "jobcode": "29-1128.00"
  },
  {
  "jobtitle": "Exercise Trainers and Group Fitness Instructors",
  "jobcode": "39-9031.00"
  },
  {
  "jobtitle": "Explosives Workers, Ordnance Handling Experts, and Blasters",
  "jobcode": "47-5032.00"
  },
  {
  "jobtitle": "Extraction Workers, All Other",
  "jobcode": "47-5099.00"
  },
  {
  "jobtitle": "Extruding and Drawing Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4021.00"
  },
  {
  "jobtitle": "Extruding and Forming Machine Setters, Operators, and Tenders, Synthetic and Glass Fibers",
  "jobcode": "51-6091.00"
  },
  {
  "jobtitle": "Extruding, Forming, Pressing, and Compacting Machine Setters, Operators, and Tenders",
  "jobcode": "51-9041.00"
  },
  {
  "jobtitle": "Fabric and Apparel Patternmakers",
  "jobcode": "51-6092.00"
  },
  {
  "jobtitle": "Facilities Managers",
  "jobcode": "11-3013.00"
  },
  {
  "jobtitle": "Fallers",
  "jobcode": "45-4021.00"
  },
  {
  "jobtitle": "Family and Consumer Sciences Teachers, Postsecondary",
  "jobcode": "25-1192.00"
  },
  {
  "jobtitle": "Family Medicine Physicians",
  "jobcode": "29-1215.00"
  },
  {
  "jobtitle": "Farm and Home Management Educators",
  "jobcode": "25-9021.00"
  },
  {
  "jobtitle": "Farm Equipment Mechanics and Service Technicians",
  "jobcode": "49-3041.00"
  },
  {
  "jobtitle": "Farm Labor Contractors",
  "jobcode": "13-1074.00"
  },
  {
  "jobtitle": "Farmers, Ranchers, and Other Agricultural Managers",
  "jobcode": "11-9013.00"
  },
  {
  "jobtitle": "Farmworkers and Laborers, Crop, Nursery, and Greenhouse",
  "jobcode": "45-2092.00"
  },
  {
  "jobtitle": "Farmworkers, Farm, Ranch, and Aquacultural Animals",
  "jobcode": "45-2093.00"
  },
  {
  "jobtitle": "Fashion Designers",
  "jobcode": "27-1022.00"
  },
  {
  "jobtitle": "Fast Food and Counter Workers",
  "jobcode": "35-3023.00"
  },
  {
  "jobtitle": "Fence Erectors",
  "jobcode": "47-4031.00"
  },
  {
  "jobtitle": "Fiberglass Laminators and Fabricators",
  "jobcode": "51-2051.00"
  },
  {
  "jobtitle": "File Clerks",
  "jobcode": "43-4071.00"
  },
  {
  "jobtitle": "Film and Video Editors",
  "jobcode": "27-4032.00"
  },
  {
  "jobtitle": "Financial and Investment Analysts",
  "jobcode": "13-2051.00"
  },
  {
  "jobtitle": "Financial Clerks, All Other",
  "jobcode": "43-3099.00"
  },
  {
  "jobtitle": "Financial Examiners",
  "jobcode": "13-2061.00"
  },
  {
  "jobtitle": "Financial Managers",
  "jobcode": "11-3031.00"
  },
  {
  "jobtitle": "Financial Quantitative Analysts",
  "jobcode": "13-2099.01"
  },
  {
  "jobtitle": "Financial Risk Specialists",
  "jobcode": "13-2054.00"
  },
  {
  "jobtitle": "Financial Specialists, All Other",
  "jobcode": "13-2099.00"
  },
  {
  "jobtitle": "Fine Artists, Including Painters, Sculptors, and Illustrators",
  "jobcode": "27-1013.00"
  },
  {
  "jobtitle": "Fire Inspectors and Investigators",
  "jobcode": "33-2021.00"
  },
  {
  "jobtitle": "Fire-Prevention and Protection Engineers",
  "jobcode": "17-2111.02"
  },
  {
  "jobtitle": "Firefighters",
  "jobcode": "33-2011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Air Crew Members",
  "jobcode": "55-2011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of All Other Tactical Operations Specialists",
  "jobcode": "55-2013.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Construction Trades and Extraction Workers",
  "jobcode": "47-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Correctional Officers",
  "jobcode": "33-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Entertainment and Recreation Workers, Except Gambling Services",
  "jobcode": "39-1014.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Farming, Fishing, and Forestry Workers",
  "jobcode": "45-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Firefighting and Prevention Workers",
  "jobcode": "33-1021.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Food Preparation and Serving Workers",
  "jobcode": "35-1012.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Gambling Services Workers",
  "jobcode": "39-1013.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Helpers, Laborers, and Material Movers, Hand",
  "jobcode": "53-1042.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Housekeeping and Janitorial Workers",
  "jobcode": "37-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Landscaping, Lawn Service, and Groundskeeping Workers",
  "jobcode": "37-1012.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Material-Moving Machine and Vehicle Operators",
  "jobcode": "53-1043.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Mechanics, Installers, and Repairers",
  "jobcode": "49-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Non-Retail Sales Workers",
  "jobcode": "41-1012.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Office and Administrative Support Workers",
  "jobcode": "43-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Passenger Attendants",
  "jobcode": "53-1044.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Personal Service Workers",
  "jobcode": "39-1022.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Police and Detectives",
  "jobcode": "33-1012.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Production and Operating Workers",
  "jobcode": "51-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Protective Service Workers, All Other",
  "jobcode": "33-1099.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Retail Sales Workers",
  "jobcode": "41-1011.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Security Workers",
  "jobcode": "33-1091.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Transportation Workers, All Other",
  "jobcode": "53-1049.00"
  },
  {
  "jobtitle": "First-Line Supervisors of Weapons Specialists/Crew Members",
  "jobcode": "55-2012.00"
  },
  {
  "jobtitle": "Fish and Game Wardens",
  "jobcode": "33-3031.00"
  },
  {
  "jobtitle": "Fishing and Hunting Workers",
  "jobcode": "45-3031.00"
  },
  {
  "jobtitle": "Fitness and Wellness Coordinators",
  "jobcode": "11-9179.01"
  },
  {
  "jobtitle": "Flight Attendants",
  "jobcode": "53-2031.00"
  },
  {
  "jobtitle": "Floor Layers, Except Carpet, Wood, and Hard Tiles",
  "jobcode": "47-2042.00"
  },
  {
  "jobtitle": "Floor Sanders and Finishers",
  "jobcode": "47-2043.00"
  },
  {
  "jobtitle": "Floral Designers",
  "jobcode": "27-1023.00"
  },
  {
  "jobtitle": "Food and Tobacco Roasting, Baking, and Drying Machine Operators and Tenders",
  "jobcode": "51-3091.00"
  },
  {
  "jobtitle": "Food Batchmakers",
  "jobcode": "51-3092.00"
  },
  {
  "jobtitle": "Food Cooking Machine Operators and Tenders",
  "jobcode": "51-3093.00"
  },
  {
  "jobtitle": "Food Preparation and Serving Related Workers, All Other",
  "jobcode": "35-9099.00"
  },
  {
  "jobtitle": "Food Preparation Workers",
  "jobcode": "35-2021.00"
  },
  {
  "jobtitle": "Food Processing Workers, All Other",
  "jobcode": "51-3099.00"
  },
  {
  "jobtitle": "Food Science Technicians",
  "jobcode": "19-4013.00"
  },
  {
  "jobtitle": "Food Scientists and Technologists",
  "jobcode": "19-1012.00"
  },
  {
  "jobtitle": "Food Servers, Nonrestaurant",
  "jobcode": "35-3041.00"
  },
  {
  "jobtitle": "Food Service Managers",
  "jobcode": "11-9051.00"
  },
  {
  "jobtitle": "Foreign Language and Literature Teachers, Postsecondary",
  "jobcode": "25-1124.00"
  },
  {
  "jobtitle": "Forensic Science Technicians",
  "jobcode": "19-4092.00"
  },
  {
  "jobtitle": "Forest and Conservation Technicians",
  "jobcode": "19-4071.00"
  },
  {
  "jobtitle": "Forest and Conservation Workers",
  "jobcode": "45-4011.00"
  },
  {
  "jobtitle": "Forest Fire Inspectors and Prevention Specialists",
  "jobcode": "33-2022.00"
  },
  {
  "jobtitle": "Foresters",
  "jobcode": "19-1032.00"
  },
  {
  "jobtitle": "Forestry and Conservation Science Teachers, Postsecondary",
  "jobcode": "25-1043.00"
  },
  {
  "jobtitle": "Forging Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4022.00"
  },
  {
  "jobtitle": "Foundry Mold and Coremakers",
  "jobcode": "51-4071.00"
  },
  {
  "jobtitle": "Fraud Examiners, Investigators and Analysts",
  "jobcode": "13-2099.04"
  },
  {
  "jobtitle": "Freight Forwarders",
  "jobcode": "43-5011.01"
  },
  {
  "jobtitle": "Fuel Cell Engineers",
  "jobcode": "17-2141.01"
  },
  {
  "jobtitle": "Fundraisers",
  "jobcode": "13-1131.00"
  },
  {
  "jobtitle": "Fundraising Managers",
  "jobcode": "11-2033.00"
  },
  {
  "jobtitle": "Funeral Attendants",
  "jobcode": "39-4021.00"
  },
  {
  "jobtitle": "Funeral Home Managers",
  "jobcode": "11-9171.00"
  },
  {
  "jobtitle": "Furnace, Kiln, Oven, Drier, and Kettle Operators and Tenders",
  "jobcode": "51-9051.00"
  },
  {
  "jobtitle": "Furniture Finishers",
  "jobcode": "51-7021.00"
  },
  {
  "jobtitle": "Gambling and Sports Book Writers and Runners",
  "jobcode": "39-3012.00"
  },
  {
  "jobtitle": "Gambling Cage Workers",
  "jobcode": "43-3041.00"
  },
  {
  "jobtitle": "Gambling Change Persons and Booth Cashiers",
  "jobcode": "41-2012.00"
  },
  {
  "jobtitle": "Gambling Dealers",
  "jobcode": "39-3011.00"
  },
  {
  "jobtitle": "Gambling Managers",
  "jobcode": "11-9071.00"
  },
  {
  "jobtitle": "Gambling Service Workers, All Other",
  "jobcode": "39-3019.00"
  },
  {
  "jobtitle": "Gambling Surveillance Officers and Gambling Investigators",
  "jobcode": "33-9031.00"
  },
  {
  "jobtitle": "Gas Compressor and Gas Pumping Station Operators",
  "jobcode": "53-7071.00"
  },
  {
  "jobtitle": "Gas Plant Operators",
  "jobcode": "51-8092.00"
  },
  {
  "jobtitle": "Gem and Diamond Workers",
  "jobcode": "51-9071.06"
  },
  {
  "jobtitle": "General and Operations Managers",
  "jobcode": "11-1021.00"
  },
  {
  "jobtitle": "General Internal Medicine Physicians",
  "jobcode": "29-1216.00"
  },
  {
  "jobtitle": "Genetic Counselors",
  "jobcode": "29-9092.00"
  },
  {
  "jobtitle": "Geneticists",
  "jobcode": "19-1029.03"
  },
  {
  "jobtitle": "Geodetic Surveyors",
  "jobcode": "17-1022.01"
  },
  {
  "jobtitle": "Geographers",
  "jobcode": "19-3092.00"
  },
  {
  "jobtitle": "Geographic Information Systems Technologists and Technicians",
  "jobcode": "15-1299.02"
  },
  {
  "jobtitle": "Geography Teachers, Postsecondary",
  "jobcode": "25-1064.00"
  },
  {
  "jobtitle": "Geological Technicians, Except Hydrologic Technicians",
  "jobcode": "19-4043.00"
  },
  {
  "jobtitle": "Geoscientists, Except Hydrologists and Geographers",
  "jobcode": "19-2042.00"
  },
  {
  "jobtitle": "Geothermal Production Managers",
  "jobcode": "11-3051.02"
  },
  {
  "jobtitle": "Geothermal Technicians",
  "jobcode": "49-9099.01"
  },
  {
  "jobtitle": "Glass Blowers, Molders, Benders, and Finishers",
  "jobcode": "51-9195.04"
  },
  {
  "jobtitle": "Glaziers",
  "jobcode": "47-2121.00"
  },
  {
  "jobtitle": "Government Property Inspectors and Investigators",
  "jobcode": "13-1041.04"
  },
  {
  "jobtitle": "Graders and Sorters, Agricultural Products",
  "jobcode": "45-2041.00"
  },
  {
  "jobtitle": "Graphic Designers",
  "jobcode": "27-1024.00"
  },
  {
  "jobtitle": "Grinding and Polishing Workers, Hand",
  "jobcode": "51-9022.00"
  },
  {
  "jobtitle": "Grinding, Lapping, Polishing, and Buffing Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4033.00"
  },
  {
  "jobtitle": "Grounds Maintenance Workers, All Other",
  "jobcode": "37-3019.00"
  },
  {
  "jobtitle": "Hairdressers, Hairstylists, and Cosmetologists",
  "jobcode": "39-5012.00"
  },
  {
  "jobtitle": "Hazardous Materials Removal Workers",
  "jobcode": "47-4041.00"
  },
  {
  "jobtitle": "Health and Safety Engineers, Except Mining Safety Engineers and Inspectors",
  "jobcode": "17-2111.00"
  },
  {
  "jobtitle": "Health Education Specialists",
  "jobcode": "21-1091.00"
  },
  {
  "jobtitle": "Health Informatics Specialists",
  "jobcode": "15-1211.01"
  },
  {
  "jobtitle": "Health Information Technologists and Medical Registrars",
  "jobcode": "29-9021.00"
  },
  {
  "jobtitle": "Health Specialties Teachers, Postsecondary",
  "jobcode": "25-1071.00"
  },
  {
  "jobtitle": "Health Technologists and Technicians, All Other",
  "jobcode": "29-2099.00"
  },
  {
  "jobtitle": "Healthcare Diagnosing or Treating Practitioners, All Other",
  "jobcode": "29-1299.00"
  },
  {
  "jobtitle": "Healthcare Practitioners and Technical Workers, All Other",
  "jobcode": "29-9099.00"
  },
  {
  "jobtitle": "Healthcare Social Workers",
  "jobcode": "21-1022.00"
  },
  {
  "jobtitle": "Healthcare Support Workers, All Other",
  "jobcode": "31-9099.00"
  },
  {
  "jobtitle": "Hearing Aid Specialists",
  "jobcode": "29-2092.00"
  },
  {
  "jobtitle": "Heat Treating Equipment Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4191.00"
  },
  {
  "jobtitle": "Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
  "jobcode": "49-9021.00"
  },
  {
  "jobtitle": "Heavy and Tractor-Trailer Truck Drivers",
  "jobcode": "53-3032.00"
  },
  {
  "jobtitle": "Helpers, Construction Trades, All Other",
  "jobcode": "47-3019.00"
  },
  {
  "jobtitle": "Helpers--Brickmasons, Blockmasons, Stonemasons, and Tile and Marble Setters",
  "jobcode": "47-3011.00"
  },
  {
  "jobtitle": "Helpers--Carpenters",
  "jobcode": "47-3012.00"
  },
  {
  "jobtitle": "Helpers--Electricians",
  "jobcode": "47-3013.00"
  },
  {
  "jobtitle": "Helpers--Extraction Workers",
  "jobcode": "47-5081.00"
  },
  {
  "jobtitle": "Helpers--Installation, Maintenance, and Repair Workers",
  "jobcode": "49-9098.00"
  },
  {
  "jobtitle": "Helpers--Painters, Paperhangers, Plasterers, and Stucco Masons",
  "jobcode": "47-3014.00"
  },
  {
  "jobtitle": "Helpers--Pipelayers, Plumbers, Pipefitters, and Steamfitters",
  "jobcode": "47-3015.00"
  },
  {
  "jobtitle": "Helpers--Production Workers",
  "jobcode": "51-9198.00"
  },
  {
  "jobtitle": "Helpers--Roofers",
  "jobcode": "47-3016.00"
  },
  {
  "jobtitle": "Highway Maintenance Workers",
  "jobcode": "47-4051.00"
  },
  {
  "jobtitle": "Histology Technicians",
  "jobcode": "29-2012.01"
  },
  {
  "jobtitle": "Historians",
  "jobcode": "19-3093.00"
  },
  {
  "jobtitle": "History Teachers, Postsecondary",
  "jobcode": "25-1125.00"
  },
  {
  "jobtitle": "Histotechnologists",
  "jobcode": "29-2011.04"
  },
  {
  "jobtitle": "Hoist and Winch Operators",
  "jobcode": "53-7041.00"
  },
  {
  "jobtitle": "Home Appliance Repairers",
  "jobcode": "49-9031.00"
  },
  {
  "jobtitle": "Home Health Aides",
  "jobcode": "31-1121.00"
  },
  {
  "jobtitle": "Hospitalists",
  "jobcode": "29-1229.02"
  },
 {
  "jobtitle": "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop",
  "jobcode": "35-9031.00"
 },
 {
  "jobtitle": "Hotel, Motel, and Resort Desk Clerks",
  "jobcode": "43-4081.00"
 },
 {
  "jobtitle": "Human Factors Engineers and Ergonomists",
  "jobcode": "17-2112.01"
 },
 {
  "jobtitle": "Human Resources Assistants, Except Payroll and Timekeeping",
  "jobcode": "43-4161.00"
 },
 {
  "jobtitle": "Human Resources Managers",
  "jobcode": "11-3121.00"
 },
 {
  "jobtitle": "Human Resources Specialists",
  "jobcode": "13-1071.00"
 },
 {
  "jobtitle": "Hydroelectric Plant Technicians",
  "jobcode": "51-8013.04"
 },
 {
  "jobtitle": "Hydroelectric Production Managers",
  "jobcode": "11-3051.06"
 },
 {
  "jobtitle": "Hydrologic Technicians",
  "jobcode": "19-4044.00"
 },
 {
  "jobtitle": "Hydrologists",
  "jobcode": "19-2043.00"
 },
 {
  "jobtitle": "Industrial Ecologists",
  "jobcode": "19-2041.03"
 },
 {
  "jobtitle": "Industrial Engineering Technologists and Technicians",
  "jobcode": "17-3026.00"
 },
 {
  "jobtitle": "Industrial Engineers",
  "jobcode": "17-2112.00"
 },
 {
  "jobtitle": "Industrial Machinery Mechanics",
  "jobcode": "49-9041.00"
 },
 {
  "jobtitle": "Industrial Production Managers",
  "jobcode": "11-3051.00"
 },
 {
  "jobtitle": "Industrial Truck and Tractor Operators",
  "jobcode": "53-7051.00"
 },
 {
  "jobtitle": "Industrial-Organizational Psychologists",
  "jobcode": "19-3032.00"
 },
 {
  "jobtitle": "Infantry",
  "jobcode": "55-3016.00"
 },
 {
  "jobtitle": "Infantry Officers",
  "jobcode": "55-1016.00"
 },
 {
  "jobtitle": "Information and Record Clerks, All Other",
  "jobcode": "43-4199.00"
 },
 {
  "jobtitle": "Information Security Analysts",
  "jobcode": "15-1212.00"
 },
 {
  "jobtitle": "Information Security Engineers",
  "jobcode": "15-1299.05"
 },
 {
  "jobtitle": "Information Technology Project Managers",
  "jobcode": "15-1299.09"
 },
 {
  "jobtitle": "Inspectors, Testers, Sorters, Samplers, and Weighers",
  "jobcode": "51-9061.00"
 },
 {
  "jobtitle": "Installation, Maintenance, and Repair Workers, All Other",
  "jobcode": "49-9099.00"
 },
 {
  "jobtitle": "Instructional Coordinators",
  "jobcode": "25-9031.00"
 },
 {
  "jobtitle": "Insulation Workers, Floor, Ceiling, and Wall",
  "jobcode": "47-2131.00"
 },
 {
  "jobtitle": "Insulation Workers, Mechanical",
  "jobcode": "47-2132.00"
 },
 {
  "jobtitle": "Insurance Appraisers, Auto Damage",
  "jobcode": "13-1032.00"
 },
 {
  "jobtitle": "Insurance Claims and Policy Processing Clerks",
  "jobcode": "43-9041.00"
 },
 {
  "jobtitle": "Insurance Sales Agents",
  "jobcode": "41-3021.00"
 },
 {
  "jobtitle": "Insurance Underwriters",
  "jobcode": "13-2053.00"
 },
 {
  "jobtitle": "Intelligence Analysts",
  "jobcode": "33-3021.06"
 },
 {
  "jobtitle": "Interior Designers",
  "jobcode": "27-1025.00"
 },
 {
  "jobtitle": "Interpreters and Translators",
  "jobcode": "27-3091.00"
 },
 {
  "jobtitle": "Interviewers, Except Eligibility and Loan",
  "jobcode": "43-4111.00"
 },
 {
  "jobtitle": "Investment Fund Managers",
  "jobcode": "11-3031.03"
 },
 {
  "jobtitle": "Janitors and Cleaners, Except Maids and Housekeeping Cleaners",
  "jobcode": "37-2011.00"
 },
 {
  "jobtitle": "Jewelers and Precious Stone and Metal Workers",
  "jobcode": "51-9071.00"
 },
 {
  "jobtitle": "Judges, Magistrate Judges, and Magistrates",
  "jobcode": "23-1023.00"
 },
 {
  "jobtitle": "Judicial Law Clerks",
  "jobcode": "23-1012.00"
 },
 {
  "jobtitle": "Kindergarten Teachers, Except Special Education",
  "jobcode": "25-2012.00"
 },
 {
  "jobtitle": "Labor Relations Specialists",
  "jobcode": "13-1075.00"
 },
 {
  "jobtitle": "Laborers and Freight, Stock, and Material Movers, Hand",
  "jobcode": "53-7062.00"
 },
 {
  "jobtitle": "Landscape Architects",
  "jobcode": "17-1012.00"
 },
 {
  "jobtitle": "Landscaping and Groundskeeping Workers",
  "jobcode": "37-3011.00"
 },
 {
  "jobtitle": "Lathe and Turning Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4034.00"
 },
 {
  "jobtitle": "Laundry and Dry-Cleaning Workers",
  "jobcode": "51-6011.00"
 },
 {
  "jobtitle": "Law Teachers, Postsecondary",
  "jobcode": "25-1112.00"
 },
 {
  "jobtitle": "Lawyers",
  "jobcode": "23-1011.00"
 },
 {
  "jobtitle": "Layout Workers, Metal and Plastic",
  "jobcode": "51-4192.00"
 },
 {
  "jobtitle": "Legal Secretaries and Administrative Assistants",
  "jobcode": "43-6012.00"
 },
 {
  "jobtitle": "Legal Support Workers, All Other",
  "jobcode": "23-2099.00"
 },
 {
  "jobtitle": "Legislators",
  "jobcode": "11-1031.00"
 },
 {
  "jobtitle": "Librarians and Media Collections Specialists",
  "jobcode": "25-4022.00"
 },
 {
  "jobtitle": "Library Assistants, Clerical",
  "jobcode": "43-4121.00"
 },
 {
  "jobtitle": "Library Science Teachers, Postsecondary",
  "jobcode": "25-1082.00"
 },
 {
  "jobtitle": "Library Technicians",
  "jobcode": "25-4031.00"
 },
 {
  "jobtitle": "Licensed Practical and Licensed Vocational Nurses",
  "jobcode": "29-2061.00"
 },
 {
  "jobtitle": "Life Scientists, All Other",
  "jobcode": "19-1099.00"
 },
 {
  "jobtitle": "Life, Physical, and Social Science Technicians, All Other",
  "jobcode": "19-4099.00"
 },
 {
  "jobtitle": "Lifeguards, Ski Patrol, and Other Recreational Protective Service Workers",
  "jobcode": "33-9092.00"
 },
 {
  "jobtitle": "Light Truck Drivers",
  "jobcode": "53-3033.00"
 },
 {
  "jobtitle": "Lighting Technicians",
  "jobcode": "27-4015.00"
 },
 {
  "jobtitle": "Loading and Moving Machine Operators, Underground Mining",
  "jobcode": "47-5044.00"
 },
 {
  "jobtitle": "Loan Interviewers and Clerks",
  "jobcode": "43-4131.00"
 },
 {
  "jobtitle": "Loan Officers",
  "jobcode": "13-2072.00"
 },
 {
  "jobtitle": "Locker Room, Coatroom, and Dressing Room Attendants",
  "jobcode": "39-3093.00"
 },
 {
  "jobtitle": "Locksmiths and Safe Repairers",
  "jobcode": "49-9094.00"
 },
 {
  "jobtitle": "Locomotive Engineers",
  "jobcode": "53-4011.00"
 },
 {
  "jobtitle": "Lodging Managers",
  "jobcode": "11-9081.00"
 },
 {
  "jobtitle": "Log Graders and Scalers",
  "jobcode": "45-4023.00"
 },
 {
  "jobtitle": "Logging Equipment Operators",
  "jobcode": "45-4022.00"
 },
 {
  "jobtitle": "Logging Workers, All Other",
  "jobcode": "45-4029.00"
 },
 {
  "jobtitle": "Logisticians",
  "jobcode": "13-1081.00"
 },
 {
  "jobtitle": "Logistics Analysts",
  "jobcode": "13-1081.02"
 },
 {
  "jobtitle": "Logistics Engineers",
  "jobcode": "13-1081.01"
 },
 {
  "jobtitle": "Loss Prevention Managers",
  "jobcode": "11-9199.08"
 },
 {
  "jobtitle": "Low Vision Therapists, Orientation and Mobility Specialists, and Vision Rehabilitation Therapists",
  "jobcode": "29-1122.01"
 },
 {
  "jobtitle": "Machine Feeders and Offbearers",
  "jobcode": "53-7063.00"
 },
 {
  "jobtitle": "Machinists",
  "jobcode": "51-4041.00"
 },
 {
  "jobtitle": "Magnetic Resonance Imaging Technologists",
  "jobcode": "29-2035.00"
 },
 {
  "jobtitle": "Maids and Housekeeping Cleaners",
  "jobcode": "37-2012.00"
 },
 {
  "jobtitle": "Mail Clerks and Mail Machine Operators, Except Postal Service",
  "jobcode": "43-9051.00"
 },
 {
  "jobtitle": "Maintenance and Repair Workers, General",
  "jobcode": "49-9071.00"
 },
 {
  "jobtitle": "Maintenance Workers, Machinery",
  "jobcode": "49-9043.00"
 },
 {
  "jobtitle": "Makeup Artists, Theatrical and Performance",
  "jobcode": "39-5091.00"
 },
 {
  "jobtitle": "Management Analysts",
  "jobcode": "13-1111.00"
 },
 {
  "jobtitle": "Managers, All Other",
  "jobcode": "11-9199.00"
 },
 {
  "jobtitle": "Manicurists and Pedicurists",
  "jobcode": "39-5092.00"
 },
 {
  "jobtitle": "Manufactured Building and Mobile Home Installers",
  "jobcode": "49-9095.00"
 },
 {
  "jobtitle": "Manufacturing Engineers",
  "jobcode": "17-2112.03"
 },
 {
  "jobtitle": "Marine Engineers and Naval Architects",
  "jobcode": "17-2121.00"
 },
 {
  "jobtitle": "Market Research Analysts and Marketing Specialists",
  "jobcode": "13-1161.00"
 },
 {
  "jobtitle": "Marketing Managers",
  "jobcode": "11-2021.00"
 },
 {
  "jobtitle": "Marriage and Family Therapists",
  "jobcode": "21-1013.00"
 },
 {
  "jobtitle": "Massage Therapists",
  "jobcode": "31-9011.00"
 },
 {
  "jobtitle": "Material Moving Workers, All Other",
  "jobcode": "53-7199.00"
 },
 {
  "jobtitle": "Materials Engineers",
  "jobcode": "17-2131.00"
 },
 {
  "jobtitle": "Materials Scientists",
  "jobcode": "19-2032.00"
 },
 {
  "jobtitle": "Mathematical Science Occupations, All Other",
  "jobcode": "15-2099.00"
 },
 {
  "jobtitle": "Mathematical Science Teachers, Postsecondary",
  "jobcode": "25-1022.00"
 },
 {
  "jobtitle": "Mathematicians",
  "jobcode": "15-2021.00"
 },
 {
  "jobtitle": "Meat, Poultry, and Fish Cutters and Trimmers",
  "jobcode": "51-3022.00"
 },
 {
  "jobtitle": "Mechanical Door Repairers",
  "jobcode": "49-9011.00"
 },
 {
  "jobtitle": "Mechanical Drafters",
  "jobcode": "17-3013.00"
 },
 {
  "jobtitle": "Mechanical Engineering Technologists and Technicians",
  "jobcode": "17-3027.00"
 },
 {
  "jobtitle": "Mechanical Engineers",
  "jobcode": "17-2141.00"
 },
 {
  "jobtitle": "Mechatronics Engineers",
  "jobcode": "17-2199.05"
 },
 {
  "jobtitle": "Media and Communication Equipment Workers, All Other",
  "jobcode": "27-4099.00"
 },
 {
  "jobtitle": "Media and Communication Workers, All Other",
  "jobcode": "27-3099.00"
 },
 {
  "jobtitle": "Media Programming Directors",
  "jobcode": "27-2012.03"
 },
 {
  "jobtitle": "Media Technical Directors/Managers",
  "jobcode": "27-2012.05"
 },
 {
  "jobtitle": "Medical and Clinical Laboratory Technicians",
  "jobcode": "29-2012.00"
 },
 {
  "jobtitle": "Medical and Clinical Laboratory Technologists",
  "jobcode": "29-2011.00"
 },
 {
  "jobtitle": "Medical and Health Services Managers",
  "jobcode": "11-9111.00"
 },
 {
  "jobtitle": "Medical Appliance Technicians",
  "jobcode": "51-9082.00"
 },
 {
  "jobtitle": "Medical Assistants",
  "jobcode": "31-9092.00"
 },
 {
  "jobtitle": "Medical Dosimetrists",
  "jobcode": "29-2036.00"
 },
 {
  "jobtitle": "Medical Equipment Preparers",
  "jobcode": "31-9093.00"
 },
 {
  "jobtitle": "Medical Equipment Repairers",
  "jobcode": "49-9062.00"
 },
 {
  "jobtitle": "Medical Records Specialists",
  "jobcode": "29-2072.00"
 },
 {
  "jobtitle": "Medical Scientists, Except Epidemiologists",
  "jobcode": "19-1042.00"
 },
 {
  "jobtitle": "Medical Secretaries and Administrative Assistants",
  "jobcode": "43-6013.00"
 },
 {
  "jobtitle": "Medical Transcriptionists",
  "jobcode": "31-9094.00"
 },
 {
  "jobtitle": "Meeting, Convention, and Event Planners",
  "jobcode": "13-1121.00"
 },
 {
  "jobtitle": "Mental Health and Substance Abuse Social Workers",
  "jobcode": "21-1023.00"
 },
 {
  "jobtitle": "Mental Health Counselors",
  "jobcode": "21-1014.00"
 },
 {
  "jobtitle": "Merchandise Displayers and Window Trimmers",
  "jobcode": "27-1026.00"
 },
 {
  "jobtitle": "Metal Workers and Plastic Workers, All Other",
  "jobcode": "51-4199.00"
 },
 {
  "jobtitle": "Metal-Refining Furnace Operators and Tenders",
  "jobcode": "51-4051.00"
 },
 {
  "jobtitle": "Meter Readers, Utilities",
  "jobcode": "43-5041.00"
 },
 {
  "jobtitle": "Microbiologists",
  "jobcode": "19-1022.00"
 },
 {
  "jobtitle": "Microsystems Engineers",
  "jobcode": "17-2199.06"
 },
 {
  "jobtitle": "Middle School Teachers, Except Special and Career/Technical Education",
  "jobcode": "25-2022.00"
 },
 {
  "jobtitle": "Midwives",
  "jobcode": "29-9099.01"
 },
 {
  "jobtitle": "Military Enlisted Tactical Operations and Air/Weapons Specialists and Crew Members, All Other",
  "jobcode": "55-3019.00"
 },
 {
  "jobtitle": "Military Officer Special and Tactical Operations Leaders, All Other",
  "jobcode": "55-1019.00"
 },
 {
  "jobtitle": "Milling and Planing Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4035.00"
 },
 {
  "jobtitle": "Millwrights",
  "jobcode": "49-9044.00"
 },
 {
  "jobtitle": "Mining and Geological Engineers, Including Mining Safety Engineers",
  "jobcode": "17-2151.00"
 },
 {
  "jobtitle": "Mixing and Blending Machine Setters, Operators, and Tenders",
  "jobcode": "51-9023.00"
 },
 {
  "jobtitle": "Mobile Heavy Equipment Mechanics, Except Engines",
  "jobcode": "49-3042.00"
 },
 {
  "jobtitle": "Model Makers, Metal and Plastic",
  "jobcode": "51-4061.00"
 },
 {
  "jobtitle": "Model Makers, Wood",
  "jobcode": "51-7031.00"
 },
 {
  "jobtitle": "Models",
  "jobcode": "41-9012.00"
 },
 {
  "jobtitle": "Molders, Shapers, and Casters, Except Metal and Plastic",
  "jobcode": "51-9195.00"
 },
 {
  "jobtitle": "Molding, Coremaking, and Casting Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4072.00"
 },
 {
  "jobtitle": "Molecular and Cellular Biologists",
  "jobcode": "19-1029.02"
 },
 {
  "jobtitle": "Morticians, Undertakers, and Funeral Arrangers",
  "jobcode": "39-4031.00"
 },
 {
  "jobtitle": "Motion Picture Projectionists",
  "jobcode": "39-3021.00"
 },
 {
  "jobtitle": "Motor Vehicle Operators, All Other",
  "jobcode": "53-3099.00"
 },
 {
  "jobtitle": "Motorboat Mechanics and Service Technicians",
  "jobcode": "49-3051.00"
 },
 {
  "jobtitle": "Motorboat Operators",
  "jobcode": "53-5022.00"
 },
 {
  "jobtitle": "Motorcycle Mechanics",
  "jobcode": "49-3052.00"
 },
 {
  "jobtitle": "Multiple Machine Tool Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4081.00"
 },
 {
  "jobtitle": "Museum Technicians and Conservators",
  "jobcode": "25-4013.00"
 },
 {
  "jobtitle": "Music Directors and Composers",
  "jobcode": "27-2041.00"
 },
 {
  "jobtitle": "Music Therapists",
  "jobcode": "29-1129.02"
 },
 {
  "jobtitle": "Musical Instrument Repairers and Tuners",
  "jobcode": "49-9063.00"
 },
 {
  "jobtitle": "Musicians and Singers",
  "jobcode": "27-2042.00"
 },
 {
  "jobtitle": "Nannies",
  "jobcode": "39-9011.01"
 },
 {
  "jobtitle": "Nanosystems Engineers",
  "jobcode": "17-2199.09"
 },
 {
  "jobtitle": "Nanotechnology Engineering Technologists and Technicians",
  "jobcode": "17-3026.01"
 },
 {
  "jobtitle": "Natural Sciences Managers",
  "jobcode": "11-9121.00"
 },
 {
  "jobtitle": "Naturopathic Physicians",
  "jobcode": "29-1299.01"
 },
 {
  "jobtitle": "Network and Computer Systems Administrators",
  "jobcode": "15-1244.00"
 },
 {
  "jobtitle": "Neurodiagnostic Technologists",
  "jobcode": "29-2099.01"
 },
 {
  "jobtitle": "Neurologists",
  "jobcode": "29-1217.00"
 },
 {
  "jobtitle": "Neuropsychologists",
  "jobcode": "19-3039.02"
 },
 {
  "jobtitle": "New Accounts Clerks",
  "jobcode": "43-4141.00"
 },
 {
  "jobtitle": "News Analysts, Reporters, and Journalists",
  "jobcode": "27-3023.00"
 },
 {
  "jobtitle": "Non-Destructive Testing Specialists",
  "jobcode": "17-3029.01"
 },
 {
  "jobtitle": "Nuclear Engineers",
  "jobcode": "17-2161.00"
 },
 {
  "jobtitle": "Nuclear Medicine Technologists",
  "jobcode": "29-2033.00"
 },
 {
  "jobtitle": "Nuclear Monitoring Technicians",
  "jobcode": "19-4051.02"
 },
 {
  "jobtitle": "Nuclear Power Reactor Operators",
  "jobcode": "51-8011.00"
 },
 {
  "jobtitle": "Nuclear Technicians",
  "jobcode": "19-4051.00"
 },
 {
  "jobtitle": "Nurse Anesthetists",
  "jobcode": "29-1151.00"
 },
 {
  "jobtitle": "Nurse Midwives",
  "jobcode": "29-1161.00"
 },
 {
  "jobtitle": "Nurse Practitioners",
  "jobcode": "29-1171.00"
 },
 {
  "jobtitle": "Nursing Assistants",
  "jobcode": "31-1131.00"
 },
 {
  "jobtitle": "Nursing Instructors and Teachers, Postsecondary",
  "jobcode": "25-1072.00"
 },
 {
  "jobtitle": "Obstetricians and Gynecologists",
  "jobcode": "29-1218.00"
 },
 {
  "jobtitle": "Occupational Health and Safety Specialists",
  "jobcode": "19-5011.00"
 },
 {
  "jobtitle": "Occupational Health and Safety Technicians",
  "jobcode": "19-5012.00"
 },
 {
  "jobtitle": "Occupational Therapists",
  "jobcode": "29-1122.00"
 },
 {
  "jobtitle": "Occupational Therapy Aides",
  "jobcode": "31-2012.00"
 },
 {
  "jobtitle": "Occupational Therapy Assistants",
  "jobcode": "31-2011.00"
 },
 {
  "jobtitle": "Office and Administrative Support Workers, All Other",
  "jobcode": "43-9199.00"
 },
 {
  "jobtitle": "Office Clerks, General",
  "jobcode": "43-9061.00"
 },
 {
  "jobtitle": "Office Machine Operators, Except Computer",
  "jobcode": "43-9071.00"
 },
 {
  "jobtitle": "Online Merchants",
  "jobcode": "13-1199.06"
 },
 {
  "jobtitle": "Operating Engineers and Other Construction Equipment Operators",
  "jobcode": "47-2073.00"
 },
 {
  "jobtitle": "Operations Research Analysts",
  "jobcode": "15-2031.00"
 },
 {
  "jobtitle": "Ophthalmic Laboratory Technicians",
  "jobcode": "51-9083.00"
 },
 {
  "jobtitle": "Ophthalmic Medical Technicians",
  "jobcode": "29-2057.00"
 },
 {
  "jobtitle": "Ophthalmic Medical Technologists",
  "jobcode": "29-2099.05"
 },
 {
  "jobtitle": "Ophthalmologists, Except Pediatric",
  "jobcode": "29-1241.00"
 },
 {
  "jobtitle": "Opticians, Dispensing",
  "jobcode": "29-2081.00"
 },
 {
  "jobtitle": "Optometrists",
  "jobcode": "29-1041.00"
 },
 {
  "jobtitle": "Oral and Maxillofacial Surgeons",
  "jobcode": "29-1022.00"
 },
 {
  "jobtitle": "Order Clerks",
  "jobcode": "43-4151.00"
 },
 {
  "jobtitle": "Orderlies",
  "jobcode": "31-1132.00"
 },
 {
  "jobtitle": "Orthodontists",
  "jobcode": "29-1023.00"
 },
 {
  "jobtitle": "Orthopedic Surgeons, Except Pediatric",
  "jobcode": "29-1242.00"
 },
 {
  "jobtitle": "Orthoptists",
  "jobcode": "29-1299.02"
 },
 {
  "jobtitle": "Orthotists and Prosthetists",
  "jobcode": "29-2091.00"
 },
 {
  "jobtitle": "Outdoor Power Equipment and Other Small Engine Mechanics",
  "jobcode": "49-3053.00"
 },
 {
  "jobtitle": "Packaging and Filling Machine Operators and Tenders",
  "jobcode": "51-9111.00"
 },
 {
  "jobtitle": "Packers and Packagers, Hand",
  "jobcode": "53-7064.00"
 },
 {
  "jobtitle": "Painters, Construction and Maintenance",
  "jobcode": "47-2141.00"
 },
 {
  "jobtitle": "Painting, Coating, and Decorating Workers",
  "jobcode": "51-9123.00"
 },
 {
  "jobtitle": "Paper Goods Machine Setters, Operators, and Tenders",
  "jobcode": "51-9196.00"
 },
 {
  "jobtitle": "Paperhangers",
  "jobcode": "47-2142.00"
 },
 {
  "jobtitle": "Paralegals and Legal Assistants",
  "jobcode": "23-2011.00"
 },
 {
  "jobtitle": "Paramedics",
  "jobcode": "29-2043.00"
 },
 {
  "jobtitle": "Park Naturalists",
  "jobcode": "19-1031.03"
 },
 {
  "jobtitle": "Parking Attendants",
  "jobcode": "53-6021.00"
 },
 {
  "jobtitle": "Parking Enforcement Workers",
  "jobcode": "33-3041.00"
 },
 {
  "jobtitle": "Parts Salespersons",
  "jobcode": "41-2022.00"
 },
 {
  "jobtitle": "Passenger Attendants",
  "jobcode": "53-6061.00"
 },
 {
  "jobtitle": "Patient Representatives",
  "jobcode": "29-2099.08"
 },
 {
  "jobtitle": "Patternmakers, Metal and Plastic",
  "jobcode": "51-4062.00"
 },
 {
  "jobtitle": "Patternmakers, Wood",
  "jobcode": "51-7032.00"
 },
 {
  "jobtitle": "Paving, Surfacing, and Tamping Equipment Operators",
  "jobcode": "47-2071.00"
 },
 {
  "jobtitle": "Payroll and Timekeeping Clerks",
  "jobcode": "43-3051.00"
 },
 {
  "jobtitle": "Pediatric Surgeons",
  "jobcode": "29-1243.00"
 },
 {
  "jobtitle": "Pediatricians, General",
  "jobcode": "29-1221.00"
 },
 {
  "jobtitle": "Penetration Testers",
  "jobcode": "15-1299.04"
 },
 {
  "jobtitle": "Personal Care Aides",
  "jobcode": "31-1122.00"
 },
 {
  "jobtitle": "Personal Care and Service Workers, All Other",
  "jobcode": "39-9099.00"
 },
 {
  "jobtitle": "Personal Financial Advisors",
  "jobcode": "13-2052.00"
 },
 {
  "jobtitle": "Personal Service Managers, All Other",
  "jobcode": "11-9179.00"
 },
 {
  "jobtitle": "Pest Control Workers",
  "jobcode": "37-2021.00"
 },
 {
  "jobtitle": "Pesticide Handlers, Sprayers, and Applicators, Vegetation",
  "jobcode": "37-3012.00"
 },
 {
  "jobtitle": "Petroleum Engineers",
  "jobcode": "17-2171.00"
 },
 {
  "jobtitle": "Petroleum Pump System Operators, Refinery Operators, and Gaugers",
  "jobcode": "51-8093.00"
 },
 {
  "jobtitle": "Pharmacists",
  "jobcode": "29-1051.00"
 },
 {
  "jobtitle": "Pharmacy Aides",
  "jobcode": "31-9095.00"
 },
 {
  "jobtitle": "Pharmacy Technicians",
  "jobcode": "29-2052.00"
 },
 {
  "jobtitle": "Philosophy and Religion Teachers, Postsecondary",
  "jobcode": "25-1126.00"
 },
 {
  "jobtitle": "Phlebotomists",
  "jobcode": "31-9097.00"
 },
 {
  "jobtitle": "Photographers",
  "jobcode": "27-4021.00"
 },
 {
  "jobtitle": "Photographic Process Workers and Processing Machine Operators",
  "jobcode": "51-9151.00"
 },
 {
  "jobtitle": "Photonics Engineers",
  "jobcode": "17-2199.07"
 },
 {
  "jobtitle": "Photonics Technicians",
  "jobcode": "17-3029.08"
 },
 {
  "jobtitle": "Physical Medicine and Rehabilitation Physicians",
  "jobcode": "29-1229.04"
 },
 {
  "jobtitle": "Physical Scientists, All Other",
  "jobcode": "19-2099.00"
 },
 {
  "jobtitle": "Physical Therapist Aides",
  "jobcode": "31-2022.00"
 },
 {
  "jobtitle": "Physical Therapist Assistants",
  "jobcode": "31-2021.00"
 },
 {
  "jobtitle": "Physical Therapists",
  "jobcode": "29-1123.00"
 },
 {
  "jobtitle": "Physician Assistants",
  "jobcode": "29-1071.00"
 },
 {
  "jobtitle": "Physicians, All Other",
  "jobcode": "29-1229.00"
 },
 {
  "jobtitle": "Physicians, Pathologists",
  "jobcode": "29-1222.00"
 },
 {
  "jobtitle": "Physicists",
  "jobcode": "19-2012.00"
 },
 {
  "jobtitle": "Physics Teachers, Postsecondary",
  "jobcode": "25-1054.00"
 },
 {
  "jobtitle": "Pile Driver Operators",
  "jobcode": "47-2072.00"
 },
 {
  "jobtitle": "Pipelayers",
  "jobcode": "47-2151.00"
 },
 {
  "jobtitle": "Plant and System Operators, All Other",
  "jobcode": "51-8099.00"
 },
 {
  "jobtitle": "Plasterers and Stucco Masons",
  "jobcode": "47-2161.00"
 },
 {
  "jobtitle": "Plating Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4193.00"
 },
 {
  "jobtitle": "Plumbers, Pipefitters, and Steamfitters",
  "jobcode": "47-2152.00"
 },
 {
  "jobtitle": "Podiatrists",
  "jobcode": "29-1081.00"
 },
 {
  "jobtitle": "Poets, Lyricists and Creative Writers",
  "jobcode": "27-3043.05"
 },
 {
  "jobtitle": "Police and Sheriff's Patrol Officers",
  "jobcode": "33-3051.00"
 },
 {
  "jobtitle": "Police Identification and Records Officers",
  "jobcode": "33-3021.02"
 },
 {
  "jobtitle": "Political Science Teachers, Postsecondary",
  "jobcode": "25-1065.00"
 },
 {
  "jobtitle": "Political Scientists",
  "jobcode": "19-3094.00"
 },
 {
  "jobtitle": "Postal Service Clerks",
  "jobcode": "43-5051.00"
 },
 {
  "jobtitle": "Postal Service Mail Carriers",
  "jobcode": "43-5052.00"
 },
 {
  "jobtitle": "Postal Service Mail Sorters, Processors, and Processing Machine Operators",
  "jobcode": "43-5053.00"
 },
 {
  "jobtitle": "Postmasters and Mail Superintendents",
  "jobcode": "11-9131.00"
 },
 {
  "jobtitle": "Postsecondary Teachers, All Other",
  "jobcode": "25-1199.00"
 },
 {
  "jobtitle": "Potters, Manufacturing",
  "jobcode": "51-9195.05"
 },
 {
  "jobtitle": "Pourers and Casters, Metal",
  "jobcode": "51-4052.00"
 },
 {
  "jobtitle": "Power Distributors and Dispatchers",
  "jobcode": "51-8012.00"
 },
 {
  "jobtitle": "Power Plant Operators",
  "jobcode": "51-8013.00"
 },
 {
  "jobtitle": "Precision Agriculture Technicians",
  "jobcode": "19-4012.01"
 },
 {
  "jobtitle": "Precision Instrument and Equipment Repairers, All Other",
  "jobcode": "49-9069.00"
 },
 {
  "jobtitle": "Prepress Technicians and Workers",
  "jobcode": "51-5111.00"
 },
 {
  "jobtitle": "Preschool Teachers, Except Special Education",
  "jobcode": "25-2011.00"
 },
 {
  "jobtitle": "Pressers, Textile, Garment, and Related Materials",
  "jobcode": "51-6021.00"
 },
 {
  "jobtitle": "Preventive Medicine Physicians",
  "jobcode": "29-1229.05"
 },
 {
  "jobtitle": "Print Binding and Finishing Workers",
  "jobcode": "51-5113.00"
 },
 {
  "jobtitle": "Printing Press Operators",
  "jobcode": "51-5112.00"
 },
 {
  "jobtitle": "Private Detectives and Investigators",
  "jobcode": "33-9021.00"
 },
 {
  "jobtitle": "Probation Officers and Correctional Treatment Specialists",
  "jobcode": "21-1092.00"
 },
 {
  "jobtitle": "Procurement Clerks",
  "jobcode": "43-3061.00"
 },
 {
  "jobtitle": "Producers and Directors",
  "jobcode": "27-2012.00"
 },
 {
  "jobtitle": "Production Workers, All Other",
  "jobcode": "51-9199.00"
 },
 {
  "jobtitle": "Production, Planning, and Expediting Clerks",
  "jobcode": "43-5061.00"
 },
 {
  "jobtitle": "Project Management Specialists",
  "jobcode": "13-1082.00"
 },
 {
  "jobtitle": "Proofreaders and Copy Markers",
  "jobcode": "43-9081.00"
 },
 {
  "jobtitle": "Property, Real Estate, and Community Association Managers",
  "jobcode": "11-9141.00"
 },
 {
  "jobtitle": "Prosthodontists",
  "jobcode": "29-1024.00"
 },
 {
  "jobtitle": "Protective Service Workers, All Other",
  "jobcode": "33-9099.00"
 },
 {
  "jobtitle": "Psychiatric Aides",
  "jobcode": "31-1133.00"
 },
 {
  "jobtitle": "Psychiatric Technicians",
  "jobcode": "29-2053.00"
 },
 {
  "jobtitle": "Psychiatrists",
  "jobcode": "29-1223.00"
 },
 {
  "jobtitle": "Psychologists, All Other",
  "jobcode": "19-3039.00"
 },
 {
  "jobtitle": "Psychology Teachers, Postsecondary",
  "jobcode": "25-1066.00"
 },
 {
  "jobtitle": "Public Relations Managers",
  "jobcode": "11-2032.00"
 },
 {
  "jobtitle": "Public Relations Specialists",
  "jobcode": "27-3031.00"
 },
 {
  "jobtitle": "Public Safety Telecommunicators",
  "jobcode": "43-5031.00"
 },
 {
  "jobtitle": "Pump Operators, Except Wellhead Pumpers",
  "jobcode": "53-7072.00"
 },
 {
  "jobtitle": "Purchasing Agents, Except Wholesale, Retail, and Farm Products",
  "jobcode": "13-1023.00"
 },
 {
  "jobtitle": "Purchasing Managers",
  "jobcode": "11-3061.00"
 },
 {
  "jobtitle": "Quality Control Analysts",
  "jobcode": "19-4099.01"
 },
 {
  "jobtitle": "Quality Control Systems Managers",
  "jobcode": "11-3051.01"
 },
 {
  "jobtitle": "Radiation Therapists",
  "jobcode": "29-1124.00"
 },
 {
  "jobtitle": "Radio Frequency Identification Device Specialists",
  "jobcode": "17-2072.01"
 },
 {
  "jobtitle": "Radio, Cellular, and Tower Equipment Installers and Repairers",
  "jobcode": "49-2021.00"
 },
 {
  "jobtitle": "Radiologic Technologists and Technicians",
  "jobcode": "29-2034.00"
 },
 {
  "jobtitle": "Radiologists",
  "jobcode": "29-1224.00"
 },
 {
  "jobtitle": "Rail Car Repairers",
  "jobcode": "49-3043.00"
 },
 {
  "jobtitle": "Rail Transportation Workers, All Other",
  "jobcode": "53-4099.00"
 },
 {
  "jobtitle": "Rail Yard Engineers, Dinkey Operators, and Hostlers",
  "jobcode": "53-4013.00"
 },
 {
  "jobtitle": "Rail-Track Laying and Maintenance Equipment Operators",
  "jobcode": "47-4061.00"
 },
 {
  "jobtitle": "Railroad Brake, Signal, and Switch Operators and Locomotive Firers",
  "jobcode": "53-4022.00"
 },
 {
  "jobtitle": "Railroad Conductors and Yardmasters",
  "jobcode": "53-4031.00"
 },
 {
  "jobtitle": "Range Managers",
  "jobcode": "19-1031.02"
 },
 {
  "jobtitle": "Real Estate Brokers",
  "jobcode": "41-9021.00"
 },
 {
  "jobtitle": "Real Estate Sales Agents",
  "jobcode": "41-9022.00"
 },
 {
  "jobtitle": "Receptionists and Information Clerks",
  "jobcode": "43-4171.00"
 },
 {
  "jobtitle": "Recreation and Fitness Studies Teachers, Postsecondary",
  "jobcode": "25-1193.00"
 },
 {
  "jobtitle": "Recreation Workers",
  "jobcode": "39-9032.00"
 },
 {
  "jobtitle": "Recreational Therapists",
  "jobcode": "29-1125.00"
 },
 {
  "jobtitle": "Recreational Vehicle Service Technicians",
  "jobcode": "49-3092.00"
 },
 {
  "jobtitle": "Recycling and Reclamation Workers",
  "jobcode": "53-7062.04"
 },
 {
  "jobtitle": "Recycling Coordinators",
  "jobcode": "53-1042.01"
 },
 {
  "jobtitle": "Refractory Materials Repairers, Except Brickmasons",
  "jobcode": "49-9045.00"
 },
 {
  "jobtitle": "Refuse and Recyclable Material Collectors",
  "jobcode": "53-7081.00"
 },
 {
  "jobtitle": "Registered Nurses",
  "jobcode": "29-1141.00"
 },
 {
  "jobtitle": "Regulatory Affairs Managers",
  "jobcode": "11-9199.01"
 },
 {
  "jobtitle": "Regulatory Affairs Specialists",
  "jobcode": "13-1041.07"
 },
 {
  "jobtitle": "Rehabilitation Counselors",
  "jobcode": "21-1015.00"
 },
 {
  "jobtitle": "Reinforcing Iron and Rebar Workers",
  "jobcode": "47-2171.00"
 },
 {
  "jobtitle": "Religious Workers, All Other",
  "jobcode": "21-2099.00"
 },
 {
  "jobtitle": "Remote Sensing Scientists and Technologists",
  "jobcode": "19-2099.01"
 },
 {
  "jobtitle": "Remote Sensing Technicians",
  "jobcode": "19-4099.03"
 },
 {
  "jobtitle": "Reservation and Transportation Ticket Agents and Travel Clerks",
  "jobcode": "43-4181.00"
 },
 {
  "jobtitle": "Residential Advisors",
  "jobcode": "39-9041.00"
 },
 {
  "jobtitle": "Respiratory Therapists",
  "jobcode": "29-1126.00"
 },
 {
  "jobtitle": "Retail Loss Prevention Specialists",
  "jobcode": "33-9099.02"
 },
 {
  "jobtitle": "Retail Salespersons",
  "jobcode": "41-2031.00"
 },
 {
  "jobtitle": "Riggers",
  "jobcode": "49-9096.00"
 },
 {
  "jobtitle": "Robotics Engineers",
  "jobcode": "17-2199.08"
 },
 {
  "jobtitle": "Robotics Technicians",
  "jobcode": "17-3024.01"
 },
 {
  "jobtitle": "Rock Splitters, Quarry",
  "jobcode": "47-5051.00"
 },
 {
  "jobtitle": "Rolling Machine Setters, Operators, and Tenders, Metal and Plastic",
  "jobcode": "51-4023.00"
 },
 {
  "jobtitle": "Roof Bolters, Mining",
  "jobcode": "47-5043.00"
 },
 {
  "jobtitle": "Roofers",
  "jobcode": "47-2181.00"
 },
 {
  "jobtitle": "Rotary Drill Operators, Oil and Gas",
  "jobcode": "47-5012.00"
 },
 {
  "jobtitle": "Roustabouts, Oil and Gas",
  "jobcode": "47-5071.00"
 },
 {
  "jobtitle": "Sailors and Marine Oilers",
  "jobcode": "53-5011.00"
 },
 {
  "jobtitle": "Sales and Related Workers, All Other",
  "jobcode": "41-9099.00"
 },
 {
  "jobtitle": "Sales Engineers",
  "jobcode": "41-9031.00"
 },
 {
  "jobtitle": "Sales Managers",
  "jobcode": "11-2022.00"
 },
 {
  "jobtitle": "Sales Representatives of Services, Except Advertising, Insurance, Financial Services, and Travel",
  "jobcode": "41-3091.00"
 },
 {
  "jobtitle": "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products",
  "jobcode": "41-4012.00"
 },
 {
  "jobtitle": "Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products",
  "jobcode": "41-4011.00"
 },
 {
  "jobtitle": "Sawing Machine Setters, Operators, and Tenders, Wood",
  "jobcode": "51-7041.00"
 },
 {
  "jobtitle": "School Bus Monitors",
  "jobcode": "33-9094.00"
 },
 {
  "jobtitle": "School Psychologists",
  "jobcode": "19-3034.00"
 },
 {
  "jobtitle": "Search Marketing Strategists",
  "jobcode": "13-1161.01"
 },
 {
  "jobtitle": "Secondary School Teachers, Except Special and Career/Technical Education",
  "jobcode": "25-2031.00"
 },
 {
  "jobtitle": "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive",
  "jobcode": "43-6014.00"
 },
 {
  "jobtitle": "Securities, Commodities, and Financial Services Sales Agents",
  "jobcode": "41-3031.00"
 },
 {
  "jobtitle": "Security and Fire Alarm Systems Installers",
  "jobcode": "49-2098.00"
 },
 {
  "jobtitle": "Security Guards",
  "jobcode": "33-9032.00"
 },
 {
  "jobtitle": "Security Management Specialists",
  "jobcode": "13-1199.07"
 },
 {
  "jobtitle": "Security Managers",
  "jobcode": "11-3013.01"
 },
 {
  "jobtitle": "Segmental Pavers",
  "jobcode": "47-4091.00"
 },
 {
  "jobtitle": "Self-Enrichment Teachers",
  "jobcode": "25-3021.00"
 },
 {
  "jobtitle": "Semiconductor Processing Technicians",
  "jobcode": "51-9141.00"
 },
 {
  "jobtitle": "Separating, Filtering, Clarifying, Precipitating, and Still Machine Setters, Operators, and Tenders",
  "jobcode": "51-9012.00"
 },
 {
  "jobtitle": "Septic Tank Servicers and Sewer Pipe Cleaners",
  "jobcode": "47-4071.00"
 },
 {
  "jobtitle": "Service Unit Operators, Oil and Gas",
  "jobcode": "47-5013.00"
 },
 {
  "jobtitle": "Set and Exhibit Designers",
  "jobcode": "27-1027.00"
 },
 {
  "jobtitle": "Sewers, Hand",
  "jobcode": "51-6051.00"
 },
 {
  "jobtitle": "Sewing Machine Operators",
  "jobcode": "51-6031.00"
 },
 {
  "jobtitle": "Shampooers",
  "jobcode": "39-5093.00"
 },
 {
  "jobtitle": "Sheet Metal Workers",
  "jobcode": "47-2211.00"
 },
 {
  "jobtitle": "Ship Engineers",
  "jobcode": "53-5031.00"
 },
 {
  "jobtitle": "Shipping, Receiving, and Inventory Clerks",
  "jobcode": "43-5071.00"
 },
 {
  "jobtitle": "Shoe and Leather Workers and Repairers",
  "jobcode": "51-6041.00"
 },
 {
  "jobtitle": "Shoe Machine Operators and Tenders",
  "jobcode": "51-6042.00"
 },
 {
  "jobtitle": "Shuttle Drivers and Chauffeurs",
  "jobcode": "53-3053.00"
 },
 {
  "jobtitle": "Signal and Track Switch Repairers",
  "jobcode": "49-9097.00"
 },
 {
  "jobtitle": "Skincare Specialists",
  "jobcode": "39-5094.00"
 },
 {
  "jobtitle": "Slaughterers and Meat Packers",
  "jobcode": "51-3023.00"
 },
 {
  "jobtitle": "Social and Community Service Managers",
  "jobcode": "11-9151.00"
 },
 {
  "jobtitle": "Social and Human Service Assistants",
  "jobcode": "21-1093.00"
 },
 {
  "jobtitle": "Social Science Research Assistants",
  "jobcode": "19-4061.00"
 },
 {
  "jobtitle": "Social Sciences Teachers, Postsecondary, All Other",
  "jobcode": "25-1069.00"
 },
 {
  "jobtitle": "Social Scientists and Related Workers, All Other",
  "jobcode": "19-3099.00"
 },
 {
  "jobtitle": "Social Work Teachers, Postsecondary",
  "jobcode": "25-1113.00"
 },
 {
  "jobtitle": "Social Workers, All Other",
  "jobcode": "21-1029.00"
 },
 {
  "jobtitle": "Sociologists",
  "jobcode": "19-3041.00"
 },
 {
  "jobtitle": "Sociology Teachers, Postsecondary",
  "jobcode": "25-1067.00"
 },
 {
  "jobtitle": "Software Developers",
  "jobcode": "15-1252.00"
 },
 {
  "jobtitle": "Software Quality Assurance Analysts and Testers",
  "jobcode": "15-1253.00"
 },
 {
  "jobtitle": "Soil and Plant Scientists",
  "jobcode": "19-1013.00"
 },
 {
  "jobtitle": "Solar Energy Installation Managers",
  "jobcode": "47-1011.03"
 },
 {
  "jobtitle": "Solar Energy Systems Engineers",
  "jobcode": "17-2199.11"
 },
 {
  "jobtitle": "Solar Photovoltaic Installers",
  "jobcode": "47-2231.00"
 },
 {
  "jobtitle": "Solar Sales Representatives and Assessors",
  "jobcode": "41-4011.07"
 },
 {
  "jobtitle": "Solar Thermal Installers and Technicians",
  "jobcode": "47-2152.04"
 },
 {
  "jobtitle": "Sound Engineering Technicians",
  "jobcode": "27-4014.00"
 },
 {
  "jobtitle": "Spa Managers",
  "jobcode": "11-9179.02"
 },
 {
  "jobtitle": "Special Education Teachers, All Other",
  "jobcode": "25-2059.00"
 },
 {
  "jobtitle": "Special Education Teachers, Elementary School",
  "jobcode": "25-2056.00"
 },
 {
  "jobtitle": "Special Education Teachers, Kindergarten",
  "jobcode": "25-2055.00"
 },
 {
  "jobtitle": "Special Education Teachers, Middle School",
  "jobcode": "25-2057.00"
 },
 {
  "jobtitle": "Special Education Teachers, Preschool",
  "jobcode": "25-2051.00"
 },
 {
  "jobtitle": "Special Education Teachers, Secondary School",
  "jobcode": "25-2058.00"
 },
 {
  "jobtitle": "Special Effects Artists and Animators",
  "jobcode": "27-1014.00"
 },
 {
  "jobtitle": "Special Forces",
  "jobcode": "55-3018.00"
 },
 {
  "jobtitle": "Special Forces Officers",
  "jobcode": "55-1017.00"
 },
 {
  "jobtitle": "Speech-Language Pathologists",
  "jobcode": "29-1127.00"
 },
 {
  "jobtitle": "Speech-Language Pathology Assistants",
  "jobcode": "31-9099.01"
 },
 {
  "jobtitle": "Sports Medicine Physicians",
  "jobcode": "29-1229.06"
 },
 {
  "jobtitle": "Stationary Engineers and Boiler Operators",
  "jobcode": "51-8021.00"
 },
 {
  "jobtitle": "Statistical Assistants",
  "jobcode": "43-9111.00"
 },
 {
  "jobtitle": "Statisticians",
  "jobcode": "15-2041.00"
 },
 {
  "jobtitle": "Stockers and Order Fillers",
  "jobcode": "53-7065.00"
 },
 {
  "jobtitle": "Stone Cutters and Carvers, Manufacturing",
  "jobcode": "51-9195.03"
 },
 {
  "jobtitle": "Stonemasons",
  "jobcode": "47-2022.00"
 },
 {
  "jobtitle": "Structural Iron and Steel Workers",
  "jobcode": "47-2221.00"
 },
 {
  "jobtitle": "Structural Metal Fabricators and Fitters",
  "jobcode": "51-2041.00"
 },
 {
  "jobtitle": "Substance Abuse and Behavioral Disorder Counselors",
  "jobcode": "21-1011.00"
 },
 {
  "jobtitle": "Substitute Teachers, Short-Term",
  "jobcode": "25-3031.00"
 },
 {
  "jobtitle": "Subway and Streetcar Operators",
  "jobcode": "53-4041.00"
 },
 {
  "jobtitle": "Supply Chain Managers",
  "jobcode": "11-3071.04"
 },
 {
  "jobtitle": "Surgeons, All Other",
  "jobcode": "29-1249.00"
 },
 {
  "jobtitle": "Surgical Assistants",
  "jobcode": "29-9093.00"
 },
 {
  "jobtitle": "Surgical Technologists",
  "jobcode": "29-2055.00"
 },
 {
  "jobtitle": "Survey Researchers",
  "jobcode": "19-3022.00"
 },
 {
  "jobtitle": "Surveying and Mapping Technicians",
  "jobcode": "17-3031.00"
 },
 {
  "jobtitle": "Surveyors",
  "jobcode": "17-1022.00"
 },
 {
  "jobtitle": "Sustainability Specialists",
  "jobcode": "13-1199.05"
 },
 {
  "jobtitle": "Switchboard Operators, Including Answering Service",
  "jobcode": "43-2011.00"
 },
 {
  "jobtitle": "Tailors, Dressmakers, and Custom Sewers",
  "jobcode": "51-6052.00"
 },
 {
  "jobtitle": "Talent Directors",
  "jobcode": "27-2012.04"
 },
 {
  "jobtitle": "Tank Car, Truck, and Ship Loaders",
  "jobcode": "53-7121.00"
 },
 {
  "jobtitle": "Tapers",
  "jobcode": "47-2082.00"
 },
 {
  "jobtitle": "Tax Examiners and Collectors, and Revenue Agents",
  "jobcode": "13-2081.00"
 },
 {
  "jobtitle": "Tax Preparers",
  "jobcode": "13-2082.00"
 },
 {
  "jobtitle": "Taxi Drivers",
  "jobcode": "53-3054.00"
 },
 {
  "jobtitle": "Teachers and Instructors, All Other",
  "jobcode": "25-3099.00"
 },
 {
  "jobtitle": "Teaching Assistants, All Other",
  "jobcode": "25-9049.00"
 },
 {
  "jobtitle": "Teaching Assistants, Postsecondary",
  "jobcode": "25-9044.00"
 },
 {
  "jobtitle": "Teaching Assistants, Preschool, Elementary, Middle, and Secondary School, Except Special Education",
  "jobcode": "25-9042.00"
 },
 {
  "jobtitle": "Teaching Assistants, Special Education",
  "jobcode": "25-9043.00"
 },
 {
  "jobtitle": "Team Assemblers",
  "jobcode": "51-2092.00"
 },
 {
  "jobtitle": "Technical Writers",
  "jobcode": "27-3042.00"
 },
 {
  "jobtitle": "Telecommunications Engineering Specialists",
  "jobcode": "15-1241.01"
 },
 {
  "jobtitle": "Telecommunications Equipment Installers and Repairers, Except Line Installers",
  "jobcode": "49-2022.00"
 },
 {
  "jobtitle": "Telecommunications Line Installers and Repairers",
  "jobcode": "49-9052.00"
 },
 {
  "jobtitle": "Telemarketers",
  "jobcode": "41-9041.00"
 },
 {
  "jobtitle": "Telephone Operators",
  "jobcode": "43-2021.00"
 },
 {
  "jobtitle": "Tellers",
  "jobcode": "43-3071.00"
 },
 {
  "jobtitle": "Terrazzo Workers and Finishers",
  "jobcode": "47-2053.00"
 },
 {
  "jobtitle": "Textile Bleaching and Dyeing Machine Operators and Tenders",
  "jobcode": "51-6061.00"
 },
 {
  "jobtitle": "Textile Cutting Machine Setters, Operators, and Tenders",
  "jobcode": "51-6062.00"
 },
 {
  "jobtitle": "Textile Knitting and Weaving Machine Setters, Operators, and Tenders",
  "jobcode": "51-6063.00"
 },
 {
  "jobtitle": "Textile Winding, Twisting, and Drawing Out Machine Setters, Operators, and Tenders",
  "jobcode": "51-6064.00"
 },
 {
  "jobtitle": "Textile, Apparel, and Furnishings Workers, All Other",
  "jobcode": "51-6099.00"
 },
 {
  "jobtitle": "Therapists, All Other",
  "jobcode": "29-1129.00"
 },
 {
  "jobtitle": "Tile and Stone Setters",
  "jobcode": "47-2044.00"
 },
 {
  "jobtitle": "Timing Device Assemblers and Adjusters",
  "jobcode": "51-2061.00"
 },
 {
  "jobtitle": "Tire Builders",
  "jobcode": "51-9197.00"
 },
 {
  "jobtitle": "Tire Repairers and Changers",
  "jobcode": "49-3093.00"
 },
 {
  "jobtitle": "Title Examiners, Abstractors, and Searchers",
  "jobcode": "23-2093.00"
 },
 {
  "jobtitle": "Tool and Die Makers",
  "jobcode": "51-4111.00"
 },
 {
  "jobtitle": "Tool Grinders, Filers, and Sharpeners",
  "jobcode": "51-4194.00"
 },
 {
  "jobtitle": "Tour Guides and Escorts",
  "jobcode": "39-7011.00"
 },
 {
  "jobtitle": "Traffic Technicians",
  "jobcode": "53-6041.00"
 },
 {
  "jobtitle": "Training and Development Managers",
  "jobcode": "11-3131.00"
 },
 {
  "jobtitle": "Training and Development Specialists",
  "jobcode": "13-1151.00"
 },
 {
  "jobtitle": "Transit and Railroad Police",
  "jobcode": "33-3052.00"
 },
 {
  "jobtitle": "Transportation Engineers",
  "jobcode": "17-2051.01"
 },
 {
  "jobtitle": "Transportation Inspectors",
  "jobcode": "53-6051.00"
 },
 {
  "jobtitle": "Transportation Planners",
  "jobcode": "19-3099.01"
 },
 {
  "jobtitle": "Transportation Security Screeners",
  "jobcode": "33-9093.00"
 },
 {
  "jobtitle": "Transportation Vehicle, Equipment and Systems Inspectors, Except Aviation",
  "jobcode": "53-6051.07"
 },
 {
  "jobtitle": "Transportation Workers, All Other",
  "jobcode": "53-6099.00"
 },
 {
  "jobtitle": "Transportation, Storage, and Distribution Managers",
  "jobcode": "11-3071.00"
 },
 {
  "jobtitle": "Travel Agents",
  "jobcode": "41-3041.00"
 },
 {
  "jobtitle": "Travel Guides",
  "jobcode": "39-7012.00"
 },
 {
  "jobtitle": "Treasurers and Controllers",
  "jobcode": "11-3031.01"
 },
 {
  "jobtitle": "Tree Trimmers and Pruners",
  "jobcode": "37-3013.00"
 },
 {
  "jobtitle": "Tutors",
  "jobcode": "25-3041.00"
 },
 {
  "jobtitle": "Umpires, Referees, and Other Sports Officials",
  "jobcode": "27-2023.00"
 },
 {
  "jobtitle": "Underground Mining Machine Operators, All Other",
  "jobcode": "47-5049.00"
 },
 {
  "jobtitle": "Upholsterers",
  "jobcode": "51-6093.00"
 },
 {
  "jobtitle": "Urban and Regional Planners",
  "jobcode": "19-3051.00"
 },
 {
  "jobtitle": "Urologists",
  "jobcode": "29-1229.03"
 },
 {
  "jobtitle": "Ushers, Lobby Attendants, and Ticket Takers",
  "jobcode": "39-3031.00"
 },
 {
  "jobtitle": "Validation Engineers",
  "jobcode": "17-2112.02"
 },
 {
  "jobtitle": "Veterinarians",
  "jobcode": "29-1131.00"
 },
 {
  "jobtitle": "Veterinary Assistants and Laboratory Animal Caretakers",
  "jobcode": "31-9096.00"
 },
 {
  "jobtitle": "Veterinary Technologists and Technicians",
  "jobcode": "29-2056.00"
 },
 {
  "jobtitle": "Video Game Designers",
  "jobcode": "15-1255.01"
 },
 {
  "jobtitle": "Waiters and Waitresses",
  "jobcode": "35-3031.00"
 },
 {
  "jobtitle": "Watch and Clock Repairers",
  "jobcode": "49-9064.00"
 },
 {
  "jobtitle": "Water and Wastewater Treatment Plant and System Operators",
  "jobcode": "51-8031.00"
 },
 {
  "jobtitle": "Water Resource Specialists",
  "jobcode": "11-9121.02"
 },
 {
  "jobtitle": "Water/Wastewater Engineers",
  "jobcode": "17-2051.02"
 },
 {
  "jobtitle": "Weatherization Installers and Technicians",
  "jobcode": "47-4099.03"
 },
 {
  "jobtitle": "Web Administrators",
  "jobcode": "15-1299.01"
 },
 {
  "jobtitle": "Web and Digital Interface Designers",
  "jobcode": "15-1255.00"
 },
 {
  "jobtitle": "Web Developers",
  "jobcode": "15-1254.00"
 },
 {
  "jobtitle": "Weighers, Measurers, Checkers, and Samplers, Recordkeeping",
  "jobcode": "43-5111.00"
 },
 {
  "jobtitle": "Welders, Cutters, Solderers, and Brazers",
  "jobcode": "51-4121.00"
 },
 {
  "jobtitle": "Welding, Soldering, and Brazing Machine Setters, Operators, and Tenders",
  "jobcode": "51-4122.00"
 },
 {
  "jobtitle": "Wellhead Pumpers",
  "jobcode": "53-7073.00"
 },
 {
  "jobtitle": "Wholesale and Retail Buyers, Except Farm Products",
  "jobcode": "13-1022.00"
 },
 {
  "jobtitle": "Wind Energy Development Managers",
  "jobcode": "11-9199.10"
 },
 {
  "jobtitle": "Wind Energy Engineers",
  "jobcode": "17-2199.10"
 },
 {
  "jobtitle": "Wind Energy Operations Managers",
  "jobcode": "11-9199.09"
 },
 {
  "jobtitle": "Wind Turbine Service Technicians",
  "jobcode": "49-9081.00"
 },
 {
  "jobtitle": "Woodworkers, All Other",
  "jobcode": "51-7099.00"
 },
 {
  "jobtitle": "Woodworking Machine Setters, Operators, and Tenders, Except Sawing",
  "jobcode": "51-7042.00"
 },
 {
  "jobtitle": "Word Processors and Typists",
  "jobcode": "43-9022.00"
 },
 {
  "jobtitle": "Writers and Authors",
  "jobcode": "27-3043.00"
 },
 {
  "jobtitle": "Zoologists and Wildlife Biologists",
  "jobcode": "19-1023.00"
 }
]