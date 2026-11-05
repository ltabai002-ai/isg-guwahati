export type AlumniGroup = "UK & Europe" | "North America" | "Asia & Singapore" | "India";

export interface AlumniRecord {
  name: string;
  university: string;
  country: string;
  group: AlumniGroup;
  photo?: string;
  imagePosition?: string;
}

// <!-- CLIENT: confirm consent to publish each student's name + destination publicly. If consent is unavailable, switch to a university-names-only version (list universities, no student names) — the component should support hiding names via a prop. -->
// <!-- CLIENT: confirm consent to publish each student's PHOTO publicly, in addition to name + destination. If photo consent is unavailable for a student, use the neutral placeholder avatar for that student. -->
export const ALUMNI_DATA: AlumniRecord[] = [
  // UK & Europe
  { name: "Kapilakshya Deka", university: "Durham University", country: "UK", group: "UK & Europe" , photo: "/images/alumni/Kapilakshya_Deka.webp?v=2" },
  { name: "Chetna Bhansali", university: "University of Manchester", country: "UK", group: "UK & Europe" , photo: "/images/alumni/Chetna_Bhansali.webp?v=2" },
  { name: "Kankshita Deka", university: "University of East Anglia", country: "UK", group: "UK & Europe" , photo: "/images/alumni/Kankshita_Deka.webp?v=2" },
  { name: "Mahanarb Choudhury", university: "University of Sussex", country: "England", group: "UK & Europe" , photo: "/images/alumni/Mahanarb_Choudhuryy.webp?v=2" },
  { name: "Swapnarka Arnan", university: "Sciences Po", country: "France", group: "UK & Europe" , photo: "/images/alumni/Swapnark-arnan.webp?v=2" },
  { name: "Nishit Nath", university: "Kedge Business School", country: "France", group: "UK & Europe" , photo: "/images/alumni/Nishit_Nath.webp?v=2", imagePosition: "top" },
  { name: "Ishaan Periwal", university: "Trinity College Dublin", country: "Ireland", group: "UK & Europe" , photo: "/images/alumni/Ishaan Periwal.webp?v=2" },
  { name: "Dhruv Ranjan Choudhury", university: "Trinity College Dublin", country: "Ireland", group: "UK & Europe" , photo: "/images/alumni/Dhruv_ranjan-choudhury.webp?v=2", imagePosition: "top" },
  { name: "Tomochee Borah", university: "University of Galway", country: "Ireland", group: "UK & Europe" , photo: "/images/alumni/Tomochee_Borah.webp?v=2" },
  { name: "Arav Kumar Sarma", university: "University of Amsterdam", country: "Netherlands", group: "UK & Europe" , photo: "/images/alumni/Arav_Kumar_Sarma.webp?v=2" },
  { name: "Angshuman Uzir", university: "Debrecen University", country: "Hungary", group: "UK & Europe" , photo: "/images/alumni/Angshuman_uzir.webp?v=2" },
  { name: "Anoushka Jyoti Kalita", university: "MGIMO University", country: "Russia", group: "UK & Europe" , photo: "/images/alumni/Anoushka_Jyoti_Kalita.webp?v=2" },

  // North America
  { name: "Ruwan Thououng", university: "University of Southern California", country: "USA", group: "North America" , photo: "/images/alumni/Ruwan_Thououng.webp?v=2" },
  { name: "Manveer Amarjyoti", university: "University of York", country: "Canada", group: "North America" , photo: "/images/alumni/Manveer_Amarjyoti.webp?v=2" },

  // Asia & Singapore
  { name: "Jinya Talukdar", university: "PSB Academy", country: "Singapore", group: "Asia & Singapore" , photo: "/images/alumni/Jinya_Talukdar.webp?v=2" },
  { name: "Eashan Swaroopnand", university: "Nanyang Technological University", country: "Singapore", group: "Asia & Singapore" , photo: "/images/alumni/Eashan_svaroopanand.webp?v=2" },

  // India
  { name: "Aryan Shrivastava", university: "IIT Guwahati", country: "India", group: "India" , photo: "/images/alumni/Aryan_Shrivastava.webp?v=2" },
  { name: "Roushan Pradip Das", university: "Manipal MIT", country: "India", group: "India" , photo: "/images/alumni/Roushan_Pradip_Das.webp?v=2" },
  { name: "Trinav Gogoi", university: "KIIT", country: "India", group: "India" , photo: "/images/alumni/Trinav_Gogoi.webp?v=2" },
  { name: "Amman Ojha", university: "KIIT", country: "India", group: "India" , photo: "/images/alumni/Amman_Ojha.webp?v=2" },
  { name: "Akita Chettri", university: "Amity University", country: "India", group: "India" , photo: "/images/alumni/Akita_chettri.png?v=2" },
  { name: "Jainab Rahman", university: "Amity University", country: "India", group: "India" , photo: "/images/alumni/Jainab_Rahman.webp?v=2" },
  { name: "Nihar Ranjan Talukdar", university: "Assam Don Bosco University", country: "India", group: "India" , photo: "/images/alumni/Nihar_Ranjan_Talukdar.webp?v=2" },
  { name: "Hrishikesh Sarma", university: "Mahatma Gandhi Medical College & Research Institute", country: "India", group: "India" , photo: "/images/alumni/Hrishikesh_Sarma.webp?v=2" },
];
