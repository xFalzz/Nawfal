import type { Metadata } from "next";
import Link from "next/link";
import ProfileHeader from "@/components/macro/profile-header";
import SubLinks from "@/components/macro/sub-links";
import { TbExternalLink, TbFileTypePdf } from "react-icons/tb";
import CertificateThumbnail from "@/components/doc/certificate/certificate-thumbnail";


export const metadata: Metadata = {
  title: "Certificates | Nawfal Irfan Ramadhan",
  description:
    "Licenses and certifications earned by Nawfal Irfan Ramadhan across Microsoft, Google, AWS, Dicoding, Udemy, and more.",
  alternates: {
    canonical: "/certificate",
  },
  openGraph: {
    title: "Certificates | Nawfal Irfan Ramadhan",
    description:
      "View all certifications earned by Nawfal in AI, Cloud, Web Development, and Cybersecurity.",
    url: "https://nawfal.vercel.app/certificate",
  },
};

type Certificate = {
  name: string;
  issuer: string;
  file: string;
  category: string;
  color: string;
};

const certificates: Certificate[] = [
  // Microsoft
  {
    name: "Developing Generative AI Applications on Azure",
    issuer: "Microsoft Elevate Training Center",
    file: "/Sertifikasi/Sertifikat-Microsoft/ONL61E1TL8.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Building Intelligent AI Solutions with Microsoft Fabric",
    issuer: "Microsoft Elevate Training Center",
    file: "/Sertifikasi/Sertifikat-Microsoft/ONLBBI3E4E.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (AI-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9708 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (AZ-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9709 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (DP-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9710 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (SC-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9711 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (MS-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9712 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (PL-900)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9713 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement (MB-910)",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - nawfalirfanramadhan-9714 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - NawfalIrfanRamadhan-9715 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - NawfalIrfanRamadhan-9716 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Microsoft Learn Achievement",
    issuer: "Microsoft Learn",
    file: "/Sertifikasi/Sertifikat-Microsoft/Achievements - NawfalIrfanRamadhan-9717 _ Microsoft Learn.pdf",
    category: "Microsoft",
    color: "from-blue-500 to-blue-700",
  },

  // Google
  {
    name: "Juara Vibe Coding - Google Cloud",
    issuer: "Google Cloud",
    file: "/Sertifikasi/Sertifikat-Google/Nawfal Irfan Ramadhan_Certificate.pdf",
    category: "Google",
    color: "from-red-500 to-yellow-500",
  },
  {
    name: "Google Cloud Course Certificate",
    issuer: "Google / Dicoding",
    file: "/Sertifikasi/Sertifikat-Google/5kmqcv1j_1779630791271.pdf",
    category: "Google",
    color: "from-red-500 to-yellow-500",
  },

  // Amazon / AWS
  {
    name: "AWS Cloud Fundamentals",
    issuer: "AWS / Dicoding",
    file: "/Sertifikasi/Sertifikat-Amazon/sertifikat_course_251_4104978_230426205758.pdf",
    category: "Amazon",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "AWS Generative AI Fundamentals",
    issuer: "AWS / Dicoding",
    file: "/Sertifikasi/Sertifikat-Amazon/sertifikat_course_929_4104978_120426212309.pdf",
    category: "Amazon",
    color: "from-orange-400 to-orange-600",
  },

  // Dicoding
  {
    name: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_570_4104978_290925123509.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_86_4104978_280925171857.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_600_4104978_270925184345.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_615_4104978_270925180956.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_653_4104978_270925160447.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Penerapan Machine Learning",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_753_4104978_270925154828.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_867_4104978_270925164905.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_902_4104978_231025124840.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Membangun Solusi AI Cerdas dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_905_4104978_230426201336.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_177_4104978_290925121920.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_169_4104978_141025105019.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Belajar Membangun Aplikasi Generatif dengan AI",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/sertifikat_course_620_4104978_231025120127.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "DevCoach Workshop - Saya Juga Benci AI Kalau...",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/devcoach-213-series-workshop-saya-juga-benci-ai-kalau-certificate.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "IDCamp Live - User Integrator or Creator in AI Ecosystem",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/idcamp-x-dicoding-live-1-user-integrator-or-creator-your-place-in-the-ai-ecosystem-certificate.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Virtual Roadshow METC x IMPHNEN - Hackathon & Datathon Tips",
    issuer: "Dicoding Indonesia",
    file: "/Sertifikasi/Sertifikat-Dicoding/virtual-roadshow-metc-x-imphnen-h2w-tips-dan-trik-menjadi-pemenang-hackathon-dan-datathon-dengan-bantuan-generative-ai-certificate.pdf",
    category: "Dicoding",
    color: "from-violet-500 to-purple-700",
  },

  // Komdigi
  {
    name: "Ethical Hacker For Dummies",
    issuer: "Komdigi",
    file: "/Sertifikasi/Sertifikat-Komdigi/Sertifikat_NAWFAL IRFAN RAMADHAN_Ethical Hacker For Dummies.pdf",
    category: "Komdigi",
    color: "from-green-600 to-emerald-700",
  },
  {
    name: "Introduction to Cyber Security and Career Awareness",
    issuer: "Komdigi",
    file: "/Sertifikasi/Sertifikat-Komdigi/Sertifikat_NAWFAL IRFAN RAMADHAN_Introduction to Cyber Security and Career Awareness (1).pdf",
    category: "Komdigi",
    color: "from-green-600 to-emerald-700",
  },

  // Udemy
  {
    name: "Microsoft Excel Comprehensive Guide",
    issuer: "Udemy",
    file: "/Sertifikasi/Sertifikat-Udemy/UC-97ac8435-e054-4963-aba3-72c6c92289c7.pdf",
    category: "Udemy",
    color: "from-rose-500 to-red-700",
  },
  {
    name: "Udemy Course Certificate",
    issuer: "Udemy",
    file: "/Sertifikasi/Sertifikat-Udemy/UC-aeb23da9-7b1a-4e4c-bdc0-943d893c07ff.pdf",
    category: "Udemy",
    color: "from-rose-500 to-red-700",
  },

  // Kompetensi
  {
    name: "Sertifikat Kompetensi - BTKP",
    issuer: "Balai Teknologi Komunikasi Pendidikan DIY",
    file: "/Sertifikasi/Sertifikat-Kompetensi/Sertifikat_Competency_BTKP.pdf",
    category: "Kompetensi",
    color: "from-teal-500 to-cyan-700",
  },
  {
    name: "Sertifikat PKL - SMK Negeri 2 Sewon",
    issuer: "SMK Negeri 2 Sewon",
    file: "/Sertifikasi/Sertifikat-Kompetensi/Sertifikat_PKL_SMKN2Sewon.pdf",
    category: "Kompetensi",
    color: "from-teal-500 to-cyan-700",
  },

  // Umum
  {
    name: "BEC Software Engineering 2025",
    issuer: "BEC",
    file: "/Sertifikasi/Sertifikat-Umum/BEC-XII-19251710-SWE2025.pdf",
    category: "Umum",
    color: "from-slate-500 to-gray-700",
  },
  {
    name: "Sertifikat ORMIK UBSI",
    issuer: "Universitas Bina Sarana Informatika",
    file: "/Sertifikasi/Sertifikat-Umum/Sertif-ORMIK-UBSI.pdf",
    category: "Umum",
    color: "from-slate-500 to-gray-700",
  },
  {
    name: "Sertifikat SEMOT UBSI",
    issuer: "Universitas Bina Sarana Informatika",
    file: "/Sertifikasi/Sertifikat-Umum/Sertif-SEMOT-UBSI.pdf",
    category: "Umum",
    color: "from-slate-500 to-gray-700",
  },
];

