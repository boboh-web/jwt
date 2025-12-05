import { Badge } from "@/components/ui/badge";

export default function About() {
  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "PostgreSQL",
    "GraphQL",
    "AWS",
    "Docker",
    "Figma",
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I'm a creative developer passionate about building beautiful, 
            functional digital experiences. With a background in both design 
            and development, I bring a unique perspective to every project.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            My work spans across web development, UI/UX design, and creative 
            technology. I believe in the power of thoughtful design and clean 
            code to create meaningful digital products that make a difference.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            When I'm not coding, you can find me exploring new design trends, 
            contributing to open-source projects, or working on personal creative 
            experiments.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-sm font-mono px-3 py-1"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-muted-foreground font-mono mb-1">2022 - Present</p>
              <h3 className="text-lg font-semibold mb-1">Senior Developer</h3>
              <p className="text-muted-foreground">
                Leading development teams and building scalable web applications 
                for various clients across different industries.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-muted-foreground font-mono mb-1">2020 - 2022</p>
              <h3 className="text-lg font-semibold mb-1">Full Stack Developer</h3>
              <p className="text-muted-foreground">
                Developed and maintained web applications using modern 
                technologies and best practices.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <p className="text-sm text-muted-foreground font-mono mb-1">2018 - 2020</p>
              <h3 className="text-lg font-semibold mb-1">Frontend Developer</h3>
              <p className="text-muted-foreground">
                Focused on creating responsive user interfaces and 
                interactive web experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
