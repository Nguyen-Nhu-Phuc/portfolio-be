const L = (en: string, vi: string) => ({ en, vi });

export const seedData = {
  profile: {
    name: L("Richard Hanrick", "Richard Hanrick"),
    title: L("Senior Full-Stack Developer", "Lập trình viên Full-Stack cao cấp"),
    tagline: L(
      "I design and build fast, accessible web products that help teams launch with confidence.",
      "Tôi thiết kế và xây dựng sản phẩm web nhanh, dễ tiếp cận — giúp đội ngũ ra mắt sản phẩm tự tin."
    ),
    avatar: "/images/my-avatar.png",
    email: "richard@example.com",
    phone: "+1 (213) 352-2795",
    birthday: "1982-06-23",
    birthdayDisplay: L("June 23, 1982", "23 tháng 6, 1982"),
    location: L("Sacramento, California, USA", "Sacramento, California, Hoa Kỳ"),
    availability: L("Open to full-time & freelance", "Sẵn sàng full-time & freelance"),
    availabilityStatus: "open",
    resumeUrl: "/resume.pdf",
    yearsExperience: 10,
    remoteFriendly: true,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd",
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com", icon: "logo-linkedin" },
      { platform: "github", url: "https://github.com", icon: "logo-github" },
      { platform: "twitter", url: "https://twitter.com", icon: "logo-twitter" },
    ],
  },
  about: {
    en: [
      "I'm a product-minded full-stack developer with 10+ years of experience shipping web applications for startups and established brands. I combine clean UI craft with reliable engineering — from discovery and prototyping to production deployment.",
      "Clients and hiring teams work with me when they need someone who can own the full stack: translate business goals into clear UX, build performant interfaces, and integrate APIs, databases, and CI/CD without hand-offs slowing the team down.",
    ],
    vi: [
      "Tôi là lập trình viên full-stack orient sản phẩm với hơn 10 năm kinh nghiệm triển khai ứng dụng web cho startup và thương hiệu lớn. Tôi kết hợp thiết kế UI tinh gọn với kỹ thuật đáng tin cậy — từ khám phá, prototype đến triển khai production.",
      "Khách hàng và nhà tuyển dụng hợp tác với tôi khi cần một người có thể đảm nhận toàn bộ stack: chuyển mục tiêu kinh doanh thành UX rõ ràng, xây giao diện hiệu năng cao, tích hợp API, database và CI/CD mà không làm chậm đội ngũ.",
    ],
  },
  services: [
    {
      icon: "/images/icon-design.svg",
      title: L("Web design", "Thiết kế web"),
      description: L(
        "End-to-end product design and front-end systems for marketing sites and SaaS dashboards.",
        "Thiết kế sản phẩm end-to-end và hệ thống front-end cho site marketing và dashboard SaaS."
      ),
    },
    {
      icon: "/images/icon-dev.svg",
      title: L("Web development", "Phát triển web"),
      description: L(
        "Scalable apps with React, Node.js, and cloud-native architecture — built for maintainability.",
        "Ứng dụng mở rộng với React, Node.js và kiến trúc cloud-native — dễ bảo trì."
      ),
    },
    {
      icon: "/images/icon-app.svg",
      title: L("Mobile apps", "Ứng dụng di động"),
      description: L(
        "Cross-platform companion apps with push notifications and offline-first patterns.",
        "Ứng dụng đa nền tảng với thông báo đẩy và mô hình offline-first."
      ),
    },
    {
      icon: "/images/icon-photo.svg",
      title: L("Photography", "Nhiếp ảnh"),
      description: L(
        "Brand photography and visual assets for product launches and marketing campaigns.",
        "Nhiếp ảnh thương hiệu và tài sản hình ảnh cho ra mắt sản phẩm và chiến dịch marketing."
      ),
    },
  ],
  testimonials: [
    {
      avatar: "/images/avatar-1.png",
      name: L("Daniel Lewis", "Daniel Lewis"),
      role: L("Product Director, FinTech Co.", "Giám đốc Sản phẩm, FinTech Co."),
      text: L(
        "Richard delivered our client portal ahead of schedule. He communicates clearly, writes clean code, and proactively flags risks before they become blockers.",
        "Richard bàn giao cổng khách hàng trước hạn. Anh ấy giao tiếp rõ ràng, viết code sạch và chủ động cảnh báo rủi ro trước khi chúng trở thành blocker."
      ),
      date: "2024-03-14",
    },
    {
      avatar: "/images/avatar-2.png",
      name: L("Jessica Miller", "Jessica Miller"),
      role: L("Founder, Studio M", "Nhà sáng lập, Studio M"),
      text: L(
        "We hired Richard to rebuild our marketing site and CMS workflow. Conversion improved within weeks.",
        "Chúng tôi thuê Richard tái thiết kế site marketing và quy trình CMS. Tỷ lệ chuyển đổi cải thiện chỉ trong vài tuần."
      ),
      date: "2023-11-02",
    },
    {
      avatar: "/images/avatar-3.png",
      name: L("Emily Evans", "Emily Evans"),
      role: L("Engineering Manager", "Quản lý Kỹ thuật"),
      text: L(
        "Strong full-stack partner — comfortable in design reviews and production debugging. I'd recommend him for senior roles.",
        "Đối tác full-stack mạnh — tự tin trong design review và debug production. Tôi sẵn sàng giới thiệu cho vị trí senior."
      ),
      date: "2023-08-19",
    },
    {
      avatar: "/images/avatar-4.png",
      name: L("Henry William", "Henry William"),
      role: L("Creative Lead", "Trưởng nhóm Sáng tạo"),
      text: L(
        "Richard bridges design and engineering better than most specialists I've worked with.",
        "Richard kết nối thiết kế và kỹ thuật tốt hơn hầu hết chuyên gia tôi từng làm việc."
      ),
      date: "2022-12-05",
    },
  ],
  clients: [
    { logo: "/images/logo-1-color.png", url: "#" },
    { logo: "/images/logo-2-color.png", url: "#" },
    { logo: "/images/logo-3-color.png", url: "#" },
    { logo: "/images/logo-4-color.png", url: "#" },
    { logo: "/images/logo-5-color.png", url: "#" },
    { logo: "/images/logo-6-color.png", url: "#" },
  ],
  education: [
    {
      title: L("University school of the arts", "Trường Đại học Nghệ thuật"),
      period: L("2007 — 2008", "2007 — 2008"),
      description: L(
        "Focused on visual communication, interaction design, and digital media production.",
        "Tập trung vào truyền thông hình ảnh, thiết kế tương tác và sản xuất media số."
      ),
    },
    {
      title: L("New York academy of art", "Học viện Nghệ thuật New York"),
      period: L("2006 — 2007", "2006 — 2007"),
      description: L(
        "Advanced studies in typography, layout systems, and brand identity design.",
        "Nghiên cứu nâng cao về typography, hệ thống layout và thiết kế nhận diện thương hiệu."
      ),
    },
  ],
  experience: [
    {
      title: L("Creative director", "Giám đốc Sáng tạo"),
      period: L("2015 — Present", "2015 — Hiện tại"),
      description: L(
        "Lead cross-functional teams delivering web products for B2B and consumer brands.",
        "Dẫn dắt đội ngũ đa chức năng triển khai sản phẩm web cho thương hiệu B2B và B2C."
      ),
    },
    {
      title: L("Art director", "Giám đốc Nghệ thuật"),
      period: L("2013 — 2015", "2013 — 2015"),
      description: L(
        "Owned visual direction and design systems for agency client engagements.",
        "Phụ trách định hướng hình ảnh và design system cho dự án agency."
      ),
    },
    {
      title: L("Web designer", "Thiết kế web"),
      period: L("2010 — 2013", "2010 — 2013"),
      description: L(
        "Designed and built responsive marketing websites and landing page campaigns.",
        "Thiết kế và xây dựng website marketing responsive và landing page."
      ),
    },
  ],
  skills: [
    { name: L("React / Next.js", "React / Next.js"), percentage: 92 },
    { name: L("TypeScript", "TypeScript"), percentage: 88 },
    { name: L("Node.js", "Node.js"), percentage: 85 },
    { name: L("UI / UX Design", "UI / UX Design"), percentage: 80 },
    { name: L("MongoDB", "MongoDB"), percentage: 78 },
    { name: L("DevOps / CI", "DevOps / CI"), percentage: 72 },
  ],
  projects: [
    {
      title: L("Finance", "Finance"),
      category: L("Web development", "Phát triển web"),
      categorySlug: "web development",
      image: "/images/project-1.jpg",
      url: "#",
      featured: true,
      description: L(
        "Real-time analytics dashboard — reduced report load time by 40%.",
        "Dashboard phân tích thời gian thực — giảm 40% thời gian tải báo cáo."
      ),
      techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
      title: L("Orizon", "Orizon"),
      category: L("Web development", "Phát triển web"),
      categorySlug: "web development",
      image: "/images/project-2.png",
      url: "#",
      description: L(
        "Marketing site and lead capture funnel integrated into HubSpot CRM.",
        "Site marketing và funnel thu lead tích hợp HubSpot CRM."
      ),
      techStack: ["React", "Tailwind", "Vercel"],
    },
    {
      title: L("Fundo", "Fundo"),
      category: L("Web design", "Thiết kế web"),
      categorySlug: "web design",
      image: "/images/project-3.jpg",
      url: "#",
      techStack: ["Figma", "Design System", "CSS"],
    },
    {
      title: L("Brawlhalla", "Brawlhalla"),
      category: L("Applications", "Ứng dụng"),
      categorySlug: "applications",
      image: "/images/project-4.png",
      url: "#",
      techStack: ["React Native", "Firebase"],
    },
    {
      title: L("DSM.", "DSM."),
      category: L("Web design", "Thiết kế web"),
      categorySlug: "web design",
      image: "/images/project-5.png",
      url: "#",
      techStack: ["Webflow", "JavaScript"],
    },
    {
      title: L("MetaSpark", "MetaSpark"),
      category: L("Web design", "Thiết kế web"),
      categorySlug: "web design",
      image: "/images/project-6.png",
      url: "#",
      techStack: ["Next.js", "Sanity CMS"],
    },
    {
      title: L("Summary", "Summary"),
      category: L("Web development", "Phát triển web"),
      categorySlug: "web development",
      image: "/images/project-7.png",
      url: "#",
      techStack: ["Vue", "Express"],
    },
    {
      title: L("Task Manager", "Task Manager"),
      category: L("Applications", "Ứng dụng"),
      categorySlug: "applications",
      image: "/images/project-8.jpg",
      url: "#",
      techStack: ["React", "Redux", "REST API"],
    },
    {
      title: L("Arrival", "Arrival"),
      category: L("Web development", "Phát triển web"),
      categorySlug: "web development",
      image: "/images/project-9.png",
      url: "#",
      techStack: ["Next.js", "Stripe", "MongoDB"],
    },
  ],
  blogs: [
    {
      title: L("Design conferences in 2022", "Hội nghị thiết kế 2022"),
      category: L("Design", "Thiết kế"),
      image: "/images/blog-1.jpg",
      excerpt: L(
        "Key takeaways from leading design conferences and emerging UI trends.",
        "Điểm nổi bật từ các hội nghị thiết kế hàng đầu và xu hướng UI mới."
      ),
      date: "2022-02-23",
      url: "#",
    },
    {
      title: L("Best fonts every designer", "Font hay nhất cho designer"),
      category: L("Design", "Thiết kế"),
      image: "/images/blog-2.jpg",
      excerpt: L(
        "A curated list of typefaces for product and marketing interfaces.",
        "Danh sách font được chọn lọc cho giao diện sản phẩm và marketing."
      ),
      date: "2022-02-23",
      url: "#",
    },
    {
      title: L("Design digest #80", "Design digest #80"),
      category: L("Design", "Thiết kế"),
      image: "/images/blog-3.jpg",
      excerpt: L(
        "Weekly roundup of design inspiration and front-end craft.",
        "Tổng hợp hàng tuần cảm hứng thiết kế và kỹ thuật front-end."
      ),
      date: "2022-02-23",
      url: "#",
    },
  ],
};