const categories = ["All", "Microsoft", "Google", "Amazon", "Dicoding", "Komdigi", "Udemy", "Kompetensi", "Umum"];

const categoryColors: Record<string, string> = {
  Microsoft: "from-blue-500 to-blue-700",
  Google: "from-red-500 to-yellow-500",
  Amazon: "from-orange-400 to-orange-600",
  Dicoding: "from-violet-500 to-purple-700",
  Komdigi: "from-green-600 to-emerald-700",
  Udemy: "from-rose-500 to-red-700",
  Kompetensi: "from-teal-500 to-cyan-700",
  Umum: "from-slate-500 to-gray-700",
};

export default function CertificatePage() {
  return (
    <section id="certificate" className="flex h-full w-full flex-col pt-4 md:grow md:pt-8 lg:pt-12">
      <ProfileHeader />

      <div className="pad-x mb-6">
        <h1 className="text-balance text-left text-3xl font-semibold leading-[1.1] tracking-tight xs:text-4xl md:w-[60%] lg:text-5xl">
          Licenses &amp; Certifications
        </h1>
        <p className="mt-3 text-muted-foreground text-base max-w-lg">
          A collection of certificates earned across AI, Cloud, Web Development, and Cybersecurity from Microsoft, Google, AWS, and more.
        </p>
      </div>

      <SubLinks />

      <div className="pad-x py-6 md:py-10">
        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          {categories.slice(1).map((cat) => {
            const count = certificates.filter((c) => c.category === cat).length;
            if (count === 0) return null;
            return (
              <div
                key={cat}
                className="flex items-center gap-x-2 rounded-full border bg-popover px-3 py-1"
              >
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${categoryColors[cat]}`} />
                <span className="text-xs font-medium text-popover-foreground">{cat}</span>
                <span className="text-xs text-muted-foreground">({count})</span>
              </div>
            );
          })}
          <div className="flex items-center gap-x-2 rounded-full border bg-popover px-3 py-1">
            <span className="text-xs font-medium text-popover-foreground">Total</span>
            <span className="text-xs text-muted-foreground">({certificates.length})</span>
          </div>
        </div>

        {/* Certificate Grid */}
        {categories.slice(1).map((cat) => {
          const filtered = certificates.filter((c) => c.category === cat);
          if (filtered.length === 0) return null;
          return (
            <div key={cat} className="mb-12">
              <div className="mb-4 flex items-center gap-x-3">
                <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${categoryColors[cat]}`} />
                <h2 className="text-lg font-semibold">{cat}</h2>
                <span className="text-sm text-muted-foreground">({filtered.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((cert, i) => (
                  <Link
                    key={i}
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col overflow-hidden rounded-lg border bg-popover transition-all duration-200 hover:border-foreground/30 hover:shadow-md"
                  >
                    {/* PDF Thumbnail Preview */}
                    <CertificateThumbnail file={cert.file} name={cert.name} />

                    {/* Card Info */}
                    <div className="flex items-start gap-x-2 p-3">
                      <div className={`mt-0.5 h-6 w-0.5 flex-none rounded-full bg-gradient-to-b ${cert.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-xs font-medium text-foreground leading-snug">
                          {cert.name}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                      <TbFileTypePdf
                        size={14}
                        className="mt-0.5 flex-none text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* LinkedIn link */}
        <div className="mt-8 flex items-center gap-x-2 text-sm text-muted-foreground">
          <span>View all 29+ certifications on</span>
          <Link
            href="https://www.linkedin.com/in/nawfal-irfan/details/certifications/"
            target="_blank"
            className="inline-flex items-center gap-x-1 font-medium text-foreground hover:underline"
          >
            LinkedIn <TbExternalLink size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
