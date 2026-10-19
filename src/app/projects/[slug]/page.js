import {notFound} from "next/navigation";
import {getProject, projects} from "@/app/projects/data";
import ProjectDetail from "@/app/projects/[slug]/project-detail";

export function generateStaticParams() {
    return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};
    return {
        title: `${project.title} | Aidan Mascoli`,
        description: project.summary,
    };
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const index = projects.findIndex(p => p.slug === slug);
    if (index === -1) notFound();

    const next = projects[(index + 1) % projects.length];

    return <ProjectDetail slug={slug} nextSlug={next.slug} />;
}
