import { create } from "zustand";
import { chatbotApi, ChatMessage } from "../lib/api/chatbot.api";

// Fallback knowledge base about Sharda University
const SHARDA_KNOWLEDGE_BASE = {
  general: {
    keywords: [
      "sharda",
      "university",
      "about",
      "introduction",
      "overview",
      "what is",
    ],
    response: `Sharda University is a leading private university located in Greater Noida, Uttar Pradesh, India. Established in 2009, it is recognized by UGC and accredited by NAAC with an 'A' grade. The university offers diverse programs across engineering, medicine, law, business, architecture, and more. With state-of-the-art infrastructure spread over 63 acres, Sharda University provides world-class education with international collaborations and modern facilities.`,
  },
  admissions: {
    keywords: [
      "admission",
      "apply",
      "enrollment",
      "join",
      "how to get in",
      "entrance",
      "eligibility",
    ],
    response: `Sharda University offers admissions for undergraduate, postgraduate, and doctoral programs. Admissions are based on merit and entrance exams like JEE, NEET, CLAT, CAT, etc. depending on the program. You can apply online through the official website. 

The admission process includes:
1. Online application form
2. Document verification
3. Entrance test/Merit-based selection
4. Counseling
5. Fee payment

For more details, visit the admissions office or check the official website.`,
  },
  courses: {
    keywords: [
      "courses",
      "programs",
      "degree",
      "stream",
      "branch",
      "btech",
      "mba",
      "mbbs",
      "study",
      "major",
    ],
    response: `Sharda University offers a wide range of programs:

**Engineering & Technology:** B.Tech, M.Tech in various specializations
**Medicine & Health Sciences:** MBBS, BDS, Nursing, Pharmacy, Physiotherapy
**Management:** BBA, MBA, PGDM
**Law:** BA LLB, BBA LLB, LLM
**Architecture:** B.Arch, M.Arch
**Liberal Arts:** BA, MA in various subjects
**Science:** B.Sc, M.Sc
**Computer Applications:** BCA, MCA
**Design:** Fashion Design, Graphic Design

Each program has specific eligibility criteria and duration.`,
  },
  placements: {
    keywords: [
      "placement",
      "job",
      "career",
      "companies",
      "package",
      "recruitment",
      "salary",
      "hiring",
    ],
    response: `Sharda University has a dedicated Training & Placement Cell that works year-round to provide placement opportunities. Top recruiters include Microsoft, Amazon, Wipro, TCS, Infosys, Deloitte, Ernst & Young, and many more.

**Placement Highlights:**
- 85%+ placement rate
- Average package: 4-6 LPA
- Highest package: 40+ LPA
- 500+ companies visit campus
- Pre-placement training programs
- Industry internships

The university also organizes regular career fairs, workshops, and skill development programs.`,
  },
  facilities: {
    keywords: [
      "facilities",
      "infrastructure",
      "library",
      "hostel",
      "lab",
      "sports",
      "cafeteria",
      "amenities",
      "campus life",
    ],
    response: `Sharda University boasts excellent facilities:

**Academic:** Modern classrooms, well-equipped laboratories, central library with 100,000+ books
**Residential:** Separate hostels for boys and girls with 24/7 security, mess, and recreational facilities
**Sports:** Indoor and outdoor sports facilities including cricket, football, basketball, badminton, swimming pool, gym
**Medical:** On-campus hospital with 24/7 emergency services
**Transportation:** Bus services connecting to Delhi, Noida, and nearby areas
**Food:** Multiple cafeterias and food courts with diverse cuisine options
**IT Infrastructure:** Wi-Fi enabled campus, computer labs, smart classrooms
**Recreation:** Auditorium, amphitheater, student activity centers`,
  },
  fees: {
    keywords: [
      "fees",
      "cost",
      "tuition",
      "scholarship",
      "financial",
      "payment",
      "price",
      "expense",
    ],
    response: `Fee structure varies by program:

**Engineering:** ₹1.8-2.5 Lakhs per year
**Medicine (MBBS):** ₹18-22 Lakhs per year
**Management:** ₹2-3 Lakhs per year
**Law:** ₹1.5-2 Lakhs per year
**Architecture:** ₹2-2.5 Lakhs per year

**Scholarships Available:**
- Merit-based scholarships (up to 100%)
- Sports scholarships
- Need-based financial aid
- Research scholarships

Payment can be made semester-wise or annually. EMI options are also available.`,
  },
  location: {
    keywords: [
      "location",
      "address",
      "where",
      "reach",
      "directions",
      "campus",
      "how to get",
      "map",
    ],
    response: `Sharda University is located in Greater Noida, Uttar Pradesh, India.

**Address:**
Plot No. 32-34, Knowledge Park III, Greater Noida, Uttar Pradesh - 201310

**How to Reach:**
- **By Metro:** Nearest metro station is Knowledge Park II on the Aqua Line (Blue Line extension)
- **By Road:** Well connected via Noida-Greater Noida Expressway, easily accessible from Delhi (35 km), Noida, and Ghaziabad
- **By Air:** Nearest airport is Indira Gandhi International Airport, Delhi (approximately 45 km)
- **By Train:** Nearest railway station is Anand Vihar Terminal (30 km)

The campus is easily accessible with good connectivity.`,
  },
  contact: {
    keywords: [
      "contact",
      "phone",
      "email",
      "helpline",
      "support",
      "call",
      "reach out",
    ],
    response: `You can reach Sharda University through:

**Phone:** +91-120-4570000, 4570100
**Email:** info@sharda.ac.in
**Admissions:** admissions@sharda.ac.in
**Website:** www.sharda.ac.in
**Address:** Plot No. 32-34, Knowledge Park III, Greater Noida, UP - 201310

**Office Hours:** Monday to Saturday, 9:00 AM - 5:00 PM

For specific department queries, you can visit the campus or check the official website for department-wise contact details.`,
  },
  international: {
    keywords: [
      "international",
      "foreign",
      "abroad",
      "exchange",
      "global",
      "overseas",
    ],
    response: `Sharda University has a strong international presence:

**International Students:** Students from 95+ countries study at Sharda University
**Exchange Programs:** Partnerships with 200+ universities worldwide
**Study Abroad:** Semester exchange and summer programs available
**International Faculty:** Professors from various countries
**Global Exposure:** International conferences, seminars, and workshops
**Support Services:** Dedicated international student cell for visa, accommodation, and cultural adaptation

The diverse campus provides a truly global learning environment with exposure to different cultures and perspectives.`,
  },
};

