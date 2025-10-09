"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Home, ChevronRight, Info } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb - Outside Box */}
          <nav className="flex items-center gap-2 mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/"
              className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              <Home className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-neutral-100 font-medium">
              About Website
            </span>
          </nav>

          {/* Container Box */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Info className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                About Website
              </h1>
            </div>

            {/* Content */}
            <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
              {/* Vision */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Vision
                </h2>
                <p className="leading-relaxed">
                  To Make Available authentic Islamic content online based on
                  the Salafi methodology (Ahlus-Sunnah wal-Jama&apos;ah), with a
                  special focus on making this knowledge available in{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Roman Urdu
                  </strong>
                  ,{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Hindi
                  </strong>
                  , and{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Nepali
                  </strong>
                  .
                </p>
              </div>

              {/* Mission */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Mission
                </h2>
                <div className="space-y-4 leading-relaxed">
                  <p>
                    Islamic Sources is an academic and educational da&apos;wah
                    initiative that provides well-researched Islamic answers,
                    articles, books, fatawa, and translations rooted in the
                    Qur&apos;an, Sunnah, and understanding of the
                    Salaf-us-Salih.
                  </p>

                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Our mission is:
                  </p>

                  <ul className="space-y-3 ml-4">
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                        •
                      </span>
                      <span>
                        To make the works, fatawa, and teachings of renowned
                        Salafi scholars from around the world accessible in
                        user-friendly formats.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                        •
                      </span>
                      <span>
                        To translate and digitize classical and contemporary
                        works of Indian subcontinent scholars who adhered to the
                        methodology of Ahlus-Sunnah.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                        •
                      </span>
                      <span>
                        To serve as a centralized hub for Islamic knowledge in
                        Roman Urdu, Hindi, Nepali, and gradually in other
                        languages.
                      </span>
                    </li>
                  </ul>

                  <p className="pt-2">
                    We aim to uphold{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      clarity
                    </strong>
                    ,{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      authenticity
                    </strong>
                    , and{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      simplicity
                    </strong>{" "}
                    in presenting Islamic content, catering especially to
                    audiences who cannot read Arabic or Urdu script but are
                    spiritually inclined toward learning Islam.
                  </p>
                </div>
              </div>

              {/* Aims */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Aims
                </h2>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To spread the pure teachings of Islam based on the
                      Qur&apos;an and authentic Sunnah with the understanding of
                      the early generations (Salaf).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To make authentic Islamic knowledge available in Roman
                      Urdu, Hindi, and Nepali, especially for those who cannot
                      read Arabic or Urdu scripts.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To translate and publish books, fatawa, and writings of
                      Salafi scholars from Saudi Arabia, Egypt, Yemen, India,
                      Pakistan, and other regions.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To preserve and propagate the efforts of Ahlus-Sunnah
                      scholars from all over the world.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To provide trustworthy answers to everyday Islamic
                      questions, free from sectarian bias and cultural
                      distortions.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      To offer a clean, mobile-first, and reader-friendly
                      experience for individuals seeking guidance, clarity, and
                      Islamic authenticity.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Methodology */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Methodology
                </h2>
                <div className="space-y-4 leading-relaxed">
                  <p>
                    Islamic Sources strictly follows the methodology of the
                    Salaf—the righteous predecessors—and adheres to the beliefs
                    (
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Aqeedah
                    </span>
                    ) and practices of Ahlus-Sunnah wal-Jama&apos;ah.
                  </p>

                  <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                    All answers and content are grounded in:
                  </p>

                  <ul className="space-y-2 ml-4">
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>
                      <span>The Qur&apos;an</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>
                      <span>The authentic Sunnah</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>
                      <span>
                        The understanding of the Sahabah, Tabi&apos;un, and
                        leading scholars of the four well-known madhhabs,
                        especially in matters agreed upon.
                      </span>
                    </li>
                  </ul>

                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 pt-2">
                    The works of scholars such as:
                  </p>

                  <div className="ml-4 space-y-2">
                    <p>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>{" "}
                      Ibn Taymiyyah, Ibn al-Qayyim
                    </p>
                    <p>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>{" "}
                      Shaykh al-Albani, Ibn Baz, Ibn Uthaymeen
                    </p>
                    <p>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>{" "}
                      Shaykh Rabee&apos;, Shaykh Saleh al-Fawzan
                    </p>
                    <p>
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        •
                      </span>{" "}
                      Shaykh Badi&apos;uddin Shah Rashidi, Shaykh Zubair Ali
                      Zai, and others from the Indian subcontinent.
                    </p>
                  </div>

                  <p className="pt-2">
                    We avoid blind following (
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 italic">
                      taqleed
                    </span>
                    ) and sectarianism, focusing instead on{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      sound evidence
                    </strong>
                    ,{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      proper scholarship
                    </strong>
                    , and{" "}
                    <strong className="text-neutral-900 dark:text-neutral-100">
                      the way of the Salaf
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* Our Focus */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Our Focus
                </h2>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      Prioritize translations and explanations in Roman Urdu,
                      Hindi, and Nepali for maximum local impact.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      Digitize important classical books, short articles,
                      fatawa, and Q&A relevant to contemporary issues.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      Present content with clear formatting, excellent
                      readability, and beautiful typography, optimized for
                      mobile devices.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      •
                    </span>
                    <span className="leading-relaxed">
                      Encourage use by students, new Muslims, youth, and general
                      seekers of knowledge across India, Nepal, and beyond.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Supplication */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center">
                  Supplication
                </h2>
                <div className="space-y-3 leading-relaxed text-center">
                  <p className="text-neutral-800 dark:text-neutral-200">
                    O Allah, make Islamic Sources a means of reviving and
                    spreading authentic Islamic knowledge in the language of the
                    people, free from distortion and confusion.
                  </p>
                  <p className="text-neutral-800 dark:text-neutral-200">
                    Accept it as a sadaqah jariyah for all involved, and guide
                    us to that which You love and are pleased with.{" "}
                    <span className="text-xl font-arabic">آمين</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
