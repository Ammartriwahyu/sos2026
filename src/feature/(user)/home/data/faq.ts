export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "Apakah akan ada penilaian selama OSPEK?",
    answer:
      "Selama masa kegiatan OSPEK akan ada penilaian ya adik-adik terutama di penugasan dan tata tertib jadi persiapkan diri kalian sebaik mungkin, semangat adik-adik maba.",
  },
  {
    id: 2,
    question:
      "Apakah ada kegiatan OSPEK yang melibatkan kegiatan di luar kampus?",
    answer:
      "Kegiatan OSPEK sepenuhnya di lingkungan kampus yaaa terutama di Fakultas Ilmu Komputer.",
  },
  {
    id: 3,
    question:
      "Bagaimana sistem komunikasi resmi dari panitia (LINE, email, grup WA)?",
    answer: "Untuk komunikasi kita menggunakan Line ya.",
  },
  {
    id: 4,
    question:
      "Bagaimana jika ada mahasiswa baru yang memiliki kebutuhan khusus atau disabilitas?",
    answer:
      "Panitia akan memfasilitasi setiap kebutuhan khusus. Silakan hubungi panitia melalui kontak resmi untuk informasi lebih lanjut.",
  },
];
