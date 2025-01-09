export interface Author {
  name: string;
  github?: string;
  linkedin?: string;
  bio?: string;
}

export const authors: Record<string, Author> = {
  "Suresh Veeragoni": {
    name: "Suresh Veeragoni",
    github: "https://github.com/veeragoni",
    linkedin: "https://linkedin.com/in/veeragoni"
  },
  "Sudhir Maddulapally": {
    name: "Sudhir Maddulapally",
    github: "https://github.com/xparticle",
    linkedin: "https://linkedin.com/in/sudhirreddym"
  },
  "Ujwal Bukka": {
    name: "Ujwal Bukka",
    github: "https://github.com/ujwalbukka",
    linkedin: "https://www.linkedin.com/in/ujwal-bukka-a631655/"
  },
  "Ram Mittala": {
    name: "Ram Mittala",
    github: "https://github.com/seetharamireddy540",
    linkedin: "https://linkedin.com/in/seetharamireddy"
  }
};