// Function to find best matching response from knowledge base
function getFallbackResponse(userMessage: string): string {
  const messageLower = userMessage.toLowerCase();

  // Check each category for keyword matches
  for (const [category, data] of Object.entries(SHARDA_KNOWLEDGE_BASE)) {
    const hasMatch = data.keywords.some((keyword) =>
      messageLower.includes(keyword.toLowerCase()),
    );

    if (hasMatch) {
      return data.response;
    }
  }

  // Default response if no match found
  return `I'm here to help you with information about Sharda University! You can ask me about:

- Admissions and courses
- Placements and career opportunities
- Facilities and infrastructure
- Fees and scholarships
- Campus location and how to reach
- Contact information
- International programs

Please feel free to ask any specific question about Sharda University!`;
}

interface ChatbotStore {
  messages: Array<{
    role: "user" | "model";
    content: string;
    timestamp: string;
  }>;
  isLoading: boolean;
  error: string | null;

  // Actions
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  setError: (error: string | null) => void;
}

export const useChatbotStore = create<ChatbotStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (message: string) => {
    try {
      set({ isLoading: true, error: null });

      // Add user message to chat
      const userMessage = {
        role: "user" as const,
        content: message,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        messages: [...state.messages, userMessage],
      }));

      try {
        // Prepare history for API call
        const history: ChatMessage[] = get()
          .messages.slice(0, -1)
          .map((msg) => ({
            role: msg.role,
            parts: msg.content,
          }));

        // Send message to API
        const response = await chatbotApi.sendMessage({
          message,
          history,
        });

        if (response.success && response.data) {
          // Add bot response to chat
          const botMessage = {
            role: "model" as const,
            content: response.data.response,
            timestamp: response.data.timestamp,
          };

          set((state) => ({
            messages: [...state.messages, botMessage],
            isLoading: false,
          }));
        } else {
          throw new Error(response.message || "Failed to get response");
        }
      } catch (apiError) {
        // API failed, use fallback knowledge base
        console.log("API unavailable, using fallback knowledge base");

        const fallbackResponse = getFallbackResponse(message);
        const botMessage = {
          role: "model" as const,
          content: fallbackResponse,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, botMessage],
          isLoading: false,
        }));
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Failed to send message. Please try again.";
      set({ error: errorMessage, isLoading: false });
      console.error("Error sending message:", error);
    }
  },

  clearChat: () => {
    set({ messages: [], error: null });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));
