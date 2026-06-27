import { Link } from 'react-router-dom';
import { Database, Github, Twitter, Linkedin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Footer() {
  const { config } = useTheme();

  return (
    <footer style={{ backgroundColor: config.card, borderTopColor: config.border }}
            className="border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ background: `linear-gradient(135deg, ${config.primary}, ${config.accent})` }}
                   className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span style={{ color: config.text }} className="font-bold text-lg">SQL<span style={{ color: config.primary }}>Riyaz</span></span>
            </div>
            <p style={{ color: config.muted }} className="text-sm leading-relaxed">
              The most comprehensive SQL interview preparation platform. From beginner to expert, ace every SQL interview.
            </p>
          </div>

          {[
            { title: 'Practice', links: [{ label: 'SQL Playground', to: '/playground' }, { label: 'Question Bank', to: '/questions' }, { label: 'Leaderboard', to: '/leaderboard' }] },
            { title: 'Learn', links: [{ label: 'SQL Roadmap', to: '/roadmap' }, { label: 'Job Role Tracks', to: '/roles' }, { label: 'Dashboard', to: '/dashboard' }] },
            { title: 'Progress', links: [{ label: 'My Dashboard', to: '/dashboard' }, { label: 'Achievements', to: '/dashboard' }, { label: 'Leaderboard', to: '/leaderboard' }] },
          ].map(section => (
            <div key={section.title}>
              <h4 style={{ color: config.text }} className="font-semibold text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} style={{ color: config.muted }}
                          className="text-sm hover:opacity-80 transition-opacity">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTopColor: config.border }} className="border-t pt-6 flex items-center justify-between flex-wrap gap-4">
          <p style={{ color: config.muted }} className="text-sm">
            © 2025 SQLRiyaz. Built with ❤️ for SQL learners worldwide.
          </p>
          <div className="flex items-center gap-4">
            {[{ Icon: Github, href: '#' }, { Icon: Twitter, href: '#' }, { Icon: Linkedin, href: '#' }].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                 style={{ color: config.muted }} className="hover:opacity-70 transition-opacity">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
