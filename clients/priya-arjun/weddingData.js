// Everything client-specific lives here. Put files named below inside ./media/
export const weddingData = {
  couple: { bride: "Priya", groom: "Arjun", hashtag: "#PriyaWedsArjun" },
  tagline: "Together with our families, we invite you to celebrate our wedding",
  date: "2027-02-14T10:30:00+05:30",
  city: "Vijayawada",
  hero: "hero.jpg",          // media/hero.jpg
  music: "theme.mp3",        // media/theme.mp3 (set to "" for none)
  theme: {
    ink: "#2A0F1B", primary: "#7A1F3D", accent: "#D9A441", paper: "#FBF4F1",
    heading: "Cormorant Garamond", body: "Jost"  // any Google Font
  },
  story: [
    { title: "How we met", text: "A college fest, a borrowed pen, and a conversation that never ended.", image: "story-1.jpg" },
    { title: "The proposal", text: "He asked on the terrace where we had our first chai together.", image: "story-2.jpg" }
  ],
  events: [
    { name: "Haldi", time: "2027-02-13T09:00:00+05:30", venue: "Garden Courtyard, Vijayawada", mapUrl: "https://maps.google.com/?q=Vijayawada" },
    { name: "Wedding", time: "2027-02-14T10:30:00+05:30", venue: "Grand Palace Convention, Vijayawada", mapUrl: "https://maps.google.com/?q=Vijayawada" },
    { name: "Reception", time: "2027-02-14T19:00:00+05:30", venue: "Grand Palace Lawns, Vijayawada", mapUrl: "https://maps.google.com/?q=Vijayawada" }
  ],
  gallery: ["pre-1.jpg", "pre-2.jpg", "pre-3.jpg", "pre-4.jpg"],
  rsvp: { whatsapp: "919999999999", deadline: "2027-01-20" } // number with country code, no +
};
