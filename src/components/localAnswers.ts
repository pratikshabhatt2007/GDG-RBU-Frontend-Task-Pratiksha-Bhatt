// Instant answers for the most common questions (no network, no waiting).
// Anything not matched here is sent to the Gemini-powered /api/chat function.
const RULES: [RegExp, string][] = [
  [/^(hi+|hello|hey+|good (morning|afternoon|evening))\b[\s!.]*$/,
    "Hi! 👋 I'm Ask GDG. I can help with joining GDG RBU, our events, the team and contact details. What would you like to know?"],
  [/\b(join|joining|member(ship)?|become a|enrol|enroll|recruit|apply|sign ?up)\b/,
    `Hey there! 🚀 Joining GDG RBU is easy. Here's how to get started:\n\n1. Find our chapter on the GDG community platform by searching for "GDG on Campus RamdeoBaba University" and press the "Join us" button.\n2. Keep an eye on the Events section on this site and register for the upcoming GDG Orientation (Oct 7, 2026, 3:00 PM).\n3. Have a question? Email us at gdso@rknec.edu.\n\nWe'd love to have you with us! Ask me anything else. 😊`],
  [/(related to google|affiliat|run by google|owned by google|part of google|official)/,
    "GDG RBU is a university-based community group for students interested in Google developer technologies. 🙂 It is an independent student community and is not run by Google. We learn together through workshops, tech talks, hackathons and real-world projects. Want to know how to join?"],
  [/\b(contact|email|e-mail|mail|reach|address|location|located|venue|where)\b/,
    "You can reach us at gdso@rknec.edu. 📧\n\nOur address: Ramdeobaba University, Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013.\n\nAnything else I can help with?"],
  [/\b(event|events|orientation|upcoming|next|schedule|date|when|register|registration|workshop|hackathon)\b/,
    "The upcoming event listed on this site is the GDG Orientation on Oct 7, 2026 at 3:00 PM. 🎉 It introduces GDG RBU, a community of students passionate about technology, innovation and learning, with technical workshops, hands-on sessions, hackathons, projects and networking.\n\nTo take part, press the \"Register Now\" button in the Upcoming Event section. Want to know how to join the community or how to reach us? Just ask!"],
  [/(what is (gdg|gdsc|google developer)|about (gdg|you|us)|who are you|tell me about|what (do|does) (gdg|you) do|explain gdg)/,
    "GDG RBU (Google Developer Groups on Campus, Ramdeobaba University) empowers students through hands-on workshops, tech talks, hackathons and real-world project collaboration. 🚀 It's an open, volunteer-run community focused on learning, networking and collaboration, and our organizers build an inclusive environment where developers can connect, share knowledge and grow together. Ask me how to join or about our events!"],
];

export function localAnswer(question: string): string | null {
  const t = question.toLowerCase().trim();
  for (const [re, answer] of RULES) if (re.test(t)) return answer;
  return null;
}